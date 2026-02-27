"use client"

import { useState } from "react"
import { PendingPaymentItem } from "@/components/admin/dashboard/PendingPayments"
import VerifySlipModal from "@/components/admin/dashboard/VerifySlipModal"

type PaymentStatus = "pending" | "approved"

type Payment = {
  id: number
  name: string
  course: string
  amount: number
  slipUrl: string
  status: PaymentStatus
  approvedAt?: string
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      name: "Ninee",
      course: "Badminton",
      amount: 4900,
      slipUrl: "/slip1.jpg",
      status: "pending",
    },
    {
      id: 2,
      name: "Nannam",
      course: "Football",
      amount: 3500,
      slipUrl: "/slip2.jpg",
      status: "pending",
    },
  ])

  const [selected, setSelected] = useState<Payment | null>(null)

  // ✅ Approve handler
  const handleApprove = () => {
    if (!selected) return

    setPayments((prev) =>
      prev.map((p) =>
        p.id === selected.id
          ? {
              ...p,
              status: "approved",
              approvedAt: new Date().toISOString(),
            }
          : p
      )
    )

    setSelected(null)
  }

  const pendingPayments = payments.filter(
    (p) => p.status === "pending"
  )

  const history = payments.filter(
    (p) => p.status === "approved"
  )

  return (
    <div className="p-6 space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-blue-900">
          Payments
        </h1>
        <p className="text-sm text-gray-500">
          Review and manage payment transactions
        </p>
      </div>

      {/* 🔔 Pending Payments */}
{pendingPayments.length > 0 && (
  <div className="bg-white rounded-xl p-5 shadow-sm border bg-red-50">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-red-500">
        Pending Payments
      </h2>

      <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-600">
        {pendingPayments.length} pending
      </span>
    </div>

    <div className="space-y-3">
      {pendingPayments.map((p) => (
        <PendingPaymentItem
          key={p.id}
          name={p.name}
          course={p.course}
          amount={p.amount}
          onReview={() => setSelected(p)}
        />
      ))}
    </div>
  </div>
)}
      {/* 📜 Transaction History */}
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">
          Transaction History
        </h2>

        {history.length === 0 ? (
          <p className="text-sm text-gray-500">
            No transactions yet
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3">Name</th>
                  <th>Course</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {history.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="py-3 font-medium text-blue-900">
                      {p.name}
                    </td>
                    <td className="text-blue-900">{p.course}</td>
                    <td className="font-semibold text-emerald-600">
                      ฿{p.amount.toLocaleString()}
                    </td>
                    <td className="text-gray-500">
                      {new Date(
                        p.approvedAt!
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                        Approved
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <VerifySlipModal
        open={!!selected}
        onClose={() => setSelected(null)}
        onApprove={handleApprove}
        slipUrl={selected?.slipUrl}
      />
    </div>
  )
}