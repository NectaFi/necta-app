"use client"

import { cn } from "@/lib/utils"

interface BackgroundGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export function BackgroundGradient({
  children,
  className,
  ...props
}: BackgroundGradientProps) {
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {/* Main dark background */}
      <div className="absolute inset-0 bg-[#111111]" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 opacity-50">
        {/* Primary orange gradient */}
        <div
          className="-left-[10%] absolute top-0 h-[500px] w-[500px] animate-pulse rounded-full bg-[#F46F03] opacity-20 blur-[150px]"
          style={{ animationDuration: "10s" }}
        />
        {/* Secondary orange gradient */}
        <div
          className="absolute top-1/4 right-0 h-[400px] w-[400px] animate-pulse rounded-full bg-[#F29600] opacity-20 blur-[150px]"
          style={{ animationDuration: "15s" }}
        />
        {/* Accent gradient */}
        <div
          className="absolute bottom-0 left-1/3 h-[600px] w-[600px] animate-pulse rounded-full bg-[#F46F03] opacity-10 blur-[150px]"
          style={{ animationDuration: "20s" }}
        />
      </div>

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  )
}
