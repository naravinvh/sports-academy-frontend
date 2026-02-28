"use client"

import { useState } from "react"
import { CourseStatus, CourseLevel, Course } from "@/types/course"
import { CourseCard } from "@/components/admin/courses/CourseCard"
import { CourseTable } from "@/components/admin/courses/CourseTable"
import { AddCourseModal } from "@/components/admin/courses/AddCourseModal"

/* ================= TYPES ================= */

export type Student = {
  id: number
  name: string
  email: string
}

export type CourseWithStudents = Course & {
  students?: Student[]
}

/* ================= PAGE ================= */

export default function CoursesPage() {
  const [openAdd, setOpenAdd] = useState(false)

  const [courses, setCourses] = useState<CourseWithStudents[]>([
    {
      id: 1,
      title: "Badminton Beginner",
      description: "Basic badminton skills",
      coach: "Coach A",
      price: 4990,
      status: "published",
      level: "Beginner",
      students: [
        {
          id: 1,
          name: "Somchai Jaidee",
          email: "somchai@email.com",
        },
        {
          id: 2,
          name: "Suda Dee",
          email: "suda@email.com",
        },
      ],
    startDate: "2026-01-01",
    endDate: "2026-01-31",
    classDays: [1, 3, 5],
    },
    {
      id: 2,
      title: "Football Advanced",
      description: "Tactical and match play",
      coach: "Coach B",
      price: 6500,
      status: "draft",
      level: "Advanced",
      startDate: "2026-02-01",
    endDate: "2026-02-28",
    classDays: [2, 4, 6],
      // ไม่มี students ก็ไม่พัง
    },
  ],
  
)

  return (
    <div className="p-6 space-y-10">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">
            Course Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage courses, students, and details
          </p>
        </div>

        <button
          onClick={() => setOpenAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          + Add Course
        </button>
      </div>

      {/* ===== Table View (ของเดิม) ===== */}
      <CourseTable
        courses={courses}
        onUpdate={(updated) =>
          setCourses((prev) =>
            prev.map((c) => (c.id === updated.id ? updated : c))
          )
        }
        onDelete={(id) =>
          setCourses((prev) => prev.filter((c) => c.id !== id))
        }
      />

      {/* ===== Card / Classroom View ===== */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-blue-600">
          Available Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      </div>

      {/* ===== Modal ===== */}
      <AddCourseModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={(course) =>
          setCourses((prev) => [
            ...prev,
            {
              id: Date.now(),
              ...course,
              students: [],
            },
          ])
        }
      />
    </div>
  )
}