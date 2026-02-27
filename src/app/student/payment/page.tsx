"use client"

import { useSearchParams } from "next/navigation"

type Payment = {
  id: number
  course: string
  amount: number
  status: "pending" | "approved"
}

const payments: Payment[] = [
  {
    id: 1,
    course: "Badminton Beginner",
    amount: 4500,
    status: "pending",
  },
]

export default function StudentPaymentPage() {
  const searchParams = useSearchParams()
  const success = searchParams.get("success")

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        My Payments
      </h1>

      {success && (
        <div className="p-3 rounded bg-green-100 text-green-700 text-sm">
          Payment submitted successfully
        </div>
      )}

      {payments.map((p) => (
        <div
          key={p.id}
          className="border bg-white p-4 rounded-lg flex justify-between"
        >
          <div>
            <div className="font-medium">{p.course}</div>
            <div className="text-sm text-gray-500">
              {p.amount} THB
            </div>
          </div>

          <span
            className={`text-sm px-2 py-1 rounded ${
              p.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {p.status}
          </span>
        </div>
      ))}
    </div>
  )
}