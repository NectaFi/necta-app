import { NextResponse } from "next/server"
import { env } from "@/env"

const AGENT_API_URL = env.AGENT_API_URL || "http://localhost:3001"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const account = searchParams.get("account")

    if (!account) {
      return NextResponse.json(
        { error: "Account address is required" },
        { status: 400 },
      )
    }

    // Call the agent backend to get status
    const response = await fetch(
      `${AGENT_API_URL}/agents/status?account=${account}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch agent status")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch agent status:", error)
    return NextResponse.json(
      { error: "Failed to fetch agent status" },
      { status: 500 },
    )
  }
}
