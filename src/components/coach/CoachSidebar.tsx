"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  ClipboardCheck,
  Calendar,
  BarChart3,
  LogOut,
} from "lucide-react"

const menu = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/coach/dashboard",
  },
  {
    label: "Check Attendance",
    icon: ClipboardCheck,
    href: "/coach/attendance",
  },
  {
    label: "Schedule",
    icon: Calendar,
    href: "/coach/schedule",
  },
  {
    label: "Summary",
    icon: BarChart3,
    href: "/coach/summary", // สรุปจำนวนครั้งสอน / ค่าจ้าง
  },
]

export default function CoachSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      {/* ===== HEADER ===== */}
      <div className="p-6 text-xl font-bold text-emerald-700 tracking-wide">
        COACH
      </div>

      {/* ===== MENU ===== */}
      <nav className="flex-1 px-3 space-y-1">
        {menu.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md
                text-sm font-medium transition
                ${
                  active
                    ? "bg-emerald-50 text-emerald-900"
                    : "text-emerald-700 hover:bg-emerald-50"
                }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t p-4">
        <button
          onClick={() => router.push("/login")}
          className="
            flex items-center gap-2 text-sm w-full
            text-red-600 hover:text-red-700
          "
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}