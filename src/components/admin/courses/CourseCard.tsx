"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Eye } from "lucide-react"
import { StudentListModal } from "./StudentListModal"
import { CourseWithStudents } from "@/types/CourseWithStudents"

export function CourseCard({
  course,
}: {
  course: CourseWithStudents
}) {
  const [openStudents, setOpenStudents] = useState(false)

  const studentCount = course.students?.length ?? 0

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white border rounded-xl p-5 space-y-4 shadow-sm"
      >
        <h3 className="font-semibold text-blue-900">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {course.description}
        </p>

        <div className="text-sm text-gray-500">
          Coach: {course.coach}
        </div>

        <div className="font-semibold text-blue-700">
          {course.price.toLocaleString()} THB
        </div>

        {/* 👇 Students */}
        <button
          disabled={studentCount === 0}
          onClick={() => setOpenStudents(true)}
          className={`flex items-center gap-2 text-sm
            ${
              studentCount === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:underline"
            }
          `}
        >
          <Users className="w-4 h-4" />
          {studentCount} students enrolled
        </button>
      </motion.div>

      {/* Modal */}
      {course.students && (
        <StudentListModal
          open={openStudents}
          onClose={() => setOpenStudents(false)}
          students={course.students}
          courseTitle={course.title}
        />
      )}
    </>
  )
}