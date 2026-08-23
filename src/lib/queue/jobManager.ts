import fs from "fs";
import path from "path";
import { DownloadJob, JobState, MediaFormatOption } from "../types/media";
import { diskStorage } from "../storage/diskStorage";

class JobManager {
  private static instance: JobManager;
  private jobs: Map<string, DownloadJob> = new Map();
  private cancelTokens: Map<string, boolean> = new Map();

  private constructor() {
    this.loadPersistedJobs();

    // Auto-cleanup expired jobs every 5 minutes
    if (typeof setInterval !== "undefined") {
      setInterval(() => this.cleanupExpired(), 300000);
    }
  }

  public static getInstance(): JobManager {
    if (!JobManager.instance) {
      JobManager.instance = new JobManager();
    }
    return JobManager.instance;
  }

  private loadPersistedJobs(): void {
    const jobsDir = diskStorage.getJobsDir();
    if (!fs.existsSync(jobsDir)) return;

    try {
      const files = fs.readdirSync(jobsDir);
      for (const file of files) {
        if (file.endsWith(".json")) {
          try {
            const raw = fs.readFileSync(path.join(jobsDir, file), "utf-8");
            const job: DownloadJob = JSON.parse(raw);
            if (job && job.id) {
              this.jobs.set(job.id, job);
            }
          } catch {
            // Ignore corrupted job file
          }
        }
      }
    } catch {
      // Ignore directory scan error
    }
  }

  private persistJob(job: DownloadJob): void {
    try {
      const jobFile = diskStorage.resolveSafePath("jobs", `${job.id}.json`);
      fs.writeFileSync(jobFile, JSON.stringify(job, null, 2));
    } catch {
      // Ignore write failure in constrained env
    }
  }

  private removePersistedJob(id: string): void {
    try {
      const jobFile = diskStorage.resolveSafePath("jobs", `${id}.json`);
      if (fs.existsSync(jobFile)) {
        fs.unlinkSync(jobFile);
      }
    } catch {
      // Ignore
    }
  }

  public createJob(
    url: string,
    title: string,
    platformId: string,
    selectedFormat: MediaFormatOption,
    isBatch: boolean = false
  ): DownloadJob {
    const now = Date.now();
    const id = `job_${now}_${Math.random().toString(36).substr(2, 9)}`;

    const job: DownloadJob = {
      id,
      url,
      title,
      platformId,
      state: JobState.QUEUED,
      progress: 0,
      selectedFormat,
      downloadUrl: selectedFormat.url,
      createdAt: now,
      updatedAt: now,
      expiresAt: now + 30 * 60 * 1000, // 30 minutes TTL
      isBatch,
    };

    this.jobs.set(id, job);
    this.cancelTokens.set(id, false);
    this.persistJob(job);
    return job;
  }

  public getJob(id: string): DownloadJob | null {
    if (this.jobs.has(id)) {
      return this.jobs.get(id)!;
    }
    // Attempt load from disk if not in memory
    try {
      const jobFile = diskStorage.resolveSafePath("jobs", `${id}.json`);
      if (fs.existsSync(jobFile)) {
        const raw = fs.readFileSync(jobFile, "utf-8");
        const job: DownloadJob = JSON.parse(raw);
        this.jobs.set(id, job);
        return job;
      }
    } catch {
      // Ignore
    }
    return null;
  }

  public updateJobState(id: string, updates: Partial<DownloadJob>): DownloadJob | null {
    const job = this.getJob(id);
    if (!job) return null;

    const updated: DownloadJob = {
      ...job,
      ...updates,
      updatedAt: Date.now(),
    };

    this.jobs.set(id, updated);
    this.persistJob(updated);
    return updated;
  }

  public cancelJob(id: string): boolean {
    const job = this.getJob(id);
    if (!job) return false;

    this.cancelTokens.set(id, true);
    this.updateJobState(id, { state: JobState.CANCELLED });
    return true;
  }

  public isCancelled(id: string): boolean {
    return this.cancelTokens.get(id) === true;
  }

  public retryJob(id: string): DownloadJob | null {
    const job = this.getJob(id);
    if (!job) return null;

    this.cancelTokens.set(id, false);
    return this.updateJobState(id, {
      state: JobState.QUEUED,
      progress: 0,
      error: undefined,
    });
  }

  public listActiveJobs(): DownloadJob[] {
    return Array.from(this.jobs.values()).sort((a, b) => b.createdAt - a.createdAt);
  }

  private cleanupExpired(): void {
    const now = Date.now();
    for (const [id, job] of this.jobs.entries()) {
      if (job.expiresAt && now > job.expiresAt) {
        this.jobs.delete(id);
        this.cancelTokens.delete(id);
        this.removePersistedJob(id);
      }
    }
  }
}

export const jobManager = JobManager.getInstance();
