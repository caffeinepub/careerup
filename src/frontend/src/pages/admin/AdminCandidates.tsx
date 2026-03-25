import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Eye, Search } from "lucide-react";
import { useState } from "react";

const CANDIDATES = [
  {
    id: 1,
    name: "Aarav Patel",
    email: "aarav@gmail.com",
    location: "Mumbai",
    applications: 12,
    lastActive: "Today",
    status: "Active",
    avatar: "/assets/generated/candidate-1.dim_200x200.jpg",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@gmail.com",
    location: "Bangalore",
    applications: 8,
    lastActive: "Yesterday",
    status: "Active",
    avatar: "/assets/generated/candidate-2.dim_200x200.jpg",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    email: "rohan@gmail.com",
    location: "Delhi",
    applications: 5,
    lastActive: "3 days ago",
    status: "Warned",
    avatar: "/assets/generated/candidate-3.dim_200x200.jpg",
  },
  {
    id: 4,
    name: "Sneha Nair",
    email: "sneha@gmail.com",
    location: "Chennai",
    applications: 15,
    lastActive: "Today",
    status: "Active",
    avatar: "/assets/generated/candidate-4.dim_200x200.jpg",
  },
  {
    id: 5,
    name: "Karan Verma",
    email: "karan@gmail.com",
    location: "Hyderabad",
    applications: 3,
    lastActive: "1 week ago",
    status: "Banned",
    avatar: "/assets/generated/candidate-5.dim_200x200.jpg",
  },
  {
    id: 6,
    name: "Ananya Singh",
    email: "ananya@gmail.com",
    location: "Pune",
    applications: 9,
    lastActive: "2 days ago",
    status: "Active",
    avatar: "/assets/generated/candidate-6.dim_200x200.jpg",
  },
  {
    id: 7,
    name: "Vikram Rao",
    email: "vikram@gmail.com",
    location: "Kolkata",
    applications: 6,
    lastActive: "Today",
    status: "Active",
    avatar: "/assets/generated/candidate-7.dim_200x200.jpg",
  },
  {
    id: 8,
    name: "Deepika Pillai",
    email: "deepika@gmail.com",
    location: "Bangalore",
    applications: 11,
    lastActive: "Yesterday",
    status: "Active",
    avatar: "/assets/generated/candidate-8.dim_200x200.jpg",
  },
  {
    id: 9,
    name: "Arjun Kapoor",
    email: "arjun@gmail.com",
    location: "Mumbai",
    applications: 7,
    lastActive: "4 days ago",
    status: "Active",
    avatar: "",
  },
  {
    id: 10,
    name: "Meera Joshi",
    email: "meera@gmail.com",
    location: "Delhi",
    applications: 4,
    lastActive: "Today",
    status: "Warned",
    avatar: "",
  },
  {
    id: 11,
    name: "Suresh Babu",
    email: "suresh@gmail.com",
    location: "Chennai",
    applications: 2,
    lastActive: "2 weeks ago",
    status: "Banned",
    avatar: "",
  },
  {
    id: 12,
    name: "Ishaan Gupta",
    email: "ishaan@gmail.com",
    location: "Hyderabad",
    applications: 10,
    lastActive: "Today",
    status: "Active",
    avatar: "",
  },
  {
    id: 13,
    name: "Nisha Reddy",
    email: "nisha@gmail.com",
    location: "Pune",
    applications: 8,
    lastActive: "Yesterday",
    status: "Active",
    avatar: "",
  },
  {
    id: 14,
    name: "Tarun Shah",
    email: "tarun@gmail.com",
    location: "Bangalore",
    applications: 6,
    lastActive: "3 days ago",
    status: "Active",
    avatar: "",
  },
  {
    id: 15,
    name: "Kavya Iyer",
    email: "kavya@gmail.com",
    location: "Mumbai",
    applications: 14,
    lastActive: "Today",
    status: "Active",
    avatar: "",
  },
];

const statusStyle: Record<string, string> = {
  Active: "bg-[#DCFCE7] text-[#16A34A]",
  Warned: "bg-[#FEF9C3] text-[#CA8A04]",
  Banned: "bg-[#FEE2E2] text-[#EF4444]",
};

