import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Printer, Receipt, Search } from "lucide-react";
import { useState } from "react";

const TX = [
  {
    id: "TXN-001",
    company: "TechCorp Solutions",
    amount: "\u20b929,999",
    plan: "Enterprise",
    date: "15 Jan 2024",
    method: "Razorpay",
    status: "Completed",
  },
  {
    id: "TXN-002",
    company: "Infosys Ltd",
    amount: "\u20b929,999",
    plan: "Enterprise",
    date: "18 Jan 2024",
    method: "Stripe",
    status: "Completed",
  },
  {
    id: "TXN-003",
    company: "Wipro Technologies",
    amount: "\u20b99,999",
    plan: "Pro",
    date: "20 Jan 2024",
    method: "Razorpay",
    status: "Completed",
  },
  {
    id: "TXN-004",
    company: "Razorpay",
    amount: "\u20b99,999",
    plan: "Pro",
    date: "22 Jan 2024",
    method: "Stripe",
    status: "Completed",
  },
  {
    id: "TXN-005",
    company: "HCL Technologies",
    amount: "\u20b929,999",
    plan: "Enterprise",
    date: "25 Jan 2024",
    method: "Razorpay",
    status: "Completed",
  },
  {
    id: "TXN-006",
    company: "Freshworks Inc",
    amount: "\u20b99,999",
    plan: "Pro",
    date: "1 Feb 2024",
    method: "Stripe",
    status: "Refunded",
  },
  {
    id: "TXN-007",
    company: "CRED",
    amount: "\u20b929,999",
    plan: "Enterprise",
    date: "5 Feb 2024",
    method: "Razorpay",
    status: "Completed",
  },
  {
    id: "TXN-008",
    company: "Dream11",
    amount: "\u20b99,999",
    plan: "Pro",
    date: "8 Feb 2024",
    method: "Stripe",
    status: "Pending",
  },
  {
    id: "TXN-009",
    company: "Naukri.com",
    amount: "\u20b929,999",
    plan: "Enterprise",
    date: "10 Feb 2024",
    method: "Razorpay",
    status: "Completed",
  },
  {
    id: "TXN-010",
    company: "Meesho",
    amount: "\u20b99,999",
    plan: "Pro",
    date: "12 Feb 2024",
    method: "Stripe",
    status: "Completed",
  },
  {
    id: "TXN-011",
    company: "Zepto",
    amount: "\u20b99,999",
    plan: "Pro",
    date: "15 Feb 2024",
    method: "Razorpay",
    status: "Pending",
  },
  {
    id: "TXN-012",
    company: "TechCorp Solutions",
    amount: "\u20b929,999",
    plan: "Enterprise",
    date: "15 Feb 2024",
    method: "Razorpay",
    status: "Completed",
  },
  {
    id: "TXN-013",
    company: "Byju's",
    amount: "\u20b99,999",
    plan: "Pro",
    date: "18 Feb 2024",
    method: "Stripe",
    status: "Refunded",
  },
  {
    id: "TXN-014",
    company: "Infosys Ltd",
    amount: "\u20b929,999",
    plan: "Enterprise",
    date: "18 Feb 2024",
    method: "Stripe",
    status: "Completed",
  },
  {
    id: "TXN-015",
    company: "Wipro Technologies",
    amount: "\u20b99,999",
    plan: "Pro",
    date: "20 Feb 2024",
    method: "Razorpay",
    status: "Completed",
  },
];

const statusStyle: Record<string, string> = {
  Completed: "bg-[#DCFCE7] text-[#16A34A]",
  Pending: "bg-[#FEF9C3] text-[#CA8A04]",
  Refunded: "bg-[#FEE2E2] text-[#EF4444]",
};

type Tx = (typeof TX)[0];

