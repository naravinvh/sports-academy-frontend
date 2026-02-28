"use client"

import { useState } from "react"
import { CourseStatus } from "./CourseTable"

type Props = {
  open: boolean
  onClose: () => void
  onAdd: (course: {
    title: string
    description: string
    coach: string
    price: number
    status: CourseStatus
  }) => void
}

export function AddCourseModal({ open, onClose, onAdd }: Props) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [coach, setCoach] = useState("")
  const [price, setPrice] = useState<string>("")
  const [status, setStatus] = useState<CourseStatus>("draft")

  const handleSave = () => {
  onAdd({
    title,
    description,
    coach,
    price: Number(price || 0), // ✅ logic อยู่ตรงนี้
    status,
  })

  onClose()
}
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl">
        <div className="px-6 py-4 border-b font-semibold text-blue-900">
          Add Course
        </div>

        <div className="px-6 py-4 space-y-4">
          <input
            placeholder="Course title"
            className="w-full border px-3 py-2 rounded text-blue-900"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="w-full border px-3 py-2 rounded text-gray-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="Coach"
            className="w-full border px-3 py-2 rounded text-gray-400"
            value={coach}
            onChange={(e) => setCoach(e.target.value)}
          />
          
          <input
            type="number"
            placeholder="Price"
            className="w-full border px-3 py-2 rounded text-blue-900"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={0}
          />

          <select
            className="w-full border px-3 py-2 rounded text-gray-400"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as CourseStatus)
            }
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="px-6 py-4 border-t flex justify-end gap-2">
          <button onClick={onClose} className="text-blue-900 bg-gray-100 px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer text-gray-400">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}