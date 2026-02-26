"use client"

import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const data = [
  { month: "January", revenue: 120000, expense: 80000 },
  { month: "February", revenue: 150000, expense: 90000 },
  { month: "March", revenue: 180000, expense: 110000 },
  { month: "April", revenue: 200000, expense: 120000 },
  { month: "May", revenue: 170000, expense: 100000 },
  { month: "June", revenue: 220000, expense: 140000 },
  { month: "July", revenue: 210000, expense: 130000 },
  { month: "August", revenue: 230000, expense: 150000 },
  { month: "September", revenue: 245000, expense: 160000 },
  { month: "October", revenue: 265000, expense: 170000 },
  { month: "November", revenue: 285000, expense: 185000 },
  { month: "December", revenue: 300000, expense: 200000 },
].map((d) => ({
  ...d,
  profit: d.revenue - d.expense, // 🔑 Profit
}))

export function MonthlyRevenueChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-blue-900">
          Monthly Revenue, Expense & Profit
        </h3>
        <p className="text-sm text-slate-500">
          Overview of financial performance
        </p>
      </div>

      <div className="w-full h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="month"
              tick={{ fill: "#475569", fontSize: 12 }}
            />

            <YAxis
              tick={{ fill: "#475569", fontSize: 12 }}
              tickFormatter={(v) => `฿${v / 1000}k`}
            />

            <Tooltip
              formatter={(value: number) =>
                `฿${value.toLocaleString()}`
              }
            />

            <Legend />

            {/* Revenue */}
            <Bar
              dataKey="revenue"
              name="Revenue"
              fill="#2563eb" // Blue
              radius={[8, 8, 0, 0]}
            />

            {/* Expense */}
            <Bar
              dataKey="expense"
              name="Expense"
              fill="#f43f5e" // Red (soft)
              radius={[8, 8, 0, 0]}
            />

            {/* 🔥 Profit Line */}
            <Line
              type="monotone"
              dataKey="profit"
              name="Profit"
              stroke="#16a34a" // Green
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}