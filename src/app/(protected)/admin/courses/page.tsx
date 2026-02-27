"use client"

import { useState } from "react"
import { CourseTable, Course } from "@/components/admin/courses/CourseTable"
import { AddCourseModal } from "@/components/admin/courses/AddCourseModal"
import { CourseCard } from "@/components/admin/courses/CourseCard"

export default function CoursesPage() {
  const [openAdd, setOpenAdd] = useState(false)

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Badminton",
      description: "Badminton for adults",
      coach: "Coach A",
      price: 4990,
      status: "published",
    },
  ])

  return (
    <div className="p-6 space-y-8">
      {/* ===== Header เดิม ===== */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">
            Course Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage courses and details
          </p>
        </div>

        <button
          onClick={() => setOpenAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          + Add Course
        </button>
      </div>

      {/* ===== Table เดิม (ยังอยู่) ===== */}
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

            {/* ===== Classroom Card View (เพิ่มเข้ามา) ===== */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-yellow-500">
          Classroom view
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
            { id: Date.now(), ...course },
          ])
        }
      />
    </div>
  )
}