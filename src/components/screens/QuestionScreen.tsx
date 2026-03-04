import { useGame } from "@/context/GameContext";
import { ALL_CATEGORIES } from "@/types/question";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BarGraphQuestion } from "@/components/question/BarGraphQuestion";
import { BuzzerPanel } from "@/components/buzzer/BuzzerPanel";
import { BuzzIndicator } from "@/components/buzzer/BuzzIndicator";
import { HostControls } from "@/components/question/HostControls";
import { AnswerReveal } from "@/components/question/AnswerReveal";
import { ScoreBoard } from "@/components/player/ScoreBoard";

export function QuestionScreen() {
  const { state } = useGame();
  const cell = state.currentCell;

  if (!cell) return null;

  const categoryMeta = ALL_CATEGORIES.find((c) => c.id === cell.categoryId);
  const categoryName = categoryMeta?.displayName ?? cell.categoryId;
  const categoryIcon = categoryMeta?.icon ?? "";

  return (
    <div className="min-h-screen flex flex-col">
      <ScoreBoard />

      <div className="flex-1 flex items-center justify-center p-4">
        <Dialog open modal={false}>
          <DialogContent
            className="sm:max-w-lg max-h-[85vh] overflow-y-auto"
            onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle className="text-center text-lg">
                {categoryIcon} {categoryName} — ${cell.pointValue}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Visual (bar graph) if present */}
              {cell.question.visual && (
                <BarGraphQuestion data={cell.question.visual} />
              )}

              {/* Question text */}
              <div className="text-center py-4">
                <p className="text-2xl sm:text-3xl font-bold">
                  {cell.question.questionText}
                </p>
              </div>

              {state.phase === "question" && (
                <>
                  <BuzzIndicator />
                  <BuzzerPanel />
                  <HostControls />
                </>
              )}

              {state.phase === "answer" && <AnswerReveal />}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
