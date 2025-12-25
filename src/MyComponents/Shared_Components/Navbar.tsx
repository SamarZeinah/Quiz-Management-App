"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Key, KeyRound, LogOut } from "lucide-react"

interface NavbarProps {
  pageTitle: string
  userName: string
  userRole: string
  userInitials: string
  onChangePassword: () => void
  onLogout: () => void
}

export function Navbar({
  pageTitle,
  userName,
  userRole,
  userInitials,
  onChangePassword,
  onLogout,
}: NavbarProps) {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md h-20">
      
      {/* Left: SidebarTrigger + Title */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-bold">{pageTitle}</h1>
      </div>

      {/* Right: User with Dropdown */}

<div className="flex items-center gap-4">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <div className="flex items-center gap-2 cursor-pointer">
        {/* Initials Circle */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 border-2 border-green-200 text-green-900 font-bold shrink-0">
          {userInitials}
        </div>

        {/* Name & Role */}
        <div className="flex flex-col text-center">
          <span className="font-semibold">{userName}</span>
          <span className="text-sm text-green-700">{userRole}</span>
        </div>

        {/* Chevron Down */}
        <ChevronDown className="w-6 h-6 text-gray-500 font-bold" />
      </div>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" className="w-52" sideOffset={15}>
      {/* Change Password */}
      <DropdownMenuItem
        onClick={onChangePassword}
        className="flex items-center gap-3"
      >
        <div className="w-6 h-6 flex items-center justify-center shrink-0">
          <KeyRound className="w-full h-full" />
        </div>
        Change Password
      </DropdownMenuItem>

      {/* Logout */}
      <DropdownMenuItem
        onClick={onLogout}
        className="flex items-center gap-3 text-red-500"
      >
        <div className="w-6 h-6 flex items-center justify-center shrink-0">
          <LogOut className="w-full h-full" />
        </div>
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>

    </div>
  )
}
