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
          className="flex items-center gap-2 rounded-full bg-black/20 px-3 text-sm text-white hover:bg-black/30"
        >
          <div className="relative h-4 w-4">
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
        className="w-[120px] rounded-lg border-0 bg-black/50 p-1 text-white backdrop-blur-xl"
      >
        {NETWORKS.map((network) => (
          <DropdownMenuItem
            key={network.name}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/10"
            onClick={() => setSelectedNetwork(network)}
          >
            <div className="relative h-4 w-4">
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
