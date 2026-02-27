"use client"

import { useState } from "react"
import { PendingPaymentItem } from "@/components/admin/payment/PendingPayments"
import VerifySlipModal from "@/components/admin/payment/VerifySlipModal"
import AddPaymentModal from "@/components/admin/payment/AddPaymentModal"
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

type MonthlyFinance = {
  month: string // YYYY-MM
  revenue: number
  expense: number
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

  /* -------- Monthly Finance -------- */

  const [monthlyFinance, setMonthlyFinance] = useState<MonthlyFinance[]>([
    { month: "2025-01", revenue: 0, expense: 120000 },
    { month: "2025-02", revenue: 0, expense: 135000 },
  ])

  /* -------- Helpers -------- */

  const getCurrentMonth = () =>
    new Date().toISOString().slice(0, 7)

  const updateMonthlyFinance = (
    type: "revenue" | "expense",
    amount: number
  ) => {
    const monthKey = getCurrentMonth()

    setMonthlyFinance((prev) => {
      const found = prev.find((m) => m.month === monthKey)

      if (found) {
        return prev.map((m) =>
          m.month === monthKey
            ? {
                ...m,
                [type]: m[type] + amount,
              }
            : m
        )
      }

      return [
        ...prev,
        {
          month: monthKey,
          revenue: type === "revenue" ? amount : 0,
          expense: type === "expense" ? amount : 0,
        },
      ]
    })
  }

  /* -------- Approve Payment -------- */

  const handleApprove = () => {
    if (!selected) return

    const approvedDate = new Date()
    const monthKey = approvedDate.toISOString().slice(0, 7)

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

    updateMonthlyFinance("revenue", selected.amount)
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

  const handleAddRevenue = () => {
    const value = prompt("Enter revenue amount")
    const amount = Number(value)
    if (!amount || amount <= 0) return
    updateMonthlyFinance("revenue", amount)
  }

  const handleAddExpense = () => {
    const value = prompt("Enter expense amount")
    const amount = Number(value)
    if (!amount || amount <= 0) return
    updateMonthlyFinance("expense", amount)
  }

  /* -------- Filters -------- */

  const pendingPayments = payments.filter(
    (p) => p.status === "pending"
  )

  const history = payments.filter(
    (p) => p.status === "approved"
  )

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">
            Payments
          </h1>
          <p className="text-sm text-gray-500">
            Review and manage payment transactions
          </p>
        </div>

        <button
          onClick={() => setOpenAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Add Payment
        </button>
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-blue-900">
            Transaction History
          </h2>
        </div>

          
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
                    <td>{p.course}</td>
                    <td className="font-semibold text-emerald-600">
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
          </div>
        )}
      </div>

      {/* 📊 Monthly Revenue & Expense */}
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        {/* Header + Actions */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-blue-900">
            Monthly Revenue & Expense
          </h2>

          <div className="flex gap-2">
            <button
              onClick={handleAddRevenue}
              className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
            >
              + Revenue
            </button>
            <button
              onClick={handleAddExpense}
              className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
            >
              + Expense
            </button>
          </div>
        </div>

        {/* Table */}
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
            {monthlyFinance.map((m) => {
              const profit = m.revenue - m.expense
              return (
                <tr key={m.month} className="border-b last:border-0">
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

      {/* ➕ Add Payment Modal */}
      <AddPaymentModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={handleAddPayment}
      />
    </div>
  )
}