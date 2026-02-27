export type AttendanceRecord = {
  id: number
  courseId: number
  date: string
  status: "present" | "absent"
}
const attendanceRecords: AttendanceRecord[] = [
  { id: 1, courseId: 1, date: "2026-01-15", status: "present" },
  { id: 2, courseId: 1, date: "2026-01-17", status: "present" },
  { id: 3, courseId: 1, date: "2026-01-20", status: "absent" },
  { id: 4, courseId: 1, date: "2026-01-22", status: "present" },

  { id: 5, courseId: 2, date: "2026-02-05", status: "present" },
  { id: 6, courseId: 2, date: "2026-02-07", status: "present" },
]

export type Course = {
  id: number
  title: string
  coachId: number
  price: number
  maxStudents: number
  currentStudents: number
}

const courses: Course[] = [
  { id: 1, title: "Badminton", coachId: 1, price: 3000, maxStudents: 10, currentStudents: 6 },
  { id: 2, title: "English Speaking", coachId: 2, price: 4500, maxStudents: 15, currentStudents: 12 },
]

export default function AttendancePage() {
  return (
    <div className="space-y-2">
      <h1 className="font-bold text-lg">Attendance History</h1>

      {attendanceRecords.map((a, i) => (
        <div
          key={i}
          className="flex justify-between bg-white p-3 rounded border"
        >
          <span>{a.date}</span>
          <span
            className={
              a.status === "present"
                ? "text-green-600"
                : "text-red-500"
            }
          >
            {a.status}
          </span>
        </div>
      ))}
    </div>
  )
}