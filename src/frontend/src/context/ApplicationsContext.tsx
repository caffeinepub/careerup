import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { MockJob } from "../data/mockJobs";

export type AppStatus = "applied" | "interviewing" | "rejected";

export interface ApplicationEntry {
  job: MockJob;
  status: AppStatus;
  appliedDate: string;
}

interface ApplicationsContextValue {
  applications: ApplicationEntry[];
  addApplication: (job: MockJob) => void;
  updateStatus: (jobId: bigint, status: AppStatus) => void;
  isApplied: (jobId: bigint) => boolean;
}

const ApplicationsContext = createContext<ApplicationsContextValue | null>(
  null,
);

function serializeApplications(apps: ApplicationEntry[]): string {
  return JSON.stringify(
    apps.map((a) => ({
      ...a,
      job: { ...a.job, id: a.job.id.toString() },
    })),
  );
}

function deserializeApplications(raw: string): ApplicationEntry[] {
  try {
    const parsed = JSON.parse(raw);
    return parsed.map(
      (a: ApplicationEntry & { job: MockJob & { id: string } }) => ({
        ...a,
        job: { ...a.job, id: BigInt(a.job.id) },
      }),
    );
  } catch {
    return [];
  }
}

export function ApplicationsContextProvider({
  children,
}: { children: React.ReactNode }) {
  const [applications, setApplications] = useState<ApplicationEntry[]>(() => {
    const stored = localStorage.getItem("careerup_applications");
    return stored ? deserializeApplications(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "careerup_applications",
      serializeApplications(applications),
    );
  }, [applications]);

  const addApplication = useCallback((job: MockJob) => {
    setApplications((prev) => {
      if (prev.some((a) => a.job.id === job.id)) return prev;
      return [{ job, status: "applied", appliedDate: "Just now" }, ...prev];
    });
  }, []);

  const updateStatus = useCallback((jobId: bigint, status: AppStatus) => {
    setApplications((prev) =>
      prev.map((a) => (a.job.id === jobId ? { ...a, status } : a)),
    );
  }, []);

  const isApplied = useCallback(
    (jobId: bigint) => applications.some((a) => a.job.id === jobId),
    [applications],
  );

  return (
    <ApplicationsContext.Provider
      value={{ applications, addApplication, updateStatus, isApplied }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const ctx = useContext(ApplicationsContext);
  if (!ctx)
    throw new Error(
      "useApplications must be used within ApplicationsContextProvider",
    );
  return ctx;
}
