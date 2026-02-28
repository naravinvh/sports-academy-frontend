"use client"

import { useMemo, useState } from "react"
import CourseGrid from "@/app/student/courses/CourseGrid"
import { Course } from "@/app/student/courses/CourseCard"
import { BookOpen } from "lucide-react"

/* ================== MOCK DATA ================== */

const courses: Course[] = [
  {
    id: 1,
    title: "Badminton Beginner",
    description: "Learn basic skills and footwork",
    price: 4990,
    totalSessions: 16,
    sport: "badminton",
    level: "beginner",

    // ===== from admin =====
    startDate: "2026-03-01",
    endDate: "2026-04-26",
    classDays: [1, 3, 5], // Mon Wed Fri
  },
  {
    id: 2,
    title: "Advanced Football Training",
    description: "Tactical play and match strategies",
    price: 6500,
    totalSessions: 20,
    sport: "football",
    level: "advanced",

    // ===== from admin =====
    startDate: "2026-03-10",
    endDate: "2026-05-10",
    classDays: [2, 4], // Tue Thu
  },
  {
    id: 3,
    title: "Swimming Technique",
    description: "Improve stroke and breathing",
    price: 6000,
    totalSessions: 12,
    sport: "swimming",
    level: "beginner",
    startDate: "2026-03-15",
    endDate: "2026-04-26",
    classDays: [0, 2, 4], // Sun Tue Thu
  },
]
const myCourses: Course[] = [
  {
    id: 1,
    title: "Badminton Beginner",
    description: "Learn basic skills and footwork",
    price: 4990,
    totalSessions: 16,
    sport: "badminton",
    level: "beginner",
    startDate: "2026-03-01",
    endDate: "2026-04-26",
    classDays: [1, 3, 5],
  },
]

/* ================== PAGE ================== */

export default function StudentCoursesPage() {
  const [search, setSearch] = useState("")
  const [sport, setSport] = useState<"all" | Course["sport"]>("all")
  const [level, setLevel] = useState<"all" | Course["level"]>("all")

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())

      const matchSport = sport === "all" || c.sport === sport
      const matchLevel = level === "all" || c.level === level

      return matchSearch && matchSport && matchLevel
    })
  }, [search, sport, level])

  return (
    <div className="p-6 space-y-6">
      {/* ===== Header ===== */}
      <div className="flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-blue-700" />
        <h1 className="text-2xl font-bold text-blue-900">
          Available Courses
        </h1>
      </div>

      

      {/* ===== Filters ===== */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="w-full md:w-1/2 border rounded-lg px-4 py-2 text-sm"
        />

        {/* Sport */}
        <select
          value={sport}
          onChange={(e) =>
            setSport(e.target.value as any)
          }
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All sports</option>
          <option value="badminton">Badminton</option>
          <option value="football">Football</option>
          <option value="basketball">Basketball</option>
          <option value="swimming">Swimming</option>
          <option value="tennis">Tennis</option>
        </select>

        {/* Level */}
        <select
          value={level}
          onChange={(e) =>
            setLevel(e.target.value as any)
          }
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All levels</option>
          <option value="beginner">Beginner</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* ===== Result ===== */}
      {filteredCourses.length > 0 ? (
        <CourseGrid courses={filteredCourses} />
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg font-medium">
            No courses found
          </p>
          <p className="text-sm">
            Try changing your search or filters
          </p>
        </div>
      )}
    </div>
  )
}