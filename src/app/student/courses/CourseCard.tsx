"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  CircleDot,
  Dumbbell,
  Volleyball,
  Waves,
} from "lucide-react"

/* ================== TYPES ================== */

export type SportType =
  | "badminton"
  | "football"
  | "basketball"
  | "swimming"
  | "tennis"

export type CourseLevel = "beginner" | "advanced"

export type Course = {
  id: number
  title: string
  description: string
  price: number
  totalSessions: number
  sport: SportType
  level: CourseLevel
}

/* ================== ICON MAP ================== */

const sportIconMap = {
  badminton: CircleDot,
  football: Dumbbell,
  basketball: Volleyball,
  swimming: Waves,
  tennis: CircleDot,
}

/* ================== BADGE ================== */

function LevelBadge({ level }: { level: CourseLevel }) {
  return (
    <span
      className={`text-xs px-2 py-1 rounded-full font-medium
        ${
          level === "beginner"
            ? "bg-green-100 text-green-700"
            : "bg-purple-100 text-purple-700"
        }
      `}
    >
      {level === "beginner" ? "Beginner" : "Advanced"}
    </span>
  )
}

/* ================== CARD ================== */

export default function CourseCard({
  course,
}: {
  course: Course
}) {
  const Icon = sportIconMap[course.sport]

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white border rounded-xl p-5 space-y-4 shadow-sm hover:shadow-lg"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">
            {course.title}
          </h3>
        </div>

        <LevelBadge level={course.level} />
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600">
        {course.description}
      </p>

      {/* Info */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>{course.totalSessions} sessions</span>
        <span className="font-semibold text-blue-700">
          {course.price.toLocaleString()} THB
        </span>
      </div>

      {/* Action */}
      <Link
        href={`/student/courses/${course.id}`}
        className="text-sm text-blue-600 hover:underline"
      >
        View details →
      </Link>
    </motion.div>
  )
}