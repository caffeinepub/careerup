import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckCircle, Eye, Search, Trash2, XCircle } from "lucide-react";
import { useState } from "react";

type JobStatus = "Active" | "Pending" | "Flagged" | "Removed";

const JOBS: {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  posted: string;
  applications: number;
  status: JobStatus;
}[] = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "TechCorp Solutions",
    location: "Bangalore",
    salary: "\u20b924-32 LPA",
    posted: "2 days ago",
    applications: 34,
    status: "Active",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "Razorpay",
    location: "Mumbai",
    salary: "\u20b930-45 LPA",
    posted: "3 days ago",
    applications: 28,
    status: "Active",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Infosys Ltd",
    location: "Hyderabad",
    salary: "\u20b918-26 LPA",
    posted: "5 days ago",
    applications: 19,
    status: "Pending",
  },
  {
    id: 4,
    title: "Backend Engineer (Node.js)",
    company: "CRED",
    location: "Bangalore",
    salary: "\u20b922-30 LPA",
    posted: "1 week ago",
    applications: 41,
    status: "Active",
  },
  {
    id: 5,
    title: "UX Designer",
    company: "Freshworks Inc",
    location: "Remote",
    salary: "\u20b915-22 LPA",
    posted: "1 week ago",
    applications: 15,
    status: "Flagged",
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "Wipro Technologies",
    location: "Pune",
    salary: "\u20b920-28 LPA",
    posted: "2 weeks ago",
    applications: 22,
    status: "Active",
  },
  {
    id: 7,
    title: "Machine Learning Engineer",
    company: "HCL Technologies",
    location: "Chennai",
    salary: "\u20b928-40 LPA",
    posted: "2 weeks ago",
    applications: 17,
    status: "Active",
  },
  {
    id: 8,
    title: "Sales Executive",
    company: "Byju's",
    location: "Multiple",
    salary: "\u20b98-12 LPA",
    posted: "3 weeks ago",
    applications: 56,
    status: "Removed",
  },
  {
    id: 9,
    title: "QA Automation Engineer",
    company: "Naukri.com",
    location: "Noida",
    salary: "\u20b912-18 LPA",
    posted: "3 weeks ago",
    applications: 11,
    status: "Active",
  },
  {
    id: 10,
    title: "Cloud Architect",
    company: "Dream11",
    location: "Mumbai",
    salary: "\u20b935-50 LPA",
    posted: "1 month ago",
    applications: 9,
    status: "Pending",
  },
  {
    id: 11,
    title: "Android Developer",
    company: "Meesho",
    location: "Bangalore",
    salary: "\u20b916-24 LPA",
    posted: "1 month ago",
    applications: 30,
    status: "Active",
  },
  {
    id: 12,
    title: "HR Manager",
    company: "Zepto",
    location: "Mumbai",
    salary: "\u20b910-15 LPA",
    posted: "1 month ago",
    applications: 14,
    status: "Flagged",
  },
  {
    id: 13,
    title: "Finance Analyst",
    company: "TechCorp Solutions",
    location: "Delhi",
    salary: "\u20b914-20 LPA",
    posted: "6 weeks ago",
    applications: 23,
    status: "Active",
  },
  {
    id: 14,
    title: "Content Strategist",
    company: "Infosys Ltd",
    location: "Remote",
    salary: "\u20b98-12 LPA",
    posted: "2 months ago",
    applications: 38,
    status: "Active",
  },
  {
    id: 15,
    title: "Blockchain Developer",
    company: "CRED",
    location: "Bangalore",
    salary: "\u20b930-45 LPA",
    posted: "2 months ago",
    applications: 8,
    status: "Pending",
  },
];

const statusStyle: Record<JobStatus, string> = {
  Active: "bg-[#DCFCE7] text-[#16A34A]",
  Pending: "bg-[#FEF9C3] text-[#CA8A04]",
  Flagged: "bg-orange-100 text-orange-600",
  Removed: "bg-[#FEE2E2] text-[#EF4444]",
};

