"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { User, UserRole } from "@/lib/types"
import { mockUsers } from "@/lib/mock-data"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

interface RegisterData {
  email: string
  password: string
  fullName: string
  role?: UserRole
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("eventhub_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    // Mock authentication
    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser && password === "password123") {
      setUser(foundUser)
      localStorage.setItem("eventhub_user", JSON.stringify(foundUser))
      return { success: true }
    }
    return { success: false, error: "Invalid email or password" }
  }, [])

  const register = useCallback(async (data: RegisterData) => {
    // Mock registration
    const existingUser = mockUsers.find((u) => u.email === data.email)
    if (existingUser) {
      return { success: false, error: "Email already exists" }
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      email: data.email,
      fullName: data.fullName,
      role: data.role || "user",
      avatar: `/placeholder.svg?height=100&width=100&query=avatar ${data.fullName}`,
      bio: "",
      interests: [],
      location: "",
      createdAt: new Date().toISOString(),
      rating: 0,
      reviewCount: 0,
    }

    setUser(newUser)
    localStorage.setItem("eventhub_user", JSON.stringify(newUser))
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("eventhub_user")
  }, [])

  const updateUser = useCallback(
    (data: Partial<User>) => {
      if (user) {
        const updatedUser = { ...user, ...data }
        setUser(updatedUser)
        localStorage.setItem("eventhub_user", JSON.stringify(updatedUser))
      }
    },
    [user],
  )

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
