"use client"

import { useState } from "react"
import {
  ClipboardCheck,
  Users,
  BookOpen,
  CheckCircle2,
} from "lucide-react"

/* ================= TYPES ================= */

type Student = {
  id: number
  name: string
  credits: number
}

type Course = {
  id: number
  title: string
  time: string
  students: Student[]
}

/* ================= MOCK DATA ================= */

const courses: Course[] = [
  {
    id: 1,
    title: "Swimming Beginner",
    time: "10:00 – 11:00",
    students: [
      { id: 1, name: "Somchai", credits: 5 },
      { id: 2, name: "Suda", credits: 1 },
      { id: 3, name: "Anan", credits: 0 },
      { id: 4, name: "Nok", credits: 3 },
    ],
  },
  {
    id: 2,
    title: "Badminton Intermediate",
    time: "16:00 – 17:30",
    students: [
      { id: 5, name: "Krit", credits: 2 },
      { id: 6, name: "May", credits: 4 },
      { id: 7, name: "Ploy", credits: 0 },
    ],
  },
  {
    id: 3,
    title: "Swimming Advanced",
    time: "17:30 – 19:00",
    students: [
      { id: 8, name: "Bank", credits: 6 },
      { id: 9, name: "Ice", credits: 2 },
      { id: 10, name: "James", credits: 1 },
    ],
  },
]

/* ================= PAGE ================= */

export default function CoachAttendancePage() {
  const [selectedCourseId, setSelectedCourseId] =
    useState<number>(courses[0].id)

  const [checkedIn, setCheckedIn] = useState<
    Record<number, number[]>
  >({})

  const course = courses.find(
    (c) => c.id === selectedCourseId
  )!

  const checkedStudents =
    checkedIn[selectedCourseId] || []

  const handleCheckIn = async (student: Student) => {
    if (student.credits <= 0) return

    // 🔗 READY FOR REAL API
    // await fetch("/api/attendance/checkin", {...})

    setCheckedIn((prev) => ({
      ...prev,
      [selectedCourseId]: [
        ...(prev[selectedCourseId] || []),
        student.id,
      ],
    }))
  }

  const progress =
    (checkedStudents.length / course.students.length) *
    100

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* ===== HEADER ===== */}
      <div className="flex items-center gap-3">
        <ClipboardCheck className="h-6 w-6 text-blue-700" />
        <h1 className="text-2xl font-bold text-blue-900">
          Attendance Check-in
        </h1>
      </div>

      {/* ===== COURSE SELECTOR ===== */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {courses.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCourseId(c.id)}
            className={`px-4 py-3 rounded-xl border text-left min-w-[220px]
              ${
                selectedCourseId === c.id
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            <p className="font-semibold">{c.title}</p>
            <p className="text-xs opacity-80">{c.time}</p>
          </button>
        ))}
      </div>

      {/* ===== COURSE SUMMARY ===== */}
      <div className="bg-white border rounded-xl p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <p className="font-semibold text-blue-900">
              {course.title}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            {checkedStudents.length} /{" "}
            {course.students.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ===== STUDENT LIST ===== */}
      <div className="space-y-3">
        {course.students.map((s) => {
          const isChecked = checkedStudents.includes(s.id)
          const disabled = s.credits <= 0 || isChecked

          return (
            <div
              key={s.id}
              className="bg-white border rounded-xl p-4
                         flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{s.name}</p>
                <p
                  className={`text-xs ${
                    s.credits <= 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  Credits left: {s.credits}
                </p>
              </div>

              <button
                disabled={disabled}
                onClick={() => handleCheckIn(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium
                  flex items-center gap-2
                  ${
                    isChecked
                      ? "bg-green-100 text-green-700"
                      : s.credits <= 0
                      ? "bg-red-100 text-red-500"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                {isChecked && (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                {isChecked
                  ? "Checked"
                  : s.credits <= 0
                  ? "No Credit"
                  : "Check-in"}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}