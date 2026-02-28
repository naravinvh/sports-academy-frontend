"use client"

import { useState } from "react"

type Student = {
  id: number
  name: string
  credits: number
}

const students: Student[] = [
  { id: 1, name: "Somchai", credits: 5 },
  { id: 2, name: "Suda", credits: 1 },
  { id: 3, name: "Anan", credits: 0 },
]

export default function CoachAttendancePage() {
  const [checkedIn, setCheckedIn] = useState<number[]>([])

  const handleCheckIn = async (student: Student) => {
    if (student.credits <= 0) return

    // ✅ CALL API
    await fetch("/api/attendance/checkin", {
      method: "POST",
      body: JSON.stringify({
        studentId: student.id,
      }),
    })

    setCheckedIn((prev) => [...prev, student.id])
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-lg font-semibold text-blue-900">
        Attendance Check-in
      </h1>

      {students.map((s) => {
        const isChecked = checkedIn.includes(s.id)
        const disabled = s.credits <= 0 || isChecked

        return (
          <div
            key={s.id}
            className="bg-white border rounded-xl p-4
                       flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-gray-500">
                Credits left: {s.credits}
              </p>
            </div>

            <button
              disabled={disabled}
              onClick={() => handleCheckIn(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium
                ${
                  isChecked
                    ? "bg-green-100 text-green-700"
                    : disabled
                    ? "bg-gray-200 text-gray-400"
                    : "bg-blue-600 text-white"
                }`}
            >
              {isChecked ? "Checked" : "Check-in"}
            </button>
          </div>
        )
      })}
    </div>
  )
}