"use client"

import { useState } from "react"
import type { Coach } from "@/types/coach"
import { CoachTable } from "@/components/admin/coach/CoachTable"
import { AddCoachModal } from "@/components/admin/coach/AddCoachModal"

export default function CoachesPage() {
  const [openAdd, setOpenAdd] = useState(false)

  const [coaches, setCoaches] = useState<Coach[]>([
    {
      id: 1,
      name: "Coach A",
      email: "coachA@mail.com",
      expertise: ["Badminton"],
      status: "active",
      totalCourses: 3,
    },
  ])

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">
            Coach Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage coaches and teaching history
          </p>
        </div>

        <button
          onClick={() => setOpenAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          + Add Coach
        </button>
      </div>

      <CoachTable
        coaches={coaches}
        onUpdate={(updated) =>
          setCoaches((prev) =>
            prev.map((c) => (c.id === updated.id ? updated : c))
          )
        }
        onSoftDelete={(id) =>
          setCoaches((prev) =>
            prev.map((c) =>
              c.id === id ? { ...c, status: "inactive" } : c
            )
          )
        }
      />

      <AddCoachModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={(coach) =>
          setCoaches((prev) => [
            ...prev,
            {
              id: Date.now(),
              status: "active",
              totalCourses: 0,
              ...coach,
            },
          ])
        }
      />
    </div>
  )
}