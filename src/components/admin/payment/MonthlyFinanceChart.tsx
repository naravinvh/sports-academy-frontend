"use client"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

type Props = {
  data: {
    month: string
    revenue: number
    expense: number
  }[]
}

export default function MonthlyFinanceChart({ data }: Props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <h2 className="text-lg font-semibold text-blue-900 mb-4">
        Revenue vs Expense (Monthly)
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}