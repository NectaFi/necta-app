"use client"

import { useEffect, useRef, useState } from "react"
import { PROTOCOLS } from "@/lib/constants/app"
import { ProtocolCard } from "./protocol-card"

export function ProtocolScroll() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [activeProtocol, setActiveProtocol] = useState<string | null>(null)
  const scrollSpeed = 1 // Pixels per frame at 60fps

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let lastTime = performance.now()
    let animationFrameId: number

    const animate = (currentTime: number) => {
      if (isPaused) {
        lastTime = currentTime
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      const deltaTime = currentTime - lastTime
      const pixelsToScroll = (scrollSpeed * deltaTime) / 16.67 // Normalize to 60fps

      if (scrollContainer) {
        scrollContainer.scrollLeft += pixelsToScroll

        // Reset scroll position when reaching end for seamless loop
        const maxScroll = scrollContainer.scrollWidth / 3 // One-third since we tripled the content
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0
        }
      }

      lastTime = currentTime
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isPaused, scrollSpeed])

  // Create a triple array for smooth infinite scroll
  const tripleProtocols = [...PROTOCOLS, ...PROTOCOLS, ...PROTOCOLS]

  return (
    <div
      ref={scrollRef}
      className="hide_scrollbar flex w-full gap-4 overflow-x-auto py-4 transition-all duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false)
        setActiveProtocol(null)
      }}
    >
      {tripleProtocols.map((protocol, index) => (
        <ProtocolCard
          key={`${protocol.name}-${index}`}
          name={protocol.name}
          apy={protocol.apy}
          icon={protocol.icon}
          isActive={activeProtocol === `${protocol.name}-${index}`}
          onHover={(isHovering) => {
            setActiveProtocol(isHovering ? `${protocol.name}-${index}` : null)
          }}
        />
      ))}
    </div>
  )
}
