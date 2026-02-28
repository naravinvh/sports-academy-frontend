"use client"

import { useState } from "react"
import CoachHeader from "@/components/coach/CoachHeader"

type Course = {
  id: number
  name: string
}

type Student = {
  id: number
  name: string
  credit: number
}

const courses: Course[] = [
  { id: 1, name: "Badminton Beginner - Group A" },
  { id: 2, name: "Badminton Intermediate - Group B" },
]

const mockStudents: Student[] = [
  { id: 1, name: "Ninee", credit: 5 },
  { id: 2, name: "Mark", credit: 2 },
  { id: 3, name: "Jane", credit: 0 },
]

export default function CoachAttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [students, setStudents] = useState<Student[]>(mockStudents)

  const handleCheckIn = (id: number) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id && s.credit > 0
          ? { ...s, credit: s.credit - 1 }
          : s
      )
    )

    // 🔗 TODO: call API
    // fetch("/api/attendance/checkin", { method: "POST", body: ... })
  }

  return (
    <div className="p-4 space-y-5">
      <CoachHeader title="Attendance Check-in" />

      {/* ===== Step 1 ===== */}
      <div>
        <p className="font-medium mb-2">1️⃣ Select Course</p>
        <select
          className="w-full border rounded-xl p-3"
          onChange={(e) =>
            setSelectedCourse(
              courses.find((c) => c.id === Number(e.target.value)) || null
            )
          }
        >
          <option value="">-- Select --</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* ===== Step 2 ===== */}
      {selectedCourse && (
        <div className="space-y-3">
          <p className="font-medium">
            2️⃣ Students ({selectedCourse.name})
          </p>

          {students.map((s) => (
            <div
              key={s.id}
              className="bg-white border rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-gray-500">
                  Credit left: {s.credit}
                </p>
              </div>

              <button
                disabled={s.credit === 0}
                onClick={() => handleCheckIn(s.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium
                  ${
                    s.credit === 0
                      ? "bg-gray-200 text-gray-400"
                      : "bg-green-500 text-white"
                  }`}
              >
                Check-in
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}