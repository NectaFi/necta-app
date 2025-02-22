import { z } from "zod"

export const AgentStatusSchema = z.object({
  agent: z.string(),
  status: z.enum(["active", "processing", "error"]),
  lastActive: z.string().datetime(),
  description: z.string(),
})

export const ThoughtSchema = z.object({
  id: z.string(),
  agent: z.string(),
  message: z.string(),
  timestamp: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
})

export type AgentStatus = z.infer<typeof AgentStatusSchema>
export type Thought = z.infer<typeof ThoughtSchema>
