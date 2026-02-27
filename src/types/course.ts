export type CourseStatus = "draft" | "published"
export type CourseLevel = "Beginner" | "Advanced"

export type Course = {
  id: number
  title: string
  description: string
  coach: string
  price: number
  status: CourseStatus
  level?: CourseLevel
  
}