export default function AdminTransactions() {
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState(TX);
  const [refundModal, setRefundModal] = useState<Tx | null>(null);
  const [invoiceModal, setInvoiceModal] = useState<Tx | null>(null);

  const filtered = transactions.filter(
    (t) =>
      t.company.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()),
  );

  const doRefund = () => {
    if (!refundModal) return;
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === refundModal.id ? { ...t, status: "Refunded" } : t,
      ),
    );
    setRefundModal(null);
  };

  const totalRevenue = "\u20b948.2L";
  const thisMonth = "\u20b94.8L";
  const pending = transactions.filter((t) => t.status === "Pending").length;
  const refunded = transactions.filter((t) => t.status === "Refunded").length;

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-gray-900">Transactions</h2>

      <div className="grid grid-cols-4 gap-3">
        {[
          ["Total Revenue", totalRevenue, "text-blue-700"],
          ["This Month", thisMonth, "text-green-600"],
          [`${pending} Pending`, "Transactions", "text-yellow-600"],
          [`${refunded} Refunded`, "Transactions", "text-red-600"],
        ].map(([val, label, cls]) => (
          <div
            key={val as string}
            className="bg-white border border-[#E6EAF2] rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <Receipt size={14} className="text-gray-400" />
              <p className="text-xs text-gray-500">{label as string}</p>
            </div>
            <p className={`text-2xl font-bold ${cls as string}`}>
              {val as string}
            </p>
          </div>
        ))}
      </div>

      <div className="relative max-w-xs">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions..."
          className="pl-9 bg-white border-gray-200 rounded-xl h-9 text-sm"
        />
      </div>

      <div className="bg-white border border-[#E6EAF2] rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {[
                "Transaction ID",
                "Company",
                "Amount",
                "Plan",
                "Date",
                "Method",
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
            {filtered.map((t, i) => (
              <tr
                key={t.id}
                className={`border-b border-gray-50 hover:bg-gray-50 transition ${i === filtered.length - 1 ? "border-0" : ""}`}
              >
                <td className="px-4 py-3 text-xs font-mono text-gray-600">
                  {t.id}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                  {t.company}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">
                  {t.amount}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{t.plan}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{t.date}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{t.method}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[t.status]}`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setInvoiceModal(t)}
                      className="px-2 py-1 text-xs text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                    >
                      Invoice
                    </button>
                    {t.status === "Completed" && (
                      <button
                        type="button"
                        onClick={() => setRefundModal(t)}
                        className="px-2 py-1 text-xs text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                      >
                        Refund
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Refund Modal */}
      <Dialog open={!!refundModal} onOpenChange={() => setRefundModal(null)}>
        <DialogContent className="max-w-sm bg-white">
          <DialogHeader>
            <DialogTitle>Process Refund</DialogTitle>
          </DialogHeader>
          {refundModal && (
            <div className="flex flex-col gap-4 mt-2">
              <p className="text-sm text-gray-600">
                Refund <strong>{refundModal.amount}</strong> to{" "}
                <strong>{refundModal.company}</strong> for their{" "}
                {refundModal.plan} subscription?
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                <p className="text-xs text-yellow-700 font-medium">
                  This action cannot be undone. The refund will be processed
                  within 5-7 business days.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={doRefund}
                  className="flex-1 py-2 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition"
                >
                  Confirm Refund
                </button>
                <button
                  type="button"
                  onClick={() => setRefundModal(null)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Invoice Modal */}
      <Dialog open={!!invoiceModal} onOpenChange={() => setInvoiceModal(null)}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="sr-only">Invoice</DialogTitle>
          </DialogHeader>
          {invoiceModal && (
            <div className="flex flex-col gap-5" id="invoice-print-area">
              {/* Invoice header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center">
                    <span className="text-white font-bold text-base">C</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      CareerUp Platform Invoice
                    </p>
                    <p className="text-xs text-gray-400">careerup.io</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[invoiceModal.status]}`}
                >
                  {invoiceModal.status}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-400">Invoice #</p>
                  <p className="text-sm font-mono font-semibold text-gray-900">
                    {invoiceModal.id}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {invoiceModal.date}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Billed To</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {invoiceModal.company}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Payment Method</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {invoiceModal.method}
                  </p>
                </div>
              </div>

              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left text-xs font-medium text-gray-400 px-4 py-2">
                        Description
                      </th>
                      <th className="text-right text-xs font-medium text-gray-400 px-4 py-2">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {invoiceModal.plan} Plan — Monthly Subscription
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                        {invoiceModal.amount}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-gray-100 bg-gray-50">
                      <td className="px-4 py-2.5 text-sm font-bold text-gray-900">
                        Total
                      </td>
                      <td className="px-4 py-2.5 text-sm font-bold text-gray-900 text-right">
                        {invoiceModal.amount}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition"
                >
                  <Printer size={14} />
                  Download Invoice
                </button>
                <button
                  type="button"
                  onClick={() => setInvoiceModal(null)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
