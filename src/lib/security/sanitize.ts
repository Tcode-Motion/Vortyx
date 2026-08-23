/**
 * Client & Server safe filename and string sanitization utilities.
 */

export function sanitizeFilename(input: string, extension: string = "mp4"): string {
  if (!input) return `Vortyx_Download.${extension}`;

  // Replace invalid characters: / \ : * ? " < > | and control chars
  let clean = input
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\.\.+/g, ".") // Remove multiple dots (prevent ../)
    .trim()
    .replace(/\s+/g, "_")
    .slice(0, 70);

  if (!clean || clean === ".") {
    clean = "Vortyx_Media";
  }

  const cleanExt = extension.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "mp4";
  return `${clean}.${cleanExt}`;
}
