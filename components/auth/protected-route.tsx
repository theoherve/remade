'use client';

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireCreator?: boolean
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  requireCreator = false,
}: ProtectedRouteProps) {
  const { session, status, isAuthenticated } = useAuth(requireAuth)
  const router = useRouter()

  useEffect(() => {
    if (requireAuth && status === "unauthenticated") {
      router.push("/login")
    }

    if (requireCreator && session?.user?.role !== "CREATOR") {
      router.push("/")
    }
  }, [requireAuth, requireCreator, status, session, router])

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null
  }

  if (requireCreator && session?.user?.role !== "CREATOR") {
    return null
  }

  return <>{children}</>
} 