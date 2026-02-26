"use client"

import { useState } from "react"
import { CourseTable, Course } from "@/components/admin/courses/CourseTable"
import { AddCourseModal } from "@/components/admin/courses/AddCourseModal"

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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900 text">
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