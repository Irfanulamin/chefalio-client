"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

type AllowedRole = "user" | "chef" | "admin";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: AllowedRole[];
  redirectTo?: string;
  unauthorizedRedirect?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = "/login",
  unauthorizedRedirect = "/unauthorized",
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect(redirectTo);
  }

  if (
    allowedRoles?.length > 0 &&
    !allowedRoles.includes(user?.role as AllowedRole)
  ) {
    redirect(unauthorizedRedirect);
  }

  return <>{children}</>;
}
