"use client"

import { useMemo, useState } from "react"
import { Calendar, Clock, BookOpen } from "lucide-react"

/* ================= TYPES ================= */

type ClassItem = {
  id: number
  course: string
  time: string
  duration: string
  location: string
}

/* ================= MOCK DATA ================= */

// key = YYYY-MM-DD
const scheduleData: Record<string, ClassItem[]> = {
  "2026-02-16": [
    {
      id: 1,
      course: "Badminton Beginner",
      time: "17:00",
      duration: "2 hrs",
      location: "Court A",
    },
  ],
  "2026-02-18": [
    {
      id: 2,
      course: "Football Advanced",
      time: "16:00",
      duration: "2 hrs",
      location: "สนามใหญ่",
    },
    {
      id: 3,
      course: "Football Beginner",
      time: "18:30",
      duration: "1.5 hrs",
      location: "สนามซ้อม",
    },
  ],
  "2026-02-19": [
    {
      id: 4,
      course: "Swimming Beginner",
      time: "10:00",
      duration: "1 hr",
      location: "Pool 1",
    },
    {
      id: 5,
      course: "Swimming Advanced",
      time: "11:30",
      duration: "1.5 hrs",
      location: "Pool 2",
    },
    {
      id: 6,
      course: "Swimming Advanced",
      time: "17:00",
      duration: "2 hrs",
      location: "Pool 1",
    },
    {
      id: 7,
      course: "Swimming Private",
      time: "19:30",
      duration: "1 hr",
      location: "Pool VIP",
    },
  ],
}

/* ================= HELPERS ================= */

function getDateKey(date: Date) {
  return date.toLocaleDateString("en-CA") // YYYY-MM-DD (no timezone bug)
}

function getDotColor(count: number) {
  if (count >= 4) return "bg-red-500"
  if (count >= 2) return "bg-orange-400"
  if (count === 1) return "bg-blue-500"
  return ""
}

/* ================= COMPONENT ================= */

export default function CoachSchedulePage() {
  const [selectedDate, setSelectedDate] = useState(
    new Date(2026, 1, 18) // Feb 18, 2026
  )
  const [view, setView] = useState<"week" | "month">("month")

  const dateKey = getDateKey(selectedDate)
  const classes = scheduleData[dateKey] || []

  /* ===== calendar days (Month) ===== */
  const daysInMonth = useMemo(() => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const lastDay = new Date(year, month + 1, 0).getDate()
    return Array.from({ length: lastDay }, (_, i) => i + 1)
  }, [selectedDate])

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 text-blue-700" />
          <h1 className="text-2xl font-bold text-blue-900">
            My Schedule
          </h1>
        </div>

        {/* Toggle */}
        <div className="flex border rounded-lg overflow-hidden">
          <button
            onClick={() => setView("week")}
            className={`px-4 py-2 text-sm ${
              view === "week"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setView("month")}
            className={`px-4 py-2 text-sm ${
              view === "month"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="bg-white border rounded-xl p-4 space-y-4">
          <div className="grid grid-cols-7 text-center text-xs text-gray-400">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day) => {
              const date = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                day
              )
              const key = getDateKey(date)
              const count = scheduleData[key]?.length || 0

              const isSelected =
                getDateKey(selectedDate) === key

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(date)}
                  className={`relative h-10 rounded-lg text-sm
                    ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  {day}

                  {count > 0 && (
                    <span
                      className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full ${getDotColor(
                        count
                      )}`}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-blue-500 rounded-full" />
              1 class
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-orange-400 rounded-full" />
              2–3 classes
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-red-500 rounded-full" />
              4+ classes
            </div>
          </div>
        </div>

        {/* Day Detail */}
        <div className="md:col-span-2 bg-white border rounded-xl p-5 space-y-4">
          <h2 className="font-semibold text-blue-900">
            Teaching on {dateKey}
          </h2>

          {classes.length === 0 ? (
            <p className="text-sm text-gray-500">
              No classes scheduled
            </p>
          ) : (
            <div className="space-y-3">
              {classes.map((c) => (
                <div
                  key={c.id}
                  className="border rounded-lg p-4 flex justify-between items-center hover:shadow-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <p className="font-medium text-blue-900">
                        {c.course}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {c.location}
                    </p>
                  </div>

                  <div className="text-right text-sm">
                    <div className="flex items-center gap-1 justify-end">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{c.time}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {c.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}