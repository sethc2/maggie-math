import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { BoardGrid } from "@/components/board/BoardGrid";
import { ScoreBoard } from "@/components/player/ScoreBoard";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function BoardScreen() {
  const { state, dispatch, mode } = useGame();
  const [showEndDialog, setShowEndDialog] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <ScoreBoard />

      <div className="flex-1 flex items-center justify-center p-4">
        <BoardGrid />
      </div>

      <div className="flex justify-center gap-4 p-4">
        <div className="text-blue-300 text-sm">
          {state.revealedCount} / {state.totalCells} questions answered
        </div>
        {mode === "host" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEndDialog(true)}
            className="text-white border-white/30 bg-white/10 hover:bg-white/20"
          >
            End Game
          </Button>
        )}
      </div>

      {mode === "host" && (
        <AlertDialog open={showEndDialog} onOpenChange={setShowEndDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>End Game Early?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to end the game? Current scores will be
                final.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Playing</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => dispatch({ type: "END_GAME_EARLY" })}
              >
                End Game
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
