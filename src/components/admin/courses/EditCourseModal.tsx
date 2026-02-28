"use client"

import { useEffect, useState } from "react"
import { Course, CourseStatus } from "./CourseTable"

type Props = {
  open: boolean
  course: Course | null
  onClose: () => void
  onSave: (course: Course) => void
}

export function EditCourseModal({
  open,
  course,
  onClose,
  onSave,
}: Props) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [coach, setCoach] = useState("")
  const [price, setPrice] = useState(0)
  const [status, setStatus] = useState<CourseStatus>("draft")

  useEffect(() => {
    if (course) {
      setTitle(course.title)
      setDescription(course.description)
      setCoach(course.coach)
      setPrice(course.price)
      setStatus(course.status)
    }
  }, [course])

  if (!open || !course) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b ">
          <h2 className="text-lg font-semibold text-blue-900">
            Edit Course
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-4">
          <input
            className="w-full border rounded-md px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Course title"
          />

          <textarea
            className="w-full border rounded-md px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <input
            className="w-full border rounded-md px-3 py-2"
            value={coach}
            onChange={(e) => setCoach(e.target.value)}
            placeholder="Coach"
          />

          <input
            type="number"
            className="w-full border rounded-md px-3 py-2"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Price"
          />

          <select
            className="w-full border rounded-md px-3 py-2"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as CourseStatus)
            }
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSave({
                ...course,
                title,
                description,
                coach,
                price,
                status,
              })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}