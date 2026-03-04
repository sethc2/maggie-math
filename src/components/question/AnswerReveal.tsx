import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";

export function AnswerReveal() {
  const { state, dispatch } = useGame();

  if (!state.currentCell) return null;

  return (
    <div className="space-y-4 text-center">
      <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
        <p className="text-sm text-green-600 font-medium">Correct Answer</p>
        <p className="text-3xl font-bold text-green-800">
          {state.currentCell.question.correctAnswer}
        </p>
      </div>
      <Button
        className="w-full text-lg py-5"
        onClick={() => dispatch({ type: "RETURN_TO_BOARD" })}
      >
        Back to Board
      </Button>
    </div>
  );
}
