"use client"

import Header from "@/components/admin/dashboard/Header"
import { StatCard } from "@/components/admin/dashboard/StatCard"
import { MonthlyRevenueChart } from "@/components/admin/dashboard/MonthlyRevenueChart"

// icons
import { Users, BookOpen, Wallet, TrendingDown } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <Header />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Students"
          value={156}
          icon={Users}
          changePercent={8.4}
          href="/admin/users"
        />

        <StatCard
          title="Courses"
          value={24}
          icon={BookOpen}
          changePercent={1.4}
          href="/admin/courses"
        />

        <StatCard
          title="Revenue"
          value={485200}
          icon={Wallet}
          changePercent={12.3}
          href="/admin/payments"
        />

        <StatCard
          title="Expense"
          value={182500}
          icon={TrendingDown}
          changePercent={-1.3}
          href="/admin/payments"
        />
      </div>

      {/* Chart */}
      <MonthlyRevenueChart />
    </div>
  )
}