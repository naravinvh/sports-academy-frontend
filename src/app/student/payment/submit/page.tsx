"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SubmitPaymentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    // mock submit
    await new Promise((r) => setTimeout(r, 1200))

    // ✅ redirect หลัง submit
    router.push("/student/payment?success=true")
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl border">
      <h1 className="text-xl font-semibold mb-4">
        Submit Payment
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Transaction Reference"
          className="w-full border rounded px-3 py-2"
          required
        />

        <input
          type="file"
          className="w-full border rounded px-3 py-2"
          required
        />

        <button
          disabled={loading}
          className="
            w-full py-2 rounded
            bg-green-600 text-white
            disabled:opacity-50
          "
        >
          {loading ? "Submitting..." : "Submit Payment"}
        </button>
      </form>
    </div>
  )
}