"use client"

import CoachHeader from "@/components/coach/CoachHeader"

/* ================= TYPES ================= */

type TodayClass = {
  id: number
  time: string
  course: string
  group: string
  taughtSessions: number
  incomePerSession: number
}
type CoachNotificationType =
  | "today"
  | "upcoming"
  | "assigned"
  | "cancelled"

type CoachNotification = {
  id: number
  type: CoachNotificationType
  message: string
}
type TeachingCourse = {
  id: number
  title: string
  totalSessions: number
  taughtSessions: number
  incomePerSession: number
}

/* ================= MOCK DATA ================= */

const todayClasses: TodayClass[] = [
  {
    id: 1,
    time: "17:00 - 18:30",
    course: "Badminton Beginner",
    group: "Group A",
    taughtSessions: 12,
    incomePerSession: 800,
  },
  {
    id: 2,
    time: "18:30 - 20:00",
    course: "Badminton Intermediate",
    group: "Group B",
    taughtSessions: 8,
    incomePerSession: 900,
  },
]

const teachingCourses: TeachingCourse[] = [
  {
    id: 1,
    title: "Badminton Beginner",
    totalSessions: 20,
    taughtSessions: 12,
    incomePerSession: 800,
  },
  {
    id: 2,
    title: "Badminton Intermediate",
    totalSessions: 15,
    taughtSessions: 8,
    incomePerSession: 900,
  },
]

/* ================= HELPERS ================= */

function progressColor(progress: number) {
  if (progress >= 80) return "bg-green-500"
  if (progress >= 50) return "bg-blue-600"
  return "bg-yellow-500"
}

/* ================= PAGE ================= */

export default function CoachDashboard() {
  const totalIncome = teachingCourses.reduce(
    (sum, c) => sum + c.taughtSessions * c.incomePerSession,
    0
  )

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* ===== GLOBAL HEADER ===== */}
      <CoachHeader title="Coach Dashboard" />

      {/* ===== SUMMARY (เหมือน student card) ===== */}
      <section className="bg-white rounded-xl border p-4">
        <p className="text-sm text-gray-500">
          Total income from teaching
        </p>
        <p className="text-3xl font-bold text-blue-700">
          {totalIncome.toLocaleString()} THB
        </p>
      </section>

      {/* ===== TODAY TEACHING ===== */}
      <section className="bg-white rounded-xl border p-4 space-y-4">
        <h2 className="font-semibold text-blue-900 flex items-center gap-2">
          📅 Today’s Teaching
        </h2>

        {todayClasses.map((c) => (
          <div
            key={c.id}
            className="border rounded-xl p-4 flex justify-between items-center hover:shadow-sm transition"
          >
            <div>
              <p className="font-medium">{c.course}</p>
              <p className="text-xs text-gray-500">
                {c.group} · {c.time}
              </p>
            </div>

            <a
              href="/coach/attendance"
              className="text-xs bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Check-in
            </a>
          </div>
        ))}
      </section>

      {/* ===== MY TEACHING COURSES (เหมือน My Active Courses) ===== */}
      <section className="bg-white rounded-xl border p-4 space-y-4">
        <h2 className="font-semibold text-blue-900 flex items-center gap-2">
          🎓 My Teaching Courses
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {teachingCourses.map((course) => {
            const progress =
              (course.taughtSessions / course.totalSessions) * 100

            return (
              <div
                key={course.id}
                className="border rounded-xl overflow-hidden hover:shadow-md transition"
              >
                {/* Header */}
                <div className="px-4 py-3 bg-blue-50">
                  <p className="font-medium text-blue-900">
                    {course.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {course.taughtSessions} /{" "}
                    {course.totalSessions} sessions
                  </p>
                </div>

                {/* Body */}
                <div className="p-4 space-y-3">
                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      className={`h-2 rounded ${progressColor(
                        progress
                      )}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-gray-600">
                    <span>
                      💰{" "}
                      {(
                        course.taughtSessions *
                        course.incomePerSession
                      ).toLocaleString()}{" "}
                      THB
                    </span>
                    <span>
                      {course.totalSessions -
                        course.taughtSessions}{" "}
                      left
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}