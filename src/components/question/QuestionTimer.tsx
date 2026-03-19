import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { cn } from "@/lib/utils";

export function QuestionTimer() {
  const { state, mode } = useGame();
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!state.timerDeadline) {
      setRemaining(0);
      return;
    }

    const tick = () => {
      const ms = state.timerDeadline! - Date.now();
      setRemaining(Math.max(0, ms / 1000));
    };
    tick();
    const id = setInterval(tick, 50);
    return () => clearInterval(id);
  }, [state.timerDeadline]);

  if (!state.timerDeadline || remaining <= 0) return null;

  const total = state.timerPhase === "thinking" ? 30 : 5;
  const fraction = remaining / total;
  const displaySeconds = Math.ceil(remaining);

  const isDisplay = mode === "display";
  const svgSize = isDisplay ? 120 : 88;
  const radius = isDisplay ? 48 : 36;
  const center = svgSize / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - fraction);

  const isUrgent = remaining <= 5;
  const isWarning = remaining <= 10 && !isUrgent;

  const strokeColor = isUrgent ? "#ef4444" : isWarning ? "#eab308" : "#22c55e";
  const textColor = isUrgent
    ? "text-red-500"
    : isWarning
      ? "text-yellow-500"
      : "text-green-500";

  return (
    <div className="flex flex-col items-center py-3">
      <div className={cn("relative", isUrgent && remaining <= 3 && "animate-pulse")}>
        <svg width={svgSize} height={svgSize} className="-rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            className="text-gray-300/30"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-100"
          />
        </svg>
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center font-bold",
            isDisplay ? "text-4xl" : "text-2xl",
            textColor
          )}
        >
          {displaySeconds}
        </div>
      </div>
      <p
        className={cn(
          "mt-1",
          isDisplay ? "text-sm text-blue-300" : "text-xs text-muted-foreground"
        )}
      >
        {state.timerPhase === "thinking" ? "Time to buzz" : "Time to answer"}
      </p>
    </div>
  );
}
