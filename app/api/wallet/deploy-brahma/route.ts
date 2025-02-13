import { NextResponse } from "next/server"
import { ConsoleKitService } from "@/lib/services/console-kit"

export async function POST(request: Request) {
  try {
    const { userAddress } = await request.json()

    if (!userAddress) {
      return NextResponse.json(
        { error: "User address is required" },
        { status: 400 },
      )
    }

    const consoleKit = ConsoleKitService.getInstance()
    const accountAddress = await consoleKit.deployBrahmaAccount(userAddress)

    return NextResponse.json({ accountAddress })
  } catch (error) {
    console.error("Failed to deploy Brahma account:", error)
    return NextResponse.json(
      { error: "Failed to deploy Brahma account" },
      { status: 500 },
    )
  }
}
