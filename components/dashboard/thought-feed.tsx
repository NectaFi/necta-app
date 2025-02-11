"use client"

import { Brain, Eye, Terminal } from "lucide-react"
import type { Thought } from "@/lib/types"
import { cn } from "@/lib/utils"

export function ThoughtFeed({ thoughts }: { thoughts: Thought[] }) {
  const getAgentIcon = (agentName: string) => {
    switch (agentName.toLowerCase()) {
      case "sentinel":
        return <Eye className="h-4 w-4" />
      case "curator":
        return <Brain className="h-4 w-4" />
      case "executor":
        return <Terminal className="h-4 w-4" />
      default:
        return null
    }
  }

  const getEventStyle = (message: string) => {
    if (message.toLowerCase().includes("error")) {
      return "text-red-500 bg-red-500/10"
    }
    if (
      message.toLowerCase().includes("success") ||
      message.toLowerCase().includes("initialized")
    ) {
      return "text-green-500 bg-green-500/10"
    }
    if (message.toLowerCase().includes("warning")) {
      return "text-yellow-500 bg-yellow-500/10"
    }
    return "text-blue-500 bg-blue-500/10"
  }

  return (
    <div className="space-y-4">
      {thoughts.map((thought) => (
        <div
          key={thought.id}
          className="flex items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] p-3"
        >
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full",
              getEventStyle(thought.message),
            )}
          >
            {getAgentIcon(thought.agent)}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">
                {thought.agent.charAt(0).toUpperCase() + thought.agent.slice(1)}
              </span>
              <span className="text-sm text-white/40">
                {new Date(thought.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-sm text-white/80">{thought.message}</p>
            {thought.data?.tools && (
              <div className="mt-1 flex flex-wrap gap-1">
                {thought.data.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-white/[0.08] px-2 py-0.5 text-white/60 text-xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            )}
            {thought.data?.report && (
              <pre className="mt-2 max-h-[200px] overflow-auto whitespace-pre-wrap rounded-md bg-black/20 p-2 text-white/60 text-xs">
                {thought.data.report}
              </pre>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
