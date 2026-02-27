"use client"

import { X } from "lucide-react"
import { Student } from "@/types/CourseWithStudents"

export function StudentListModal({
  open,
  onClose,
  students,
  courseTitle,
}: {
  open: boolean
  onClose: () => void
  students: Student[]
  courseTitle: string
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">
            Students in {courseTitle}
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {students.length > 0 ? (
          <ul className="divide-y">
            {students.map((s) => (
              <li key={s.id} className="py-2">
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-gray-500">
                  {s.email}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 text-center py-6">
            No students enrolled
          </p>
        )}
      </div>
    </div>
  )
}