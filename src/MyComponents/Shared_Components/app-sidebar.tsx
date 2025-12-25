"use client"

import * as React from "react"
import {
  BarChart3,
  ClipboardList,
  HelpCircle,
  Layers,
  LayoutDashboard,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { TeamSwitcher } from "./team-switcher"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },


navMain: [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    url: "/dashboard/students",
    icon: Users,
  },
  {
    title: "Questions",
    url: "/dashboard/questions",
    icon: HelpCircle,
  },
  {
    title: "Groups",
    url: "/dashboard/groups",
    icon: Layers,
  },
  {
    title: "Quizzes",
    url: "/dashboard/quizzes",
    icon: ClipboardList,
  },
  {
    title: "Results",
    url: "/dashboard/results",
    icon: BarChart3,
  },
]

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}  >
      <SidebarHeader className="mt-4">
        <TeamSwitcher  />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
