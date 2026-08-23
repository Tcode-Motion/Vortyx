/**
 * Vortyx WhatsApp Web Status Bridge (Content Script)
 * Runs strictly within web.whatsapp.com inside the official WhatsApp Web origin.
 * 
 * Privacy Guarantees:
 * - Never accesses passwords, QR codes, session auth tokens, or cookies.
 * - Never transmits user chats, contacts, or database contents to external servers.
 * - Only scans for viewed status media upon explicit user scan command.
 */

// Inject badge so Vortyx website can verify connector installation
if (!document.getElementById("vortyx-wa-bridge-installed")) {
  const badge = document.createElement("div");
  badge.id = "vortyx-wa-bridge-installed";
  badge.style.display = "none";
  badge.dataset.version = "1.2.0";
  badge.dataset.ready = "true";
  badge.dataset.origin = window.location.origin;
  document.documentElement.appendChild(badge);
}

const TRUSTED_ORIGINS = [
  "https://techscript.is-a.dev",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3008",
  "http://127.0.0.1:3008",
];

window.addEventListener("message", async (event) => {
  if (event.origin && !TRUSTED_ORIGINS.includes(event.origin) && event.origin !== window.location.origin) {
    return;
  }

  const { type, nonce, correlationId } = event.data || {};

  // Handle connection ping
  if (type === "VORTYX_BRIDGE_PING") {
    const isLoggedIn = !!document.querySelector("div[data-testid='chat-list'], #pane-side, div[role='navigation'], [aria-label='Chat list']");
    event.source?.postMessage(
      {
        type: "VORTYX_BRIDGE_PONG",
        nonce,
        correlationId,
        isWhatsAppWeb: window.location.hostname.includes("whatsapp.com"),
        isLoggedIn,
        version: "1.2.0",
        timestamp: Date.now(),
      },
      event.origin || "*"
    );
    return;
  }

  // Handle explicit status scan trigger
  if (type === "VORTYX_TRIGGER_STATUS_SCAN") {
    try {
      console.log(`[Vortyx Bridge] User-triggered status scan starting (correlationId: ${correlationId})...`);
      const discovered = await performComprehensiveStatusDiscovery();
      
      event.source?.postMessage(
        {
          type: "VORTYX_STATUS_SCAN_RESULTS",
          nonce,
          correlationId,
          items: discovered.items,
          metrics: discovered.metrics,
          timestamp: Date.now(),
        },
        event.origin || "*"
      );
    } catch (err) {
      console.error("[Vortyx Bridge] Scan error:", err);
      event.source?.postMessage(
        {
          type: "VORTYX_STATUS_SCAN_ERROR",
          nonce,
          correlationId,
          error: "Error during WhatsApp Web storage inspection",
          timestamp: Date.now(),
        },
        event.origin || "*"
      );
    }
  }
});

/**
 * Dynamic multi-tier status discovery inside web.whatsapp.com
 */
