import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Building2, Eye, Plus, Search, UserX } from "lucide-react";
import { useState } from "react";

const RECRUITERS = [
  {
    id: 1,
    company: "TechCorp Solutions",
    contact: "Sarah Chen",
    email: "sarah@techcorp.com",
    plan: "Enterprise",
    jobs: 24,
    joined: "Jan 2024",
    status: "Active",
  },
  {
    id: 2,
    company: "Infosys Ltd",
    contact: "Rajesh Kumar",
    email: "rajesh@infosys.com",
    plan: "Pro",
    jobs: 18,
    joined: "Feb 2024",
    status: "Active",
  },
  {
    id: 3,
    company: "Wipro Technologies",
    contact: "Priya Singh",
    email: "priya@wipro.com",
    plan: "Pro",
    jobs: 15,
    joined: "Mar 2024",
    status: "Active",
  },
  {
    id: 4,
    company: "HCL Technologies",
    contact: "Amit Sharma",
    email: "amit@hcl.com",
    plan: "Enterprise",
    jobs: 32,
    joined: "Jan 2024",
    status: "Active",
  },
  {
    id: 5,
    company: "Freshworks Inc",
    contact: "Divya Nair",
    email: "divya@freshworks.com",
    plan: "Pro",
    jobs: 11,
    joined: "Apr 2024",
    status: "Suspended",
  },
  {
    id: 6,
    company: "Razorpay",
    contact: "Harshil Mathur",
    email: "harshil@razorpay.com",
    plan: "Pro",
    jobs: 8,
    joined: "May 2024",
    status: "Active",
  },
  {
    id: 7,
    company: "Zepto",
    contact: "Aadit Palicha",
    email: "aadit@zepto.in",
    plan: "Free",
    jobs: 3,
    joined: "Jun 2024",
    status: "Active",
  },
  {
    id: 8,
    company: "Meesho",
    contact: "Vidit Aatrey",
    email: "vidit@meesho.com",
    plan: "Free",
    jobs: 5,
    joined: "Jun 2024",
    status: "Active",
  },
  {
    id: 9,
    company: "CRED",
    contact: "Kunal Shah",
    email: "kunal@cred.club",
    plan: "Enterprise",
    jobs: 20,
    joined: "Feb 2024",
    status: "Active",
  },
  {
    id: 10,
    company: "Dream11",
    contact: "Harsh Jain",
    email: "harsh@dream11.com",
    plan: "Pro",
    jobs: 9,
    joined: "Jul 2024",
    status: "Active",
  },
  {
    id: 11,
    company: "Naukri.com",
    contact: "Hitesh Oberoi",
    email: "hitesh@naukri.com",
    plan: "Enterprise",
    jobs: 45,
    joined: "Jan 2024",
    status: "Active",
  },
  {
    id: 12,
    company: "Byju's",
    contact: "Mrinal Mohit",
    email: "mrinal@byjus.com",
    plan: "Free",
    jobs: 2,
    joined: "Aug 2024",
    status: "Suspended",
  },
];

const planColor: Record<string, string> = {
  Enterprise: "bg-purple-100 text-purple-700",
  Pro: "bg-blue-100 text-blue-700",
  Free: "bg-gray-100 text-gray-600",
};

type Recruiter = (typeof RECRUITERS)[0];

