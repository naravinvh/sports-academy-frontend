"use client"

import StudentHeader from "@/components/student/StudentHeader"
import TodayClasses, {
  Attendance,
} from "@/components/student/TodayClasses"

/* ================= TYPES ================= */

export type EnrolledCourse = {
  id: number
  title: string
  totalSessions: number
  attendedSessions: number
  startDate: string
  endDate: string
  nextClassDate?: string
}

/* ================= MOCK DATA ================= */

const courses: EnrolledCourse[] = [
  {
    id: 1,
    title: "Badminton",
    totalSessions: 20,
    attendedSessions: 12,
    startDate: "2026-01-10",
    endDate: "2026-03-10",
    nextClassDate: "2026-02-28",
  },
  {
    id: 2,
    title: "Football",
    totalSessions: 10,
    attendedSessions: 4,
    startDate: "2026-02-01",
    endDate: "2026-03-01",
  },
]

const attendanceHistory: Attendance[] = [
  {
    id: 9,
    date: "2026-02-28",
    time: "18:05",
    course: "Badminton Beginner",
    status: "present",
  },
  {
    id: 10,
    date: "2026-02-28",
    course: "Swimming Technique",
    status: "absent",
  },
]

/* ================= HELPERS ================= */

function daysLeft(endDate: string) {
  const end = new Date(endDate).getTime()
  const now = new Date().getTime()
  return Math.max(
    Math.ceil((end - now) / (1000 * 60 * 60 * 24)),
    0
  )
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function progressColor(progress: number) {
  if (progress >= 80) return "bg-green-500"
  if (progress >= 50) return "bg-blue-600"
  if (progress >= 30) return "bg-yellow-500"
  return "bg-red-500"
}

function statusLabel(progress: number) {
  if (progress === 100)
    return { text: "Completed", color: "bg-green-100 text-green-700" }
  if (progress >= 60)
    return { text: "On Track", color: "bg-blue-100 text-blue-700" }
  return { text: "Behind", color: "bg-yellow-100 text-yellow-700" }
}
/* ================= PAGE ================= */

export default function StudentDashboard() {
  return (
    <div className="p-6 space-y-6">
      <StudentHeader />

      {/* ⭐ TODAY CLASSES */}
      <TodayClasses attendanceHistory={attendanceHistory} />

      <h2 className="text-lg font-semibold">
        My Active Courses
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        {courses.map((course) => {
          const progress =
            (course.attendedSessions / course.totalSessions) * 100

          const remainingSessions =
            course.totalSessions - course.attendedSessions

          const remainingDays = daysLeft(course.endDate)
          const status = statusLabel(progress)

          return (
            <div
              key={course.id}
              className="bg-white p-5 rounded-xl border space-y-4
                         transition hover:shadow-lg hover:-translate-y-0.5"
            >
              {/* ===== Header ===== */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-lg">
                    {course.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(course.startDate)} –{" "}
                    {formatDate(course.endDate)}
                  </div>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded ${status.color}`}
                >
                  {status.text}
                </span>
              </div>

              {/* ===== Progress Info ===== */}
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  {course.attendedSessions} /{" "}
                  {course.totalSessions} sessions
                </span>
                <span>{remainingSessions} left</span>
              </div>

              {/* ===== Progress Bar ===== */}
              <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
                <div
                  className={`h-2 transition-all duration-700 ${progressColor(
                    progress
                  )}`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* ===== Footer ===== */}
              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  ⏳ {remainingDays} days remaining
                </span>

                {course.nextClassDate && (
                  <span>
                    📅 Next class:{" "}
                    {formatDate(course.nextClassDate)}
                  </span>
                )}
              </div>

              {/* ===== Warning ===== */}
              {remainingDays <= 7 && (
                <div className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded">
                  ⚠️ This course is ending soon
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}