"use client"

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { NETWORKS } from "@/lib/constants/app"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

type Network = (typeof NETWORKS)[number]

export function NetworkSelector() {
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(NETWORKS[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/10 px-3 text-[15px] text-white/90 shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] backdrop-blur-sm transition-colors hover:bg-black/20"
        >
          <div className="relative h-5 w-5">
            <Image
              src={selectedNetwork.icon}
              alt={`${selectedNetwork.name} icon`}
              fill
              className="rounded-full object-contain"
            />
          </div>
          {selectedNetwork.name}
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[140px] rounded-lg border border-white/[0.08] bg-black/10 p-1.5 text-white shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] backdrop-blur-sm"
      >
        {NETWORKS.map((network) => (
          <DropdownMenuItem
            key={network.name}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[15px] text-white/90 transition-colors hover:bg-black/20"
            onClick={() => setSelectedNetwork(network)}
          >
            <div className="relative h-5 w-5">
              <Image
                src={network.icon}
                alt={`${network.name} icon`}
                fill
                className="rounded-full object-contain"
              />
            </div>
            {network.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