export default function AdminCandidates() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [candidates, setCandidates] = useState(CANDIDATES);
  const [actionModal, setActionModal] = useState<{
    candidate: (typeof CANDIDATES)[0];
    action: string;
  } | null>(null);
  const [reason, setReason] = useState("");
  const [viewModal, setViewModal] = useState<(typeof CANDIDATES)[0] | null>(
    null,
  );

  const filtered = candidates.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const applyAction = () => {
    if (!actionModal) return;
    const newStatus =
      actionModal.action === "Ban"
        ? "Banned"
        : actionModal.action === "Warn"
          ? "Warned"
          : "Active";
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === actionModal.candidate.id ? { ...c, status: newStatus } : c,
      ),
    );
    setActionModal(null);
    setReason("");
  };

  const total = candidates.length;
  const active = candidates.filter((c) => c.status === "Active").length;
  const banned = candidates.filter((c) => c.status === "Banned").length;
  const warned = candidates.filter((c) => c.status === "Warned").length;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Candidates</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {total} registered candidates
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          ["Total", total, "bg-blue-50 text-blue-700"],
          ["Active", active, "bg-green-50 text-green-700"],
          ["Warned", warned, "bg-yellow-50 text-yellow-700"],
          ["Banned", banned, "bg-red-50 text-red-700"],
        ].map(([label, val, cls]) => (
          <div
            key={label as string}
            className="bg-white border border-[#E6EAF2] rounded-2xl p-4 shadow-sm"
          >
            <p className="text-xs text-gray-500">{label as string}</p>
            <p className={`text-2xl font-bold mt-1 ${cls as string}`}>
              {val as number}
            </p>
          </div>
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
            placeholder="Search candidates..."
            className="pl-9 bg-white border-gray-200 rounded-xl h-9 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 px-3 border border-gray-200 rounded-xl text-sm bg-white text-gray-700 outline-none"
        >
          <option>All</option>
          <option>Active</option>
          <option>Warned</option>
          <option>Banned</option>
        </select>
      </div>

      <div className="bg-white border border-[#E6EAF2] rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {[
                "Candidate",
                "Location",
                "Applications",
                "Last Active",
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
            {filtered.map((c, i) => (
              <tr
                key={c.id}
                className={`border-b border-gray-50 hover:bg-gray-50 transition ${i === filtered.length - 1 ? "border-0" : ""}`}
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {c.avatar ? (
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-indigo-600">
                          {c.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {c.name}
                      </p>
                      <p className="text-xs text-gray-400">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-gray-600">
                  {c.location}
                </td>
                <td className="px-5 py-3 text-sm font-medium text-gray-700">
                  {c.applications}
                </td>
                <td className="px-5 py-3 text-sm text-gray-500">
                  {c.lastActive}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setViewModal(c)}
                      className="px-2 py-1 text-xs text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition flex items-center gap-1"
                    >
                      <Eye size={11} />
                      View
                    </button>
                    {c.status !== "Warned" && c.status !== "Banned" && (
                      <button
                        type="button"
                        onClick={() =>
                          setActionModal({ candidate: c, action: "Warn" })
                        }
                        className="px-2 py-1 text-xs text-yellow-700 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition"
                      >
                        Warn
                      </button>
                    )}
                    {c.status !== "Banned" && (
                      <button
                        type="button"
                        onClick={() =>
                          setActionModal({ candidate: c, action: "Ban" })
                        }
                        className="px-2 py-1 text-xs text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                      >
                        Ban
                      </button>
                    )}
                    {c.status !== "Active" && (
                      <button
                        type="button"
                        onClick={() =>
                          setActionModal({ candidate: c, action: "Restore" })
                        }
                        className="px-2 py-1 text-xs text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition"
                      >
                        Restore
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      <Dialog open={!!viewModal} onOpenChange={() => setViewModal(null)}>
        <DialogContent className="max-w-sm bg-white">
          <DialogHeader>
            <DialogTitle>Candidate Profile</DialogTitle>
          </DialogHeader>
          {viewModal && (
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex items-center gap-3">
                {viewModal.avatar ? (
                  <img
                    src={viewModal.avatar}
                    alt={viewModal.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="font-bold text-indigo-600">
                      {viewModal.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-gray-900">{viewModal.name}</p>
                  <p className="text-xs text-gray-500">{viewModal.email}</p>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${statusStyle[viewModal.status]}`}
                  >
                    {viewModal.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["Location", viewModal.location],
                  ["Applications", String(viewModal.applications)],
                  ["Last Active", viewModal.lastActive],
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

      {/* Action Modal */}
      <Dialog open={!!actionModal} onOpenChange={() => setActionModal(null)}>
        <DialogContent className="max-w-sm bg-white">
          <DialogHeader>
            <DialogTitle>{actionModal?.action} Candidate</DialogTitle>
          </DialogHeader>
          {actionModal && (
            <div className="flex flex-col gap-4 mt-2">
              <p className="text-sm text-gray-600">
                You are about to{" "}
                <strong>{actionModal.action.toLowerCase()}</strong>{" "}
                <strong>{actionModal.candidate.name}</strong>. Please provide a
                reason.
              </p>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason (optional)"
                className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 resize-none h-20 outline-none"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={applyAction}
                  className="flex-1 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition"
                >
                  Confirm {actionModal.action}
                </button>
                <button
                  type="button"
                  onClick={() => setActionModal(null)}
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
