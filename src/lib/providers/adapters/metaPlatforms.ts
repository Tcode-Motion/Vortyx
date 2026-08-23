import { BaseProvider, ResolveOptions } from "../base";
import { NormalizedMedia, ProviderCapability, MediaFormatOption, ThumbnailOption } from "../../types/media";
import { secureFetch } from "../../security/ssrfGuard";

export class MetaPlatformsProvider extends BaseProvider {
  public readonly id = "meta_platforms";
  public readonly name = "Instagram, Facebook & Threads";
  public readonly category = "social" as const;
  public readonly color = "#E4405F";
  public readonly domains = [
    "instagram.com",
    "www.instagram.com",
    "instagr.am",
    "facebook.com",
    "www.facebook.com",
    "fb.watch",
    "fb.com",
    "m.facebook.com",
    "threads.net",
    "www.threads.net",
  ];
  public readonly capabilities = [
    ProviderCapability.DIRECT_DOWNLOAD,
    ProviderCapability.VIDEO,
    ProviderCapability.AUDIO,
    ProviderCapability.THUMBNAIL,
  ];

  public detect(url: string): boolean {
    const clean = url.toLowerCase().trim();
    return this.domains.some((d) => clean.includes(d));
  }

  public detectSub(url: string): { id: string; name: string } {
    const clean = url.toLowerCase();
    if (clean.includes("instagram") || clean.includes("instagr.am")) return { id: "instagram", name: "Instagram" };
    if (clean.includes("threads.net")) return { id: "threads", name: "Threads" };
    return { id: "facebook", name: "Facebook" };
  }

  public async resolve(url: string, options?: ResolveOptions): Promise<NormalizedMedia> {
    const start = Date.now();
    const sub = this.detectSub(url);

    try {
      let title = `${sub.name} Media`;
      let author = `${sub.name} User`;
      let thumbnail = "/Vortyx/icon.png";

      // Attempt oEmbed or external resolver
      let streamUrl = "";
      try {
        const res = await secureFetch("https://api.cobalt.liubquanti.click", {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ url, videoQuality: "1080", downloadMode: "auto" }),
        });
        if (res.ok) {
          const d = await res.json();
          streamUrl = d.url || (d.picker && d.picker[0]?.url) || "";
          title = d.filename || d.title || title;
          thumbnail = d.thumbnail || (d.picker && d.picker[0]?.thumb) || thumbnail;
        }
      } catch {
        // Fallback
      }

      const formats: MediaFormatOption[] = [];

      if (streamUrl) {
        formats.push(
          {
            id: `${sub.id}-v-1080`,
            type: "video",
            quality: "1080p Full HD Video",
            container: "mp4",
            codec: "H.264",
            resolution: "1080x1920",
            sizeLabel: "Full HD MP4",
            isEstimated: true,
            url: `/api/stream?url=${encodeURIComponent(streamUrl)}&title=${encodeURIComponent(title)}&format=mp4`,
            source: "external",
            downloadable: true,
          },
          {
            id: `${sub.id}-v-720`,
            type: "video",
            quality: "720p HD Video",
            container: "mp4",
            codec: "H.264",
            resolution: "720x1280",
            sizeLabel: "Standard HD",
            isEstimated: true,
            url: `/api/stream?url=${encodeURIComponent(streamUrl)}&title=${encodeURIComponent(title)}&format=mp4`,
            source: "external",
            downloadable: true,
          },
          {
            id: `${sub.id}-a-mp3`,
            type: "audio",
            quality: "Original Audio Track (320kbps MP3)",
            container: "mp3",
            codec: "MP3 Audio",
            bitrate: "320 kbps",
            sizeLabel: "Extracted MP3",
            isEstimated: true,
            url: `/api/stream?url=${encodeURIComponent(streamUrl)}&title=${encodeURIComponent(title)}&format=mp3`,
            source: "external",
            downloadable: true,
          }
        );
      }

      const thumbnails: ThumbnailOption[] = [
        {
          id: `${sub.id}-thumb`,
          quality: "Original HD Image",
          resolution: "1080x1920",
          format: "jpg",
          url: thumbnail,
          sizeLabel: "High Res Cover",
        },
      ];

      this.recordSuccess(Date.now() - start);

      return {
        id: url,
        originalUrl: url,
        canonicalUrl: url,
        platformId: sub.id,
        platformName: sub.name,
        category: "social",
        capabilities: this.capabilities,
        title,
        author,
        thumbnail,
        thumbnails,
        formats,
        subtitles: [],
        previewUrl: streamUrl || thumbnail,
        previewType: streamUrl ? "video" : "image",
        diagnostics: {
          extractionDurationMs: Date.now() - start,
          backendUsed: `${sub.name} Direct Extraction Adapter`,
        },
      };
    } catch (err: any) {
      this.recordError();
      throw err;
    }
  }
}
