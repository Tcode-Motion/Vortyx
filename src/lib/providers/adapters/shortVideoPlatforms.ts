import { BaseProvider, ResolveOptions } from "../base";
import { NormalizedMedia, ProviderCapability, MediaFormatOption, ThumbnailOption } from "../../types/media";
import { secureFetch } from "../../security/ssrfGuard";

export class ShortVideoPlatformsProvider extends BaseProvider {
  public readonly id = "short_video";
  public readonly name = "TikTok, Triller, Likee, Moj & ShareChat";
  public readonly category = "video" as const;
  public readonly color = "#00F2FE";
  public readonly domains = [
    "tiktok.com",
    "www.tiktok.com",
    "douyin.com",
    "triller.co",
    "likee.video",
    "like-video.com",
    "mojapp.in",
    "sharechat.com",
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
    if (clean.includes("tiktok") || clean.includes("douyin")) return { id: "tiktok", name: "TikTok" };
    if (clean.includes("triller")) return { id: "triller", name: "Triller" };
    if (clean.includes("likee") || clean.includes("like-video")) return { id: "likee", name: "Likee" };
    if (clean.includes("mojapp")) return { id: "moj", name: "Moj" };
    return { id: "sharechat", name: "ShareChat" };
  }

  public async resolve(url: string, options?: ResolveOptions): Promise<NormalizedMedia> {
    const start = Date.now();
    const sub = this.detectSub(url);

    try {
      let title = `${sub.name} Video (Watermark-Free)`;
      let author = `${sub.name} Creator`;
      let thumbnail = "/Vortyx/icon.png";
      let videoUrl = "";
      let audioUrl = "";

      // 1. Specialized TikWM API for TikTok
      if (sub.id === "tiktok") {
        try {
          const res = await secureFetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
          if (res.ok) {
            const json = await res.json();
            if (json.code === 0 && json.data) {
              const d = json.data;
              title = d.title || title;
              author = d.author?.nickname || d.author?.unique_id || author;
              thumbnail = d.cover || d.origin_cover || thumbnail;
              videoUrl = d.hdplay || d.play || d.wmplay || "";
              audioUrl = d.music || "";
            }
          }
        } catch {
          // Fallback
        }
      }

      // 2. Generic Cobalt Fallback
      if (!videoUrl) {
        try {
          const res = await secureFetch("https://api.cobalt.liubquanti.click", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ url, videoQuality: "1080", downloadMode: "auto" }),
          });
          if (res.ok) {
            const d = await res.json();
            videoUrl = d.url || "";
            title = d.filename || d.title || title;
            thumbnail = d.thumbnail || thumbnail;
          }
        } catch {
          // Fallback
        }
      }

      const formats: MediaFormatOption[] = [];

      if (videoUrl) {
        formats.push(
          {
            id: `${sub.id}-v-hd`,
            type: "video",
            quality: "HD 1080p Video (No Watermark)",
            container: "mp4",
            codec: "H.264",
            resolution: "1080x1920",
            sizeLabel: "Clean HD MP4",
            isEstimated: true,
            url: `/api/stream?url=${encodeURIComponent(videoUrl)}&title=${encodeURIComponent(title)}&format=mp4`,
            source: "native",
            downloadable: true,
          },
          {
            id: `${sub.id}-v-sd`,
            type: "video",
            quality: "Standard Video (No Watermark)",
            container: "mp4",
            codec: "H.264",
            resolution: "720x1280",
            sizeLabel: "Fast Download",
            isEstimated: true,
            url: `/api/stream?url=${encodeURIComponent(videoUrl)}&title=${encodeURIComponent(title)}&format=mp4`,
            source: "native",
            downloadable: true,
          }
        );
      }

      if (audioUrl || videoUrl) {
        formats.push({
          id: `${sub.id}-a-music`,
          type: "audio",
          quality: "Original Audio Track / Music (MP3)",
          container: "mp3",
          codec: "MP3 Audio",
          bitrate: "320 kbps",
          sizeLabel: "Extracted Music MP3",
          isEstimated: true,
          url: `/api/stream?url=${encodeURIComponent(audioUrl || videoUrl)}&title=${encodeURIComponent(`${title}_Audio`)}&format=mp3`,
          source: "native",
          downloadable: true,
        });
      }

      const thumbnails: ThumbnailOption[] = [
        {
          id: `${sub.id}-thumb`,
          quality: "Original HD Video Cover",
          resolution: "1080x1920",
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
        category: "video",
        capabilities: this.capabilities,
        title,
        author,
        thumbnail,
        thumbnails,
        formats,
        subtitles: [],
        previewUrl: videoUrl || thumbnail,
        previewType: videoUrl ? "video" : "image",
        diagnostics: {
          extractionDurationMs: Date.now() - start,
          backendUsed: `${sub.name} Watermark-Free Direct Engine`,
        },
      };
    } catch (err: any) {
      this.recordError();
      throw err;
    }
  }
}
