"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../Shared_Components/app-sidebar"
import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "../Shared_Components/Navbar"

export default function Layout() {
  const location = useLocation()

  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/students": "Students",
    "/dashboard/questions": "Questions",
    "/dashboard/groups": "GroupsList",
    "/dashboard/quizzes": "Quizzes",
    "/dashboard/results": "Results",
  }

  const pageTitle = titles[location.pathname] || "Page"

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <AppSidebar className="w-64 flex-shrink-0" />

        <div className="flex-1 flex flex-col min-w-0">
          <Navbar
            pageTitle={pageTitle}
            userName="Samar Mohamed"
            userRole="Instructor"
            userInitials="SM"
          />

          {/* <div className="flex-1 overflow-auto bg-gray-50"> */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