export default function AdminRecruiters() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [recruiters, setRecruiters] = useState(RECRUITERS);
  const [selected, setSelected] = useState<Recruiter | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    plan: "Free",
  });
  const [formError, setFormError] = useState("");

  const filtered = recruiters.filter((r) => {
    const matchSearch =
      r.company.toLowerCase().includes(search.toLowerCase()) ||
      r.contact.toLowerCase().includes(search.toLowerCase());
    const matchPlan = planFilter === "All" || r.plan === planFilter;
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    return matchSearch && matchPlan && matchStatus;
  });

  const toggleStatus = (id: number) => {
    setRecruiters((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: r.status === "Active" ? "Suspended" : "Active" }
          : r,
      ),
    );
  };

  const handleAddSubmit = () => {
    if (!form.company.trim() || !form.contact.trim() || !form.email.trim()) {
      setFormError("All fields are required.");
      return;
    }
    const now = new Date();
    const month = now.toLocaleString("default", { month: "short" });
    const year = now.getFullYear();
    setRecruiters((prev) => [
      ...prev,
      {
        id: Date.now(),
        company: form.company.trim(),
        contact: form.contact.trim(),
        email: form.email.trim(),
        plan: form.plan,
        jobs: 0,
        joined: `${month} ${year}`,
        status: "Active",
      },
    ]);
    setForm({ company: "", contact: "", email: "", plan: "Free" });
    setFormError("");
    setAddOpen(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Recruiters</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {recruiters.length} registered companies
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setAddOpen(true);
            setFormError("");
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition"
        >
          <Plus size={15} />
          Add Recruiter
        </button>
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
            placeholder="Search company or contact..."
            className="pl-9 bg-white border-gray-200 rounded-xl h-9 text-sm"
          />
        </div>
        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
          className="h-9 px-3 border border-gray-200 rounded-xl text-sm bg-white text-gray-700 outline-none"
        >
          <option>All</option>
          <option>Enterprise</option>
          <option>Pro</option>
          <option>Free</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 px-3 border border-gray-200 rounded-xl text-sm bg-white text-gray-700 outline-none"
        >
          <option>All</option>
          <option>Active</option>
          <option>Suspended</option>
        </select>
      </div>

      <div className="bg-white border border-[#E6EAF2] rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {[
                "Company",
                "Contact",
                "Subscription",
                "Active Jobs",
                "Joined",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr
                key={r.id}
                className={`border-b border-gray-50 hover:bg-gray-50 transition ${i === filtered.length - 1 ? "border-0" : ""}`}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Building2 size={14} className="text-blue-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {r.company}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <p className="text-sm text-gray-700">{r.contact}</p>
                  <p className="text-xs text-gray-400">{r.email}</p>
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${planColor[r.plan]}`}
                  >
                    {r.plan}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-700 font-medium">
                  {r.jobs}
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-500">
                  {r.joined}
                </td>
                <td className="px-5 py-3.5">
                  <Badge
                    variant={r.status === "Active" ? "default" : "destructive"}
                    className={
                      r.status === "Active"
                        ? "bg-[#DCFCE7] text-[#16A34A] hover:bg-[#DCFCE7]"
                        : "bg-[#FEE2E2] text-[#EF4444] hover:bg-[#FEE2E2]"
                    }
                  >
                    {r.status}
                  </Badge>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelected(r)}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                    >
                      <Eye size={12} />
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleStatus(r.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg transition ${r.status === "Active" ? "text-red-600 bg-red-50 hover:bg-red-100" : "text-green-600 bg-green-50 hover:bg-green-100"}`}
                    >
                      <UserX size={12} />
                      {r.status === "Active" ? "Suspend" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>{selected?.company}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="flex flex-col gap-3 mt-2">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Contact", selected.contact],
                  ["Email", selected.email],
                  ["Plan", selected.plan],
                  ["Active Jobs", String(selected.jobs)],
                  ["Joined", selected.joined],
                  ["Status", selected.status],
                ].map(([k, v]) => (
                  <div key={k} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">{k}</p>
                    <p className="text-sm font-semibold text-gray-900">{v}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-2">Open Roles</p>
                {[
                  "Senior Frontend Engineer",
                  "Product Manager",
                  "Data Scientist",
                ].map((role) => (
                  <div key={role} className="flex items-center gap-2 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-sm text-gray-700">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Recruiter Modal */}
      <Dialog
        open={addOpen}
        onOpenChange={(v) => {
          setAddOpen(v);
          setFormError("");
        }}
      >
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Add Recruiter</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">
                Company Name *
              </p>
              <Input
                value={form.company}
                onChange={(e) =>
                  setForm((f) => ({ ...f, company: e.target.value }))
                }
                placeholder="e.g. TechCorp Solutions"
                className="bg-white border-gray-200 rounded-xl h-9 text-sm"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">
                Contact Name *
              </p>
              <Input
                value={form.contact}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contact: e.target.value }))
                }
                placeholder="e.g. Jane Doe"
                className="bg-white border-gray-200 rounded-xl h-9 text-sm"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Email *</p>
              <Input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="e.g. jane@company.com"
                className="bg-white border-gray-200 rounded-xl h-9 text-sm"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Plan</p>
              <select
                value={form.plan}
                onChange={(e) =>
                  setForm((f) => ({ ...f, plan: e.target.value }))
                }
                className="w-full h-9 px-3 border border-gray-200 rounded-xl text-sm bg-white text-gray-700 outline-none"
              >
                <option>Free</option>
                <option>Pro</option>
                <option>Enterprise</option>
              </select>
            </div>
            {formError && <p className="text-xs text-red-500">{formError}</p>}
            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={handleAddSubmit}
                className="flex-1 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition"
              >
                Add Recruiter
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddOpen(false);
                  setFormError("");
                }}
                className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
