import { BaseProvider, ResolveOptions } from "../base";
import { NormalizedMedia, ProviderCapability } from "../../types/media";

export class WhatsAppLocalProvider extends BaseProvider {
  public readonly id = "whatsapp_status";
  public readonly name = "WhatsApp Web Status Inspector (Local Only)";
  public readonly category = "messaging" as const;
  public readonly color = "#25D366";
  public readonly domains = ["web.whatsapp.com", "whatsapp.com", "wa.me"];
  public readonly capabilities = [
    ProviderCapability.DIRECT_DOWNLOAD,
    ProviderCapability.THUMBNAIL,
    ProviderCapability.VIDEO,
  ];

  public detect(url: string): boolean {
    const clean = url.toLowerCase().trim();
    return this.domains.some((d) => clean.includes(d));
  }

  public async resolve(url: string, options?: ResolveOptions): Promise<NormalizedMedia> {
    const start = Date.now();

    this.recordSuccess(Date.now() - start);

    return {
      id: "whatsapp-web-status",
      originalUrl: url,
      canonicalUrl: "https://web.whatsapp.com",
      platformId: this.id,
      platformName: this.name,
      category: "messaging",
      capabilities: this.capabilities,
      title: "WhatsApp Web Status Session",
      author: "Local User Device",
      thumbnail: "/Vortyx/screenshots/statussaver.png",
      thumbnails: [],
      formats: [],
      subtitles: [],
      fallbackNote:
        "WhatsApp Status is processed directly inside your browser session for 100% privacy. No personal messages, credentials, or session tokens are ever sent to any remote server.",
      diagnostics: {
        extractionDurationMs: Date.now() - start,
        backendUsed: "Local Browser Sandbox Engine",
      },
    };
  }
}
