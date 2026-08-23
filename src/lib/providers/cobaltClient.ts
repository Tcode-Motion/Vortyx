import { secureFetch } from "../security/ssrfGuard";

export type ProviderHealthState =
  | "AVAILABLE"
  | "DEGRADED"
  | "TIMEOUT"
  | "HTTP_ERROR"
  | "DNS_ERROR"
  | "UNSUPPORTED"
  | "DISABLED";

export interface ProviderNode {
  url: string;
  status: ProviderHealthState;
  lastChecked: number;
  latencyMs: number;
  failCount: number;
}

// Server-side configurable nodes (Never exposed to browser)
const DEFAULT_NODES: string[] = [
  "https://api.cobalt.liubquanti.click",
  "https://cobalt.api.scav.net",
  "https://api.wuk.sh",
];

class ProviderNodeManager {
  private static instance: ProviderNodeManager;
  private nodes: ProviderNode[] = [];

  private constructor() {
    const envNodes = process.env.COBALT_ENDPOINTS
      ? process.env.COBALT_ENDPOINTS.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const nodeUrls = envNodes.length > 0 ? envNodes : DEFAULT_NODES;
    this.nodes = nodeUrls.map((url) => ({
      url,
      status: "AVAILABLE",
      lastChecked: 0,
      latencyMs: 0,
      failCount: 0,
    }));
  }

  public static getInstance(): ProviderNodeManager {
    if (!ProviderNodeManager.instance) {
      ProviderNodeManager.instance = new ProviderNodeManager();
    }
    return ProviderNodeManager.instance;
  }

  /**
   * Request media resolution from the healthier server-side provider node
   */
  public async requestResolution(
    url: string,
    options: {
      videoQuality?: string;
      downloadMode?: "auto" | "audio" | "video" | "mute";
      audioFormat?: "mp3" | "opus" | "ogg" | "wav";
    } = {}
  ): Promise<{ url?: string; filename?: string; title?: string; thumbnail?: string } | null> {
    const activeNodes = this.nodes.filter((n) => n.status !== "DISABLED" && n.failCount < 5);
    const candidateNodes = activeNodes.length > 0 ? activeNodes : this.nodes;

    for (const node of candidateNodes) {
      const startTime = Date.now();
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      try {
        const payload = {
          url,
          videoQuality: options.videoQuality || "1080",
          downloadMode: options.downloadMode || "auto",
          audioFormat: options.audioFormat || "mp3",
        };

        const res = await secureFetch(node.url, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeout);
        node.latencyMs = Date.now() - startTime;
        node.lastChecked = Date.now();

        if (res.ok) {
          const data = await res.json();
          node.status = "AVAILABLE";
          node.failCount = 0;
          if (data && (data.url || data.audio || data.picker)) {
            return {
              url: data.url || data.audio || (data.picker && data.picker[0]?.url) || "",
              filename: data.filename || "",
              title: data.filename || "",
              thumbnail: data.thumbnail || "",
            };
          }
        } else if (res.status === 400) {
          node.status = "UNSUPPORTED";
        } else {
          node.status = "HTTP_ERROR";
          node.failCount += 1;
        }
      } catch (err: any) {
        clearTimeout(timeout);
        node.lastChecked = Date.now();
        if (err?.name === "AbortError") {
          node.status = "TIMEOUT";
        } else {
          node.status = "DNS_ERROR";
        }
        node.failCount += 1;
      }
    }

    return null;
  }

  public getNodeHealth(): ProviderNode[] {
    return this.nodes;
  }
}

export const providerNodeManager = ProviderNodeManager.getInstance();
