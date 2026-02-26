"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import {
  Home,
  Users,
  BookOpen,
  CreditCard,
  LogOut,
  Menu,
} from "lucide-react"

const menu = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Courses", href: "/admin/courses", icon: BookOpen },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-background">
      {/* SIDEBAR */}
      <aside
        className={`${
          open ? "w-64" : "w-16"
        } bg-sidebar text-sidebar-foreground transition-all`}
      >
        <div className="p-4 flex justify-between items-center">
          <span className="font-bold">ADMIN</span>
          <button onClick={() => setOpen(!open)}>
            <Menu size={18} />
          </button>
        </div>

        <nav className="space-y-1 px-2">
          {menu.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                ${
                  active
                    ? "bg-sidebar-accent text-white"
                    : "hover:bg-sidebar-accent/60"
                }`}
              >
                <Icon size={18} />
                {open && item.name}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}