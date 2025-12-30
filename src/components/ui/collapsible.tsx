"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export const Collapsible = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean; defaultOpen?: boolean }
>(({ className, asChild, defaultOpen, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn("relative", className)}
      data-state={defaultOpen ? "open" : "closed"}
    />
  )
})
Collapsible.displayName = "Collapsible"

export const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, asChild, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={cn("flex items-center justify-between w-full", className)}
    />
  )
})
CollapsibleTrigger.displayName = "CollapsibleTrigger"

export const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} {...props} className={cn("overflow-hidden", className)} />
})
CollapsibleContent.displayName = "CollapsibleContent"
