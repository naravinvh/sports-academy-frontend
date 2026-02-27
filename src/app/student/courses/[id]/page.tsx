"use client"

import Link from "next/link"

type Course = {
  id: number
  title: string
  description: string
  price: number
  totalSessions: number
}

const course: Course = {
  id: 1,
  title: "Badminton Beginner",
  description:
    "Learn basic badminton skills, footwork, and game rules",
  price: 4990,
  totalSessions: 16,
}

export default function CourseDetailPage() {
  return (
    <div className="p-6 max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-blue-900">
        {course.title}
      </h1>

      <p className="text-gray-600">{course.description}</p>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Sessions</span>
          <div className="font-medium">
            {course.totalSessions}
          </div>
        </div>
        <div>
          <span className="text-gray-500">Price</span>
          <div className="font-medium">
            {course.price.toLocaleString()} THB
          </div>
        </div>
      </div>

      <Link
        href={`/student/enroll/${course.id}`}
        className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md"
      >
        Enroll & Pay
      </Link>
    </div>
  )
}