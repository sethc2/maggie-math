import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HostControls() {
  const { state, dispatch } = useGame();
  const { buzzerState } = state;
  const [peeking, setPeeking] = useState(false);

  const answer = state.currentCell?.question.correctAnswer;

  return (
    <div className="space-y-3">
      {/* Presenter peek - always available */}
      <div className="flex justify-center">
        <button
          className={cn(
            "text-xs px-3 py-1 rounded-full border transition-all",
            peeking
              ? "bg-amber-100 border-amber-300 text-amber-800"
              : "bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200"
          )}
          onPointerDown={() => setPeeking(true)}
          onPointerUp={() => setPeeking(false)}
          onPointerLeave={() => setPeeking(false)}
        >
          {peeking ? `Answer: ${answer}` : "Hold to Peek at Answer"}
        </button>
      </div>

      {/* Judging controls - only when someone has buzzed in */}
      {buzzerState.firstBuzzPlayerId ? (
        <div className="flex gap-3 justify-center">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-5"
            onClick={() => dispatch({ type: "JUDGE_CORRECT" })}
          >
            Correct!
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-5"
            onClick={() => dispatch({ type: "JUDGE_INCORRECT" })}
          >
            Wrong
          </Button>
        </div>
      ) : (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => dispatch({ type: "NO_MORE_BUZZERS" })}
          >
            No one knows? Reveal Answer
          </Button>
        </div>
      )}
    </div>
  );
}
