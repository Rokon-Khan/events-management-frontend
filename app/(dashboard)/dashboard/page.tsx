"use client"

import { useAuth } from "@/lib/auth-context"
import { UserDashboard } from "@/components/dashboard/user-dashboard"
import { HostDashboard } from "@/components/dashboard/host-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  if (user.role === "admin") {
    return <AdminDashboard />
  }

  if (user.role === "host") {
    return <HostDashboard />
  }

  return <UserDashboard />
}
