"use client"
import { Calendar } from "lucide-react"

export default function CoachSchedulePage() {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      <div className="flex items-center gap-3">
        <Calendar className="h-6 w-6 text-blue-700" />
        <h1 className="text-2xl font-bold text-blue-900">
          My Schedule
        </h1>
      </div>

      <div className="bg-white border rounded-xl p-4">
        <p className="text-sm text-gray-500">
          Week view (coming next)
        </p>
      </div>
    </div>
  )
}