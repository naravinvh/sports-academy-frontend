"use client"

import { useState } from "react"

// components
import Header from "@/components/admin/dashboard/Header"
import { StatCard } from "@/components/admin/dashboard/StatCard"
import { PendingPaymentItem } from "@/components/admin/dashboard/PendingPayments"
import VerifySlipModal from "@/components/admin/dashboard/VerifySlipModal"
import { MonthlyRevenueChart } from "@/components/admin/dashboard/MonthlyRevenueChart"

// icons
import { Users, Book, Wallet, TrendingDown } from "lucide-react"

const pendingPayments = [
  {
    id: 1,
    name: "Ninee",
    course: "Badminton",
    amount: 4900,
    slipUrl: "/slip1.jpg",
  },
  {
    id: 2,
    name: "Nannam",
    course: "Football",
    amount: 3500,
    slipUrl: "/slip2.jpg",
  },
]

export default function AdminDashboard() {
  const [selected, setSelected] = useState<any>(null)

  return (
    <div className="p-6 space-y-6">
      <Header />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Students" value={156} icon={Users} changePercent={+8.4} />
        <StatCard title="Courses" value={24} icon={Book} changePercent={+1.4} />
        <StatCard title="Revenue" value={485200} icon={Wallet} changePercent={+12.3} />
        <StatCard title="Expense" value={182500} icon={TrendingDown}
  changePercent={-1.3}
/>
      </div>

      <MonthlyRevenueChart />

      {/* Pending Payments Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">
          Pending Payments
        </h2>

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

      {/* Modal */}
      <VerifySlipModal
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}