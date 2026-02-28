"use client"

import CoachHeader from "@/components/coach/CoachHeader"

type TodayClass = {
  id: number
  time: string
  course: string
  group: string
  taughtSessions: number
}

const todayClasses: TodayClass[] = [
  { id: 1, time: "17:00 - 18:30", course: "Badminton Beginner", group: "Group A", taughtSessions: 12 },
  { id: 2, time: "18:30 - 20:00", course: "Badminton Intermediate", group: "Group B", taughtSessions: 8 },
]

export default function CoachDashboard() {
  const totalSessions = todayClasses.reduce(
    (sum, c) => sum + c.taughtSessions,
    0
  )

  return (
    <div className="p-4 space-y-5">
      <CoachHeader title="Coach Dashboard" />

      {/* ===== Summary ===== */}
      <div className="bg-blue-600 text-white rounded-2xl p-4">
        <p className="text-sm opacity-80">Total sessions taught</p>
        <p className="text-3xl font-bold">{totalSessions}</p>
      </div>

      {/* ===== Today Schedule ===== */}
      <div className="space-y-3">
        <h2 className="font-semibold">📅 Today Classes</h2>

        {todayClasses.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl border p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{c.course}</p>
              <p className="text-sm text-gray-500">
                {c.group} · {c.time}
              </p>
            </div>

            <a
              href="/coach/attendance"
              className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Check-in
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}