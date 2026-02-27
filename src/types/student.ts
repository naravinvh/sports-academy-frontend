export type Attendance = {
  id: number
  courseId: number
  date: string
  status: "present" | "absent"
}

export type EnrolledCourse = {
  id: number
  title: string
  totalSessions: number
  startDate: string
  endDate: string
  nextClassDate?: string
  attendance: Attendance[]
}