import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreditCard } from "lucide-react";
import { useState } from "react";

const SUBS = [
  {
    id: 1,
    company: "TechCorp Solutions",
    plan: "Enterprise",
    price: "\u20b929,999",
    seats: 50,
    renewal: "Jan 2025",
    status: "Active",
  },
  {
    id: 2,
    company: "Infosys Ltd",
    plan: "Enterprise",
    price: "\u20b929,999",
    seats: 100,
    renewal: "Feb 2025",
    status: "Active",
  },
  {
    id: 3,
    company: "HCL Technologies",
    plan: "Enterprise",
    price: "\u20b929,999",
    seats: 75,
    renewal: "Jan 2025",
    status: "Active",
  },
  {
    id: 4,
    company: "CRED",
    plan: "Enterprise",
    price: "\u20b929,999",
    seats: 60,
    renewal: "Mar 2025",
    status: "Active",
  },
  {
    id: 5,
    company: "Naukri.com",
    plan: "Enterprise",
    price: "\u20b929,999",
    seats: 200,
    renewal: "Jan 2025",
    status: "Active",
  },
  {
    id: 6,
    company: "Wipro Technologies",
    plan: "Pro",
    price: "\u20b99,999",
    seats: 20,
    renewal: "Apr 2025",
    status: "Active",
  },
  {
    id: 7,
    company: "Razorpay",
    plan: "Pro",
    price: "\u20b99,999",
    seats: 15,
    renewal: "May 2025",
    status: "Active",
  },
  {
    id: 8,
    company: "Dream11",
    plan: "Pro",
    price: "\u20b99,999",
    seats: 10,
    renewal: "Jun 2025",
    status: "Active",
  },
  {
    id: 9,
    company: "Freshworks Inc",
    plan: "Pro",
    price: "\u20b99,999",
    seats: 12,
    renewal: "Mar 2025",
    status: "Cancelled",
  },
  {
    id: 10,
    company: "Android Studio",
    plan: "Pro",
    price: "\u20b99,999",
    seats: 8,
    renewal: "Jul 2025",
    status: "Active",
  },
  {
    id: 11,
    company: "Zepto",
    plan: "Free",
    price: "\u20b90",
    seats: 3,
    renewal: "\u2014",
    status: "Active",
  },
  {
    id: 12,
    company: "Meesho",
    plan: "Free",
    price: "\u20b90",
    seats: 3,
    renewal: "\u2014",
    status: "Active",
  },
];

const planStyle: Record<string, string> = {
  Enterprise: "bg-purple-100 text-purple-700",
  Pro: "bg-blue-100 text-blue-700",
  Free: "bg-gray-100 text-gray-600",
};

type Sub = (typeof SUBS)[0];

function getBillingHistory(sub: Sub) {
  const months = ["Dec 2024", "Nov 2024", "Oct 2024"];
  return months.map((m) => ({ date: m, amount: sub.price, status: "Paid" }));
}

export default function AdminSubscriptions() {
  const [subs, setSubs] = useState(SUBS);
  const [detailSub, setDetailSub] = useState<Sub | null>(null);

  const enterprise = subs.filter((s) => s.plan === "Enterprise").length;
  const pro = subs.filter((s) => s.plan === "Pro").length;
  const free = subs.filter((s) => s.plan === "Free").length;
  const active = subs.filter((s) => s.status === "Active").length;

  const cancel = (id: number) =>
    setSubs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Cancelled" } : s)),
    );

  const reactivate = (id: number) =>
    setSubs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Active" } : s)),
    );

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-gray-900">Subscriptions</h2>

      <div className="grid grid-cols-4 gap-3">
        {[
          ["Total Active", active, "text-blue-600"],
          ["Enterprise", enterprise, "text-purple-600"],
          ["Pro", pro, "text-blue-600"],
          ["Free", free, "text-gray-600"],
        ].map(([l, v, c]) => (
          <div
            key={l as string}
            className="bg-white border border-[#E6EAF2] rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <CreditCard size={15} className="text-gray-400" />
              <p className="text-xs text-gray-500">{l as string}</p>
            </div>
            <p className={`text-2xl font-bold ${c as string}`}>{v as number}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#E6EAF2] rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {[
                "Company",
                "Plan",
                "Price/mo",
                "Seats",
                "Renewal",
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
            {subs.map((s, i) => (
              <tr
                key={s.id}
                className={`border-b border-gray-50 hover:bg-gray-50 transition ${i === subs.length - 1 ? "border-0" : ""}`}
              >
                <td className="px-5 py-3 text-sm font-semibold text-gray-900">
                  {s.company}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${planStyle[s.plan]}`}
                  >
                    {s.plan}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-gray-700">{s.price}</td>
                <td className="px-5 py-3 text-sm text-gray-600">{s.seats}</td>
                <td className="px-5 py-3 text-sm text-gray-500">{s.renewal}</td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.status === "Active" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#FEE2E2] text-[#EF4444]"}`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setDetailSub(s)}
                      className="px-2.5 py-1 text-xs text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                    >
                      View Details
                    </button>
                    {s.status === "Active" && s.plan !== "Free" && (
                      <button
                        type="button"
                        onClick={() => cancel(s.id)}
                        className="px-2.5 py-1 text-xs text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                      >
                        Cancel
                      </button>
                    )}
                    {s.status === "Cancelled" && (
                      <button
                        type="button"
                        onClick={() => reactivate(s.id)}
                        className="px-2.5 py-1 text-xs text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition"
                      >
                        Reactivate
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      <Dialog open={!!detailSub} onOpenChange={() => setDetailSub(null)}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Subscription Details</DialogTitle>
          </DialogHeader>
          {detailSub && (
            <div className="flex flex-col gap-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Company", detailSub.company],
                  ["Plan", detailSub.plan],
                  ["Price / mo", detailSub.price],
                  ["Seats", String(detailSub.seats)],
                  ["Renewal", detailSub.renewal],
                  ["Status", detailSub.status],
                ].map(([k, v]) => (
                  <div key={k} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5">{k}</p>
                    <p className="text-sm font-semibold text-gray-900">{v}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Billing History
                </p>
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        {["Date", "Amount", "Status"].map((h) => (
                          <th
                            key={h}
                            className="text-left text-xs font-medium text-gray-400 px-3 py-2"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {getBillingHistory(detailSub).map((row) => (
                        <tr
                          key={row.date}
                          className="border-b border-gray-50 last:border-0"
                        >
                          <td className="px-3 py-2 text-sm text-gray-700">
                            {row.date}
                          </td>
                          <td className="px-3 py-2 text-sm font-semibold text-gray-900">
                            {row.amount}
                          </td>
                          <td className="px-3 py-2">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A]">
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDetailSub(null)}
                className="w-full py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition"
              >
                Close
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
