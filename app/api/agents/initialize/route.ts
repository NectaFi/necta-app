import { NextResponse } from "next/server";
import { env } from "@/env";

// This will be the URL of your agent backend
const AGENT_API_URL = env.AGENT_API_URL || "http://localhost:3001";

export async function POST(request: Request) {
  try {
    const { brahmaAccount } = await request.json();

    if (!brahmaAccount) {
      return NextResponse.json(
        { error: "Brahma account address is required" },
        { status: 400 }
      );
    }

    // Call the agent backend to initialize agents
    const response = await fetch(`${AGENT_API_URL}/agents/initialize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ brahmaAccount }),
    });

    if (!response.ok) {
      throw new Error("Failed to initialize agents");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to initialize agents:", error);
    return NextResponse.json(
      { error: "Failed to initialize agents" },
      { status: 500 }
    );
  }
}
