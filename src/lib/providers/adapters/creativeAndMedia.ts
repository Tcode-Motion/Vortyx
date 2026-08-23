import { BaseProvider, ResolveOptions } from "../base";
import { NormalizedMedia, ProviderCapability, MediaFormatOption, ThumbnailOption } from "../../types/media";
import { secureFetch } from "../../security/ssrfGuard";
import { providerNodeManager } from "../cobaltClient";

export class CreativeAndMediaProvider extends BaseProvider {
  public readonly id = "creative_media";
  public readonly name = "Pinterest, Snapchat, LinkedIn, Twitch, Rumble & Patreon";
  public readonly category = "creative" as const;
  public readonly color = "#BD081C";
  public readonly domains = [
    "pinterest.com",
    "pin.it",
    "snapchat.com",
    "linkedin.com",
    "twitch.tv",
    "rumble.com",
    "bilibili.com",
    "vk.com",
    "patreon.com",
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
    if (clean.includes("pinterest") || clean.includes("pin.it")) return { id: "pinterest", name: "Pinterest" };
    if (clean.includes("snapchat")) return { id: "snapchat", name: "Snapchat" };
    if (clean.includes("linkedin")) return { id: "linkedin", name: "LinkedIn" };
    if (clean.includes("twitch")) return { id: "twitch", name: "Twitch" };
    if (clean.includes("rumble")) return { id: "rumble", name: "Rumble" };
    if (clean.includes("bilibili")) return { id: "bilibili", name: "Bilibili" };
    if (clean.includes("vk.com")) return { id: "vk", name: "VK" };
    return { id: "patreon", name: "Patreon" };
  }

  public async resolve(url: string, options?: ResolveOptions): Promise<NormalizedMedia> {
    const start = Date.now();
    const sub = this.detectSub(url);

    try {
      let title = `${sub.name} Media`;
      let author = `${sub.name} Creator`;
      let thumbnail = "/icon.png";
      let streamUrl = "";

      try {
        const resolved = await providerNodeManager.requestResolution(url, { videoQuality: "1080" });
        if (resolved && resolved.url) {
          streamUrl = resolved.url;
          title = resolved.filename || resolved.title || title;
          thumbnail = resolved.thumbnail || thumbnail;
        }
      } catch {
        // Fallback gracefully
      }

      const formats: MediaFormatOption[] = [];

      if (streamUrl) {
        formats.push(
          {
            id: `${sub.id}-v-1080`,
            type: "video",
            quality: "HD Video (MP4)",
            container: "mp4",
            codec: "H.264",
            resolution: "1080p",
            sizeLabel: "Full HD Video",
            isEstimated: true,
            url: `/api/stream?url=${encodeURIComponent(streamUrl)}&title=${encodeURIComponent(title)}&format=mp4`,
            source: "external",
            downloadable: true,
          },
          {
            id: `${sub.id}-a-mp3`,
            type: "audio",
            quality: "Extracted Audio (320kbps MP3)",
            container: "mp3",
            codec: "MP3 Audio",
            bitrate: "320 kbps",
            sizeLabel: "Audio Track MP3",
            isEstimated: true,
            url: `/api/stream?url=${encodeURIComponent(streamUrl)}&title=${encodeURIComponent(`${title}_Audio`)}&format=mp3`,
            source: "external",
            downloadable: true,
          }
        );
      }

      const thumbnails: ThumbnailOption[] = [
        {
          id: `${sub.id}-thumb`,
          quality: "Original HD Image",
          resolution: "Original",
          format: "jpg",
          url: thumbnail,
          sizeLabel: "Full Resolution",
        },
      ];

      this.recordSuccess(Date.now() - start);

      return {
        id: url,
        originalUrl: url,
        canonicalUrl: url,
        platformId: sub.id,
        platformName: sub.name,
        category: "creative",
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
          backendUsed: `${sub.name} Creative Engine`,
        },
      };
    } catch (err: any) {
      this.recordError();
      throw err;
    }
  }
}