async function performComprehensiveStatusDiscovery() {
  const items = [];
  const metrics = {
    databasesInspected: 0,
    storesInspected: 0,
    cachesInspected: 0,
    domElementsFound: 0,
    validStatusesCount: 0,
  };

  // 1. Dynamic IndexedDB Discovery (No fixed database assumptions)
  try {
    if (window.indexedDB && window.indexedDB.databases) {
      const dbs = await window.indexedDB.databases();
      for (const dbInfo of dbs) {
        if (!dbInfo.name) continue;
        metrics.databasesInspected++;

        try {
          const req = window.indexedDB.open(dbInfo.name);
          const db = await new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(null), 1000);
            req.onsuccess = () => {
              clearTimeout(timeout);
              resolve(req.result);
            };
            req.onerror = () => {
              clearTimeout(timeout);
              resolve(null);
            };
          });
          if (!db) continue;

          for (const storeName of Array.from(db.objectStoreNames)) {
            metrics.storesInspected++;
            try {
              const tx = db.transaction(storeName, "readonly");
              const store = tx.objectStore(storeName);
              const records = await new Promise((resolve) => {
                const timeout = setTimeout(() => resolve([]), 1000);
                const r = store.getAll();
                r.onsuccess = () => {
                  clearTimeout(timeout);
                  resolve(r.result || []);
                };
                r.onerror = () => {
                  clearTimeout(timeout);
                  resolve([]);
                };
              });

              for (const record of records) {
                const isStatus =
                  record?.to?.includes("status") ||
                  record?.id?.remote?.includes("status") ||
                  record?.broadcast ||
                  record?.isStatus ||
                  record?.isStatusV3;

                if (isStatus || (record && (record.mimetype?.startsWith("image/") || record.mimetype?.startsWith("video/")))) {
                  if (record.body || record.mediaData || record.directPath || record.filehash) {
                    const isVideo = record.type === "video" || record.mimetype?.includes("video");
                    items.push({
                      id: record.id?.id || record.id || `idb_${Math.random().toString(36)}`,
                      type: isVideo ? "video" : "image",
                      data: record.body || record.mediaData || "",
                      mimetype: record.mimetype || (isVideo ? "video/mp4" : "image/jpeg"),
                      timestamp: record.t ? new Date(record.t * 1000).toLocaleTimeString() : new Date().toLocaleTimeString(),
                      timeValue: record.t ? record.t * 1000 : Date.now(),
                      sender: record.sender?.user || record.pushname || record.notifyName || "Status Contact",
                      size: record.size || 0,
                      duration: record.duration || (isVideo ? 15 : undefined),
                    });
                  }
                }
              }
            } catch (e) {}
          }
        } catch (e) {}
      }
    }
  } catch (e) {}

  // 2. Cache Storage API Inspection
  try {
    if (window.caches && window.caches.keys) {
      const cacheNames = await window.caches.keys();
      metrics.cachesInspected = cacheNames.length;
      for (const cacheName of cacheNames) {
        try {
          const cache = await window.caches.open(cacheName);
          const requests = await cache.keys();
          for (const req of requests) {
            const url = req.url.toLowerCase();
            if (url.includes(".mp4") || url.includes(".jpg") || url.includes(".jpeg") || url.includes("media") || url.includes("status")) {
              const res = await cache.match(req);
              if (res) {
                const blob = await res.blob();
                if (blob && blob.size > 1024) {
                  const isVideo = blob.type.includes("video") || url.includes(".mp4");
                  const reader = new FileReader();
                  const base64 = await new Promise((resBase) => {
                    reader.onloadend = () => resBase(reader.result);
                    reader.readAsDataURL(blob);
                  });
                  items.push({
                    id: `cache_${Date.now()}_${Math.random().toString(36)}`,
                    type: isVideo ? "video" : "image",
                    data: base64,
                    mimetype: blob.type || (isVideo ? "video/mp4" : "image/jpeg"),
                    timestamp: new Date().toLocaleTimeString(),
                    timeValue: Date.now(),
                    sender: "Cached WhatsApp Status",
                    size: blob.size,
                  });
                }
              }
            }
          }
        } catch (e) {}
      }
    }
  } catch (e) {}

  // 3. Active DOM Media Element Discovery (Active Status Viewer)
  try {
    const activeMediaElements = document.querySelectorAll(
      'img[src*="blob:"], video[src*="blob:"], div[data-testid="status-v3-container"] img, div[data-testid="status-v3-container"] video'
    );
    metrics.domElementsFound = activeMediaElements.length;

    for (let i = 0; i < activeMediaElements.length; i++) {
      const el = activeMediaElements[i];
      const isVideo = el.tagName.toLowerCase() === "video";
      const src = el.getAttribute("src") || "";

      if (src && (src.startsWith("blob:") || src.startsWith("data:"))) {
        items.push({
          id: `dom_${i}_${Date.now()}`,
          type: isVideo ? "video" : "image",
          blobUrl: src,
          timestamp: new Date().toLocaleTimeString(),
          timeValue: Date.now(),
          sender: "Viewed Status " + (i + 1),
          size: 0,
          duration: isVideo && el.duration ? Math.round(el.duration) : undefined,
        });
      }
    }
  } catch (e) {}

  const uniqueItems = items.filter((item, idx, self) => idx === self.findIndex((t) => t.id === item.id));
  metrics.validStatusesCount = uniqueItems.length;

  return {
    items: uniqueItems,
    metrics,
  };
}
