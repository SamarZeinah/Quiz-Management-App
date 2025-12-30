

"use client"

import { type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom"

type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  items?: { title: string; url: string }[]
}

export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild tooltip={item.title} className="flex items-center gap-4 text-md py-8">
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-4 rounded-md bg-muted text-primary font-medium w-full"
                        : "flex items-center gap-4 text-gray-600-foreground hover:text-foreground w-full"
                    }
                  >
                    {item.icon && <item.icon className="w-6 h-6 shrink-0" />}
                    <span className="text-md truncate">{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent></CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
