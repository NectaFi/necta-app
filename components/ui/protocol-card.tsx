"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface ProtocolCardProps {
  name: string
  apy: string
  icon: string
  isActive: boolean
  onHover: (isHovering: boolean) => void
}

export function ProtocolCard({
  name,
  apy,
  icon,
  isActive,
  onHover,
}: ProtocolCardProps) {
  return (
    <Popover open={isActive} onOpenChange={onHover}>
      <PopoverTrigger asChild>
        <Card
          className="flex min-w-[140px] cursor-pointer items-center gap-2 p-2 transition-colors hover:bg-accent"
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
        >
          <div className="relative h-6 w-6">
            <Image
              src={icon}
              alt={`${name} icon`}
              fill
              className="rounded-full object-contain"
            />
          </div>
          <span className="font-medium text-sm">{apy}</span>
        </Card>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 border-0 bg-black/50 p-4 text-white backdrop-blur-xl"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12">
            <Image
              src={icon}
              alt={`${name} icon`}
              fill
              className="rounded-full object-contain"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-white/60">Current APY: {apy}</p>
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-white/5 p-4">
          <h4 className="mb-2 font-medium">Protocol Details</h4>
          <p className="text-sm text-white/60">
            {name} is a leading DeFi protocol offering competitive yields
            through their lending and borrowing markets.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
