"use client"

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Layers } from "lucide-react"

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton className="flex items-center gap-4 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-800 text-sidebar-primary-foreground shrink-0">
            <Layers className="h-4 w-4" />
          </div>

          <span className="text-sm font-bold truncate flex-1 text-gray-800">
            Quiz App
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
