"use client"

import { useEffect, useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, KeyRound, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { NavbarProps, User } from "@/Interfaces/NavbarInterfaces"

export function Navbar({ pageTitle }: NavbarProps) {
  const [user, setUser] = useState<User | null>(null)
  const navigate= useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const userName = user
    ? `${user.first_name} ${user.last_name}`
    : ""

  const userRole = user?.role || ""

  const userInitials = user
    ? `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}`
    : ""
const handleLogout = () => {
localStorage.removeItem("user")
  localStorage.removeItem("token")
    navigate("/login")}

const handleChangePassword = () => {
    navigate("/changepassword")}

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md h-20">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-bold">{pageTitle}</h1>
      </div>

      {/* Right */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 border-2 border-green-200 text-green-900 font-bold">
              {userInitials}
            </div>

            <div className="flex flex-col text-center">
              <span className="font-semibold">{userName}</span>
              <span className="text-sm text-green-700">{userRole}</span>
            </div>

            <ChevronDown className="w-6 h-6 text-gray-500" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52" sideOffset={15}>
          <DropdownMenuItem onClick={handleChangePassword} className="flex gap-3">
            <KeyRound className="w-5 h-5" />
            Change Password
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleLogout}
            className="flex gap-3 text-red-500"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
