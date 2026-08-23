import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface StorageMetrics {
  storageDir: string;
  isAccessible: boolean;
  canReadWrite: boolean;
  tempFilesCount: number;
  completedFilesCount: number;
  persistedJobsCount: number;
  totalStorageBytes: number;
  lastCleanup: number;
}

export class DiskStorage {
  private static instance: DiskStorage;
  private baseDir: string;
  private tempDir: string;
  private completedDir: string;
  private jobsDir: string;
  private lastCleanupTime: number = Date.now();

  private constructor() {
    // Configurable via MEDIA_STORAGE_DIR environment variable
    const configured = process.env.MEDIA_STORAGE_DIR;
    if (configured && configured.trim().length > 0) {
      this.baseDir = path.resolve(configured.trim());
    } else {
      this.baseDir = path.resolve(process.cwd(), ".vortyx_storage");
    }

    this.tempDir = path.join(this.baseDir, "temp");
    this.completedDir = path.join(this.baseDir, "completed");
    this.jobsDir = path.join(this.baseDir, "jobs");

    this.ensureDirs();
  }

  public static getInstance(): DiskStorage {
    if (!DiskStorage.instance) {
      DiskStorage.instance = new DiskStorage();
    }
    return DiskStorage.instance;
  }

  /**
   * Initializes all required storage subdirectories
   */
  public ensureDirs(): void {
    const dirs = [this.baseDir, this.tempDir, this.completedDir, this.jobsDir];
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        try {
          fs.mkdirSync(dir, { recursive: true });
        } catch {
          // Ignore
        }
      }
    }
  }

  public getBaseDir(): string {
    return this.baseDir;
  }

  public getTempDir(): string {
    return this.tempDir;
  }

  public getCompletedDir(): string {
    return this.completedDir;
  }

  public getJobsDir(): string {
    return this.jobsDir;
  }

  /**
   * Safe path resolution with strict path-traversal protection
   */
  public resolveSafePath(subfolder: "temp" | "completed" | "jobs", fileName: string): string {
    if (!fileName || fileName.includes("..") || fileName.includes("/") || fileName.includes("\\")) {
      throw new Error(`Path traversal or invalid file name rejected: ${fileName}`);
    }

    const cleanName = path.basename(fileName).trim();
    if (!cleanName) {
      throw new Error(`Invalid empty file name: ${fileName}`);
    }

    const folder =
      subfolder === "temp" ? this.tempDir : subfolder === "completed" ? this.completedDir : this.jobsDir;

    const resolved = path.resolve(folder, cleanName);

    // Verify resolved path strictly resides within the target subfolder
    if (!resolved.startsWith(folder)) {
      throw new Error(`Path traversal violation attempt: ${fileName}`);
    }

    return resolved;
  }

  /**
   * Atomic file write using a temporary random file renamed on completion
   */
  public async atomicWriteFile(targetPath: string, data: Buffer | string): Promise<void> {
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const tempPath = path.join(dir, `.tmp_${Date.now()}_${crypto.randomBytes(6).toString("hex")}`);

    await fs.promises.writeFile(tempPath, data);
    await fs.promises.rename(tempPath, targetPath);
  }

  /**
   * Cleanup expired files in temp and completed folders
   */
  public async cleanupExpiredFiles(ttlMs: number = 30 * 60 * 1000): Promise<{ deletedCount: number }> {
    let deletedCount = 0;
    const now = Date.now();

    for (const folder of [this.tempDir, this.completedDir]) {
      if (!fs.existsSync(folder)) continue;

      try {
        const files = await fs.promises.readdir(folder);
        for (const file of files) {
          if (file.startsWith(".")) continue;
          const filePath = path.join(folder, file);
          try {
            const stat = await fs.promises.stat(filePath);
            if (now - stat.mtimeMs > ttlMs) {
              await fs.promises.unlink(filePath);
              deletedCount += 1;
            }
          } catch {
            // Ignore file-specific error
          }
        }
      } catch {
        // Ignore folder error
      }
    }

    this.lastCleanupTime = Date.now();
    return { deletedCount };
  }

  /**
   * Calculates storage health and disk metrics
   */
  public getStorageMetrics(): StorageMetrics {
    let tempFilesCount = 0;
    let completedFilesCount = 0;
    let persistedJobsCount = 0;
    let totalStorageBytes = 0;
    let canReadWrite = false;

    try {
      // Test read/write
      const testFile = path.join(this.tempDir, ".rw_test");
      fs.writeFileSync(testFile, "OK");
      const read = fs.readFileSync(testFile, "utf-8");
      fs.unlinkSync(testFile);
      canReadWrite = read === "OK";
    } catch {
      canReadWrite = false;
    }

    const scanFolder = (folder: string): { count: number; bytes: number } => {
      let count = 0;
      let bytes = 0;
      if (fs.existsSync(folder)) {
        try {
          const files = fs.readdirSync(folder);
          for (const f of files) {
            if (f.startsWith(".")) continue;
            count++;
            try {
              const s = fs.statSync(path.join(folder, f));
              bytes += s.size;
            } catch {}
          }
        } catch {}
      }
      return { count, bytes };
    };

    const tempScan = scanFolder(this.tempDir);
    const completedScan = scanFolder(this.completedDir);
    const jobsScan = scanFolder(this.jobsDir);

    tempFilesCount = tempScan.count;
    completedFilesCount = completedScan.count;
    persistedJobsCount = jobsScan.count;
    totalStorageBytes = tempScan.bytes + completedScan.bytes + jobsScan.bytes;

    return {
      storageDir: path.basename(this.baseDir),
      isAccessible: fs.existsSync(this.baseDir),
      canReadWrite,
      tempFilesCount,
      completedFilesCount,
      persistedJobsCount,
      totalStorageBytes,
      lastCleanup: this.lastCleanupTime,
    };
  }
}

export const diskStorage = DiskStorage.getInstance();
