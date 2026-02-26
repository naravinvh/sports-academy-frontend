"use client"

import { useState } from "react"
import { UserTable, type User } from "@/components/admin/users/UserTable"
import { AddUserModal } from "@/components/admin/users/AddUserModal"

export default function UsersPage() {
    const [openAdd, setOpenAdd] = useState(false)

    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            name: "Ninee",
            email: "ninee@mail.com",
            role: "admin",
            status: "active",
        },
        {
            id: 2,
            name: "John Student",
            email: "john@mail.com",
            role: "student",
            status: "active",
        },
    ])

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-blue-900">
                        User Management
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Manage users and permissions
                    </p>
                </div>

                <button
                    onClick={() => setOpenAdd(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    + Add User
                </button>
            </div>

            <UserTable
                users={users}
                currentUserRole="admin"
                onUpdate={(updated) =>
                    setUsers((prev) =>
                        prev.map((u) =>
                            u.id === updated.id ? updated : u
                        )
                    )
                }
                onDelete={(id) =>
                    setUsers((prev) =>
                        prev.filter((u) => u.id !== id)
                    )
                }
            />

            <AddUserModal
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                onAdd={(user) =>
                    setUsers((prev) => [
                        ...prev,
                        {
                            id: Date.now(),
                            status: "active",
                            ...user,
                        },
                    ])
                }
            />
        </div>
    )
}