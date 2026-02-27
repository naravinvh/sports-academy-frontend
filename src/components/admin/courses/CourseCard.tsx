// components/admin/courses/CourseCard.tsx
import { Course } from "./CourseTable"

const COLORS = ["#1a73e8", "#34a853", "#fbbc04", "#ea4335"]

export function CourseCard({ course }: { course: Course }) {
  const color =
    COLORS[course.id % COLORS.length]

  return (
    <div className="rounded-xl overflow-hidden shadow hover:shadow-md transition bg-white">
      {/* Cover */}
      <div
        className="h-28 p-4 text-white flex justify-between"
        style={{ backgroundColor: color }}
      >
        <div>
          <h2 className="font-semibold text-lg leading-tight">
            {course.title}
          </h2>
          <p className="text-sm opacity-90">
            {course.coach}
          </p>
        </div>

        <button className="text-xl">⋮</button>
      </div>

      {/* Body */}
      <div className="p-4 text-sm text-gray-600">
        {course.description}
      </div>
    </div>
  )
}