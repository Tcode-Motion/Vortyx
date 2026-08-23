import {
  NormalizedMedia,
  ProviderCapability,
  PlatformCategory,
  MediaCollectionInfo,
  MediaFormatOption,
  CandidateMatch,
  PlatformHealthStatus,
} from "../types/media";

export interface ResolveOptions {
  preferredMode?: "auto" | "audio" | "video";
  includeCollection?: boolean;
  includeSubtitles?: boolean;
  maxCandidates?: number;
}

export abstract class BaseProvider {
  public abstract readonly id: string;
  public abstract readonly name: string;
  public abstract readonly category: PlatformCategory;
  public abstract readonly domains: string[];
  public abstract readonly capabilities: ProviderCapability[];
  public abstract readonly color: string;

  private totalSuccesses = 0;
  private totalErrors = 0;
  private lastLatencyMs = 0;

  /**
   * Fast URL detection regex / domain test
   */
  public abstract detect(url: string): boolean;

  /**
   * Main resolution method returning full normalized media
   */
  public abstract resolve(url: string, options?: ResolveOptions): Promise<NormalizedMedia>;

  /**
   * Optional collection / playlist extraction
   */
  public async getCollection(url: string): Promise<MediaCollectionInfo | null> {
    return null;
  }

  /**
   * Optional equivalent candidate match search for music streaming services
   */
  public async searchCandidateMatches(
    title: string,
    artist?: string,
    targetDuration?: number
  ): Promise<CandidateMatch[]> {
    return [];
  }

  /**
   * Record diagnostic metrics
   */
  public recordSuccess(latencyMs: number): void {
    this.totalSuccesses += 1;
    this.lastLatencyMs = latencyMs;
  }

  public recordError(): void {
    this.totalErrors += 1;
  }

  public getHealthStatus(): PlatformHealthStatus {
    const errorRate = this.totalSuccesses + this.totalErrors > 0
      ? this.totalErrors / (this.totalSuccesses + this.totalErrors)
      : 0;

    let status: PlatformHealthStatus["status"] = "healthy";
    if (errorRate > 0.5) status = "unavailable";
    else if (errorRate > 0.15 || this.lastLatencyMs > 4000) status = "degraded";

    return {
      id: this.id,
      name: this.name,
      category: this.category,
      color: this.color,
      iconName: "Globe",
      domains: this.domains,
      supportedMediaTypes: ["video", "audio", "image"],
      supportedCapabilities: this.capabilities,
      deliveryMode: "DIRECT_DOWNLOAD",
      hasPlaylistSupport: this.capabilities.includes(ProviderCapability.PLAYLIST),
      hasMetadataSupport: true,
      status,
      latencyMs: this.lastLatencyMs,
      totalSuccesses: this.totalSuccesses,
      totalErrors: this.totalErrors,
      lastChecked: Date.now(),
      description: `${this.name} media extraction adapter.`,
      exampleUrl: `https://${this.domains[0] || "example.com"}`,
    };
  }
}

/**
 * Clean string for fuzzy comparison
 */
export function cleanTitleString(str: string): string {
  return (str || "")
    .toLowerCase()
    .replace(/\(.*?\)/g, "") // Remove (Official Video), (Lyrics), etc.
    .replace(/\[.*?\]/g, "")
    .replace(/ft\.|feat\.|featuring/gi, "")
    .replace(/official\s+(video|audio|music\s+video|lyric\s+video)/gi, "")
    .replace(/hd|4k|remastered|hq|audio|video|lyrics/gi, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Calculates a 0-100 confidence score between target music track and candidate match
 */
export function calculateMatchConfidence(
  targetTitle: string,
  targetArtist: string | undefined,
  targetDurationSec: number | undefined,
  candidateTitle: string,
  candidateAuthor: string | undefined,
  candidateDurationSec: number | undefined
): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 0;

  const cleanTargetT = cleanTitleString(targetTitle);
  const cleanCandT = cleanTitleString(candidateTitle);

  // 1. Title Match (up to 50 pts)
  if (cleanCandT === cleanTargetT) {
    score += 50;
    reasons.push("Exact title match");
  } else if (cleanCandT.includes(cleanTargetT) || cleanTargetT.includes(cleanCandT)) {
    score += 35;
    reasons.push("Strong title overlap");
  } else {
    // Token jaccard
    const tTokens = new Set(cleanTargetT.split(" ").filter(Boolean));
    const cTokens = new Set(cleanCandT.split(" ").filter(Boolean));
    let intersection = 0;
    tTokens.forEach((t) => {
      if (cTokens.has(t)) intersection++;
    });
    const overlap = intersection / Math.max(tTokens.size, 1);
    if (overlap > 0.5) {
      score += Math.round(overlap * 30);
      reasons.push("Partial title match");
    }
  }

  // 2. Artist Match (up to 30 pts)
  if (targetArtist && candidateAuthor) {
    const cleanTArtist = cleanTitleString(targetArtist);
    const cleanCAuthor = cleanTitleString(candidateAuthor);
    const cleanCandFull = cleanTitleString(`${candidateTitle} ${candidateAuthor}`);

    if (cleanCandFull.includes(cleanTArtist) || cleanCAuthor.includes(cleanTArtist)) {
      score += 30;
      reasons.push(`Artist '${targetArtist}' verified`);
    } else {
      score += 5;
    }
  } else {
    score += 15; // Neutral
  }

  // 3. Duration Matching (up to 20 pts)
  if (targetDurationSec && candidateDurationSec && candidateDurationSec > 0) {
    const diff = Math.abs(targetDurationSec - candidateDurationSec);
    if (diff <= 3) {
      score += 20;
      reasons.push(`Duration exact match (±${diff}s)`);
    } else if (diff <= 10) {
      score += 12;
      reasons.push(`Duration close match (±${diff}s)`);
    } else if (diff <= 30) {
      score += 5;
    } else {
      score -= 15; // Possible remix / live extension
      reasons.push(`Duration discrepancy (>30s)`);
    }
  } else {
    score += 10;
  }

  const finalScore = Math.max(0, Math.min(100, score));
  return { score: finalScore, reasons };
}
