"use client"

import CoachHeader from "@/components/coach/CoachHeader"

const schedule = [
  { day: "Mon", time: "17:00 - 18:30", course: "Badminton Beginner" },
  { day: "Wed", time: "18:30 - 20:00", course: "Badminton Intermediate" },
  { day: "Fri", time: "17:00 - 18:30", course: "Badminton Beginner" },
]

export default function CoachSchedulePage() {
  return (
    <div className="p-4 space-y-4">
      <CoachHeader title="My Schedule" />

      {schedule.map((s, i) => (
        <div
          key={i}
          className="bg-white border rounded-xl p-4 flex justify-between"
        >
          <div>
            <p className="font-semibold">{s.day}</p>
            <p className="text-sm text-gray-500">{s.time}</p>
          </div>
          <p className="text-sm">{s.course}</p>
        </div>
      ))}
    </div>
  )
}