export default function AdminJobs() {
  const [jobs, setJobs] = useState(JOBS);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"All" | JobStatus>("All");
  const [confirmModal, setConfirmModal] = useState<{
    job: (typeof JOBS)[0];
    action: string;
  } | null>(null);
  const [viewJob, setViewJob] = useState<(typeof JOBS)[0] | null>(null);

  const filtered = jobs.filter((j) => {
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase());
    const matchTab = tab === "All" || j.status === tab;
    return matchSearch && matchTab;
  });

  const doAction = () => {
    if (!confirmModal) return;
    const newStatus: JobStatus =
      confirmModal.action === "Approve"
        ? "Active"
        : confirmModal.action === "Reject"
          ? "Removed"
          : "Removed";
    setJobs((prev) =>
      prev.map((j) =>
        j.id === confirmModal.job.id ? { ...j, status: newStatus } : j,
      ),
    );
    setConfirmModal(null);
  };

  const tabs: ("All" | JobStatus)[] = [
    "All",
    "Active",
    "Pending",
    "Flagged",
    "Removed",
  ];
  const tabCount = (t: string) =>
    t === "All" ? jobs.length : jobs.filter((j) => j.status === t).length;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Job Postings</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {jobs.length} total postings across all companies
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium transition border-b-2 -mb-px ${tab === t ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            {t}{" "}
            <span className="ml-1 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
              {tabCount(t)}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className="pl-9 bg-white border-gray-200 rounded-xl h-9 text-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-[#E6EAF2] rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {[
                "Job Title",
                "Company",
                "Location",
                "Salary",
                "Posted",
                "Applications",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((j, i) => (
              <tr
                key={j.id}
                className={`border-b border-gray-50 hover:bg-gray-50 transition ${i === filtered.length - 1 ? "border-0" : ""}`}
              >
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                  {j.title}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{j.company}</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {j.location}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{j.salary}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{j.posted}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-700">
                  {j.applications}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[j.status]}`}
                  >
                    {j.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setViewJob(j)}
                      className="p-1.5 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                    >
                      <Eye size={12} />
                    </button>
                    {(j.status === "Pending" || j.status === "Flagged") && (
                      <button
                        type="button"
                        onClick={() =>
                          setConfirmModal({ job: j, action: "Approve" })
                        }
                        className="p-1.5 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition"
                      >
                        <CheckCircle size={12} />
                      </button>
                    )}
                    {j.status !== "Removed" && (
                      <button
                        type="button"
                        onClick={() =>
                          setConfirmModal({ job: j, action: "Remove" })
                        }
                        className="p-1.5 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                    {j.status === "Active" && (
                      <button
                        type="button"
                        onClick={() =>
                          setConfirmModal({ job: j, action: "Reject" })
                        }
                        className="p-1.5 text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition"
                      >
                        <XCircle size={12} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!viewJob} onOpenChange={() => setViewJob(null)}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>{viewJob?.title}</DialogTitle>
          </DialogHeader>
          {viewJob && (
            <div className="flex flex-col gap-3 mt-2">
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["Company", viewJob.company],
                  ["Location", viewJob.location],
                  ["Salary", viewJob.salary],
                  ["Posted", viewJob.posted],
                  ["Applications", String(viewJob.applications)],
                  ["Status", viewJob.status],
                ].map(([k, v]) => (
                  <div key={k} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400">{k}</p>
                    <p className="text-sm font-semibold text-gray-900">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!confirmModal} onOpenChange={() => setConfirmModal(null)}>
        <DialogContent className="max-w-sm bg-white">
          <DialogHeader>
            <DialogTitle>Confirm {confirmModal?.action}</DialogTitle>
          </DialogHeader>
          {confirmModal && (
            <div className="flex flex-col gap-4 mt-2">
              <p className="text-sm text-gray-600">
                Are you sure you want to{" "}
                <strong>{confirmModal.action.toLowerCase()}</strong>{" "}
                <strong>"{confirmModal.job.title}"</strong> by{" "}
                {confirmModal.job.company}?
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={doAction}
                  className="flex-1 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmModal(null)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
