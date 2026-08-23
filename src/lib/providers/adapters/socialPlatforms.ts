import { BaseProvider, ResolveOptions } from "../base";
import { NormalizedMedia, ProviderCapability, MediaFormatOption, ThumbnailOption } from "../../types/media";
import { secureFetch } from "../../security/ssrfGuard";

export class SocialPlatformsProvider extends BaseProvider {
  public readonly id = "social_platforms";
  public readonly name = "X / Twitter, Reddit, Discord, Telegram & Tumblr";
  public readonly category = "social" as const;
  public readonly color = "#1DA1F2";
  public readonly domains = [
    "twitter.com",
    "x.com",
    "t.co",
    "reddit.com",
    "redd.it",
    "discord.com",
    "discordapp.com",
    "cdn.discordapp.com",
    "t.me",
    "telegram.me",
    "tumblr.com",
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
    if (clean.includes("twitter") || clean.includes("x.com") || clean.includes("t.co")) return { id: "twitter", name: "X / Twitter" };
    if (clean.includes("reddit") || clean.includes("redd.it")) return { id: "reddit", name: "Reddit" };
    if (clean.includes("discord")) return { id: "discord", name: "Discord" };
    if (clean.includes("t.me") || clean.includes("telegram")) return { id: "telegram", name: "Telegram" };
    return { id: "tumblr", name: "Tumblr" };
  }

  public async resolve(url: string, options?: ResolveOptions): Promise<NormalizedMedia> {
    const start = Date.now();
    const sub = this.detectSub(url);

    try {
      let title = `${sub.name} Post`;
      let author = `${sub.name} User`;
      let thumbnail = "/Vortyx/icon.png";
      let videoUrl = "";
      let isImage = false;

      // 1. Reddit specialized extraction
      if (sub.id === "reddit") {
        try {
          const cleanUrl = url.split("?")[0].replace(/\/$/, "");
          const res = await secureFetch(`${cleanUrl}.json`);
          if (res.ok) {
            const data = await res.json();
            const post = data[0]?.data?.children[0]?.data;
            if (post) {
              title = post.title || title;
              author = `u/${post.author || "reddit_user"}`;
              thumbnail = post.thumbnail && post.thumbnail.startsWith("http") ? post.thumbnail : thumbnail;

              const media = post.secure_media?.reddit_video || post.media?.reddit_video;
              if (media && media.fallback_url) {
                videoUrl = media.fallback_url.split("?")[0];
              } else if (post.url && (post.url.endsWith(".jpg") || post.url.endsWith(".png") || post.url.endsWith(".gif"))) {
                videoUrl = post.url;
                isImage = true;
                thumbnail = post.url;
              }
            }
          }
        } catch {
          // Fallback
        }
      }

      // 2. Generic Cobalt Fallback for X/Twitter, Tumblr, Telegram
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

      if (videoUrl && !isImage) {
        formats.push(
          {
            id: `${sub.id}-v-hd`,
            type: "video",
            quality: "Full HD Video (MP4)",
            container: "mp4",
            codec: "H.264",
            resolution: "1080p / 720p",
            sizeLabel: "Direct HD Stream",
            isEstimated: true,
            url: `/api/stream?url=${encodeURIComponent(videoUrl)}&title=${encodeURIComponent(title)}&format=mp4`,
            source: "native",
            downloadable: true,
          },
          {
            id: `${sub.id}-a-mp3`,
            type: "audio",
            quality: "Extracted Audio Track (MP3)",
            container: "mp3",
            codec: "MP3 Audio",
            bitrate: "320 kbps",
            sizeLabel: "Extracted MP3",
            isEstimated: true,
            url: `/api/stream?url=${encodeURIComponent(videoUrl)}&title=${encodeURIComponent(`${title}_Audio`)}&format=mp3`,
            source: "native",
            downloadable: true,
          }
        );
      } else if (isImage && videoUrl) {
        formats.push({
          id: `${sub.id}-img-orig`,
          type: "image",
          quality: "Original HD Image",
          container: videoUrl.endsWith(".png") ? "png" : videoUrl.endsWith(".gif") ? "gif" : "jpg",
          resolution: "Original",
          sizeLabel: "Original Full Res",
          isEstimated: false,
          url: `/api/stream?url=${encodeURIComponent(videoUrl)}&title=${encodeURIComponent(title)}&format=${videoUrl.endsWith(".png") ? "png" : videoUrl.endsWith(".gif") ? "gif" : "jpg"}`,
          source: "native",
          downloadable: true,
        });
      }

      const thumbnails: ThumbnailOption[] = [
        {
          id: `${sub.id}-thumb`,
          quality: "Original Post Media Cover",
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
        category: "social",
        capabilities: this.capabilities,
        title,
        author,
        thumbnail,
        thumbnails,
        formats,
        subtitles: [],
        previewUrl: videoUrl || thumbnail,
        previewType: isImage ? "image" : videoUrl ? "video" : "image",
        diagnostics: {
          extractionDurationMs: Date.now() - start,
          backendUsed: `${sub.name} Social Media Engine`,
        },
      };
    } catch (err: any) {
      this.recordError();
      throw err;
    }
  }
}
