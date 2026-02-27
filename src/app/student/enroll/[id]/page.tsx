"use client"

import { useRouter } from "next/navigation"

export default function EnrollPage() {
  const router = useRouter()

  function handleEnroll() {
    router.push("/student/payment/submit")
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl border space-y-4">
      <h1 className="text-xl font-semibold">
        Confirm Enrollment
      </h1>

      <p className="text-gray-600 text-sm">
        Please proceed to payment to complete enrollment.
      </p>

      <button
        onClick={handleEnroll}
        className="w-full py-2 bg-blue-600 text-white rounded"
      >
        Proceed to Payment
      </button>
    </div>
  )
}