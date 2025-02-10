"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Bot, Brain, Eye, Terminal, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentEvent {
  id?: string;
  agent: string;
  message: string;
  timestamp: string;
  data?: {
    tools?: string[];
    report?: string;
  };
}

interface SystemEventsProps {
  className?: string;
}

export function SystemEvents({ className }: SystemEventsProps) {
  const [events, setEvents] = useState<AgentEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "https://necta-agents-production.up.railway.app/thoughts"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Handle different response formats
      const formattedEvents = Array.isArray(data)
        ? data
        : data.thoughts || data.events || [];

      // Validate each event has required fields
      const validEvents = formattedEvents.filter((event: any) => {
        return (
          event &&
          typeof event === "object" &&
          typeof event.agent === "string" &&
          typeof event.message === "string" &&
          typeof event.timestamp === "string"
        );
      });

      setEvents(validEvents);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setError("Unable to connect to agents. Please check your connection.");
    }
  };

  const getAgentIcon = (agent: string) => {
    switch (agent.toLowerCase()) {
      case "sentinel":
        return <Eye className="h-4 w-4" />;
      case "curator":
        return <Brain className="h-4 w-4" />;
      case "executor":
        return <Terminal className="h-4 w-4" />;
      default:
        return <Bot className="h-4 w-4" />;
    }
  };

  const getEventStyle = (message: string) => {
    if (message.includes("error")) {
      return "text-red-500 bg-red-500/10";
    }
    if (message.includes("success") || message.includes("initialized")) {
      return "text-green-500 bg-green-500/10";
    }
    if (message.includes("warning")) {
      return "text-yellow-500 bg-yellow-500/10";
    }
    return "text-blue-500 bg-blue-500/10";
  };

  const getEventKey = (event: AgentEvent, index: number) => {
    if (event.id) return event.id;
    return `${event.agent}-${event.timestamp}-${index}`;
  };

  return (
    <Card
      className={cn(
        "border-white/[0.08] bg-zinc-900/[0.65] backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center justify-between border-white/[0.08] border-b p-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-white/60" />
          <h2 className="font-medium text-white">System Events</h2>
        </div>
      </div>
      <div ref={containerRef} className="h-[400px] overflow-auto">
        {error ? (
          <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <p className="text-sm text-white/60">{error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
            <Bot className="h-8 w-8 text-white/40" />
            <p className="text-sm text-white/60">No events to display</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 p-4">
            {events.map((event, index) => (
              <div
                key={getEventKey(event, index)}
                className="flex items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] p-3"
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    getEventStyle(event.message)
                  )}
                >
                  {getAgentIcon(event.agent)}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">
                      {event.agent.charAt(0).toUpperCase() +
                        event.agent.slice(1)}
                    </span>
                    <span className="text-sm text-white/40">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-white/80">{event.message}</p>
                  {event.data?.tools && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {event.data.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full bg-white/[0.08] px-2 py-0.5 text-white/60 text-xs"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                  {event.data?.report && (
                    <pre className="mt-2 max-h-[200px] overflow-auto whitespace-pre-wrap rounded-md bg-black/20 p-2 text-white/60 text-xs">
                      {event.data.report}
                    </pre>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
