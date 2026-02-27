"use client"

import { useState } from "react"
import { PendingPaymentItem } from "@/components/admin/payment/PendingPayments"
import VerifySlipModal from "@/components/admin/payment/VerifySlipModal"
import AddFinanceModal from "@/components/admin/payment/AddFinanceModal"

/* ---------------- TYPES ---------------- */

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

type FinanceItem = {
  id: number
  date: string
  name: string
  description: string
  amount: number
  type: "revenue" | "expense"
}

/* ---------------- PAGE ---------------- */

export default function PaymentsPage() {
  /* -------- Payments -------- */

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      name: "Ninee",
      course: "Badminton",
      amount: 4900,
      slipUrl: "/slip.jpg",
      status: "pending",
    },
    {
      id: 2,
      name: "Nannam",
      course: "Football",
      amount: 3500,
      slipUrl: "/slip.jpg",
      status: "pending",
    },
  ])

  const [selected, setSelected] = useState<Payment | null>(null)
  const [openAdd, setOpenAdd] = useState(false)
  const [openFinance, setOpenFinance] =
    useState<null | "revenue" | "expense">(null)

  /* -------- Finance Items (NEW) -------- */

  const [financeItems, setFinanceItems] = useState<FinanceItem[]>([
    {
      id: 1,
      date: "2026-02-01",
      name: "Course Payment",
      description: "Badminton course",
      amount: 4900,
      type: "revenue",
    },
    {
      id: 2,
      date: "2026-02-05",
      name: "Coach Salary",
      description: "February salary",
      amount: 120000,
      type: "expense",
    },
  ])

  /* -------- Approve Payment -------- */

  const handleApprove = () => {
    if (!selected) return

    const approvedDate = new Date()

    setPayments((prev) =>
      prev.map((p) =>
        p.id === selected.id
          ? {
              ...p,
              status: "approved",
              approvedAt: approvedDate.toISOString(),
            }
          : p
      )
    )

    // auto add revenue record
    setFinanceItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        date: approvedDate.toISOString().slice(0, 10),
        name: "Course Payment",
        description: selected.course,
        amount: selected.amount,
        type: "revenue",
      },
    ])

    setSelected(null)
  }

  /* -------- Add Payment -------- */

  const handleAddPayment = (data: {
    name: string
    course: string
    amount: number
  }) => {
    setPayments((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...data,
        slipUrl: "",
        status: "pending",
      },
    ])
  }

  /* -------- Manual Revenue / Expense -------- */

  const handleFinanceSubmit = (data: {
    date: string
    name: string
    description: string
    amount: number
  }) => {
    if (!openFinance) return

    setFinanceItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...data,
        type: openFinance,
      },
    ])

    setOpenFinance(null)
  }

  /* -------- Filters -------- */

  const pendingPayments = payments.filter(
    (p) => p.status === "pending"
  )

  const history = payments.filter(
    (p) => p.status === "approved"
  )

  /* -------- Monthly Summary -------- */

  const monthlySummary = Object.values(
    financeItems.reduce((acc, item) => {
      const month = item.date.slice(0, 7)

      if (!acc[month]) {
        acc[month] = {
          month,
          revenue: 0,
          expense: 0,
        }
      }

      acc[month][item.type] += item.amount
      return acc
    }, {} as Record<string, { month: string; revenue: number; expense: number }>)
  )

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">
            Payments and Finance
          </h1>
          <p className="text-sm text-gray-500">
            Review payment transactions and finance records
          </p>
        </div>
      </div>

      {/* 🔔 Pending Payments */}
      {pendingPayments.length > 0 && (
        <div className="rounded-xl p-5 shadow-sm border bg-red-50">
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
                <tr key={p.id} className="border-b">
                  <td className="py-3 font-medium text-blue-900">
                    {p.name}
                  </td>
                  <td>{p.course}</td>
                  <td className="text-emerald-600 font-semibold">
                    ฿{p.amount.toLocaleString()}
                  </td>
                  <td className="text-gray-500">
                    {new Date(p.approvedAt!).toLocaleDateString()}
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
        )}
      </div>

      {/* 📊 Revenue & Expense (DETAIL) */}
      <div className="bg-white rounded-xl p-5 shadow-sm border space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-blue-900">
            Revenue & Expense Records
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => setOpenFinance("revenue")}
              className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-sm"
            >
              + Revenue
            </button>
            <button
              onClick={() => setOpenFinance("expense")}
              className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm"
            >
              + Expense
            </button>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3">Date</th>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {financeItems.map((f) => (
              <tr key={f.id} className="border-b">
                <td className="py-3 text-blue-900">{f.date}</td>
                <td className="font-medium text-blue-900">
                  {f.name}
                </td>
                <td className="text-gray-500">
                  {f.description}
                </td>
                <td>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      f.type === "revenue"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {f.type}
                  </span>
                </td>
                <td
                  className={`text-right font-semibold ${
                    f.type === "revenue"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {f.type === "revenue" ? "+" : "-"}฿
                  {f.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📈 Monthly Summary */}
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <h3 className="text-md font-semibold text-blue-900 mb-4">
          Monthly Summary
        </h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3">Month</th>
              <th>Revenue</th>
              <th>Expense</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {monthlySummary.map((m) => {
              const profit = m.revenue - m.expense
              return (
                <tr key={m.month} className="border-b">
                  <td className="py-3 font-medium text-blue-900">
                    {m.month}
                  </td>
                  <td className="text-emerald-600 font-semibold">
                    ฿{m.revenue.toLocaleString()}
                  </td>
                  <td className="text-red-600 font-semibold">
                    ฿{m.expense.toLocaleString()}
                  </td>
                  <td
                    className={`font-semibold ${
                      profit >= 0
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {profit >= 0 ? "+" : "-"}฿
                    {Math.abs(profit).toLocaleString()}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 🔍 Verify Slip Modal */}
      <VerifySlipModal
        open={!!selected}
        onClose={() => setSelected(null)}
        onApprove={handleApprove}
        slipUrl={selected?.slipUrl}
      />

      {/* ➕ Add Revenue / Expense Modal */}
      <AddFinanceModal
        open={openFinance !== null}
        type={openFinance!}
        onClose={() => setOpenFinance(null)}
        onSubmit={handleFinanceSubmit}
      />
    </div>
  )
}