import { useGame } from "@/context/GameContext";
import { ALL_CATEGORIES } from "@/types/question";
import type { GameState, BoardCell } from "@/types/game";
import type { GameAction } from "@/context/gameReducer";
import { BarGraphQuestion } from "@/components/question/BarGraphQuestion";
import { BuzzIndicator } from "@/components/buzzer/BuzzIndicator";
import { ScoreBoard } from "@/components/player/ScoreBoard";
import { QuestionTimer } from "@/components/question/QuestionTimer";
import { Button } from "@/components/ui/button";
import { PLAYER_COLOR_MAP } from "@/lib/playerColors";
import { cn } from "@/lib/utils";

export function QuestionScreen() {
  const { state, dispatch, mode } = useGame();
  const cell = state.currentCell;

  if (!cell) return null;

  const categoryMeta = ALL_CATEGORIES.find((c) => c.id === cell.categoryId);
  const categoryName = categoryMeta?.displayName ?? cell.categoryId;
  const categoryIcon = categoryMeta?.icon ?? "";

  return (
    <div className="min-h-screen flex flex-col">
      <ScoreBoard />

      <div className="flex-1 flex items-center justify-center p-4">
        {mode === "host" ? (
          <HostQuestionView
            cell={cell}
            categoryName={categoryName}
            categoryIcon={categoryIcon}
            state={state}
            dispatch={dispatch}
          />
        ) : (
          <DisplayQuestionView
            cell={cell}
            categoryName={categoryName}
            categoryIcon={categoryIcon}
            state={state}
          />
        )}
      </div>
    </div>
  );
}

function HostQuestionView({
  cell,
  categoryName,
  categoryIcon,
  state,
  dispatch,
}: {
  cell: BoardCell;
  categoryName: string;
  categoryIcon: string;
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}) {
  const { buzzerState } = state;

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 space-y-4">
      <div className="text-center">
        <p className="text-lg font-bold text-gray-800">
          {categoryIcon} {categoryName} &mdash; ${cell.pointValue}
        </p>
      </div>

      {cell.question.visual && <BarGraphQuestion data={cell.question.visual} />}

      <div className="text-center py-2">
        <p className="text-2xl font-bold text-gray-900">
          {cell.question.questionText}
        </p>
      </div>

      <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3 text-center">
        <p className="text-xs text-green-600 font-medium uppercase tracking-wide">
          Answer
        </p>
        <p className="text-2xl font-bold text-green-800">
          {cell.question.correctAnswer}
        </p>
      </div>

      <QuestionTimer />

      {state.phase === "question" && (
        <div className="space-y-4">
          {buzzerState.firstBuzzPlayerId ? (
            <>
              <BuzzIndicator />
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
            </>
          ) : (
            <>
              {buzzerState.isActive && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 text-center">
                    Click a student&apos;s name when they buzz in:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {state.players.map((player) => {
                      const isLockedOut =
                        buzzerState.lockedOutPlayerIds.includes(player.id);
                      const colors = PLAYER_COLOR_MAP[player.color];
                      return (
                        <button
                          key={player.id}
                          className={cn(
                            "py-3 rounded-xl font-bold text-lg transition-all",
                            colors.bg,
                            colors.text,
                            isLockedOut &&
                              "opacity-30 cursor-not-allowed grayscale"
                          )}
                          onClick={() =>
                            dispatch({
                              type: "BUZZ_IN",
                              playerId: player.id,
                              timestamp: performance.now(),
                            })
                          }
                          disabled={isLockedOut}
                        >
                          {isLockedOut ? `${player.name} ✗` : player.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => dispatch({ type: "NO_MORE_BUZZERS" })}
                >
                  No one knows? Reveal Answer
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {state.phase === "answer" && (
        <div className="flex justify-center">
          <Button
            className="text-lg py-5 px-8"
            onClick={() => dispatch({ type: "RETURN_TO_BOARD" })}
          >
            Back to Board
          </Button>
        </div>
      )}
    </div>
  );
}

function DisplayQuestionView({
  cell,
  categoryName,
  categoryIcon,
  state,
}: {
  cell: BoardCell;
  categoryName: string;
  categoryIcon: string;
  state: GameState;
}) {
  return (
    <div className="w-full max-w-5xl text-center space-y-6">
      <div>
        <p className="text-3xl font-bold text-blue-200">
          {categoryIcon} {categoryName} &mdash; ${cell.pointValue}
        </p>
      </div>

      {cell.question.visual && (
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 inline-block">
          <BarGraphQuestion data={cell.question.visual} />
        </div>
      )}

      <div className="py-4">
        <p className="text-5xl sm:text-6xl font-black text-white leading-tight">
          {cell.question.questionText}
        </p>
      </div>

      <QuestionTimer />

      {state.phase === "question" && (
        <>
          {state.buzzerState.firstBuzzPlayerId ? (
            <BuzzIndicator />
          ) : state.buzzerState.isActive ? (
            <p className="text-2xl text-blue-200 animate-pulse py-4">
              Buzz in!
            </p>
          ) : null}
        </>
      )}

      {state.phase === "answer" && (
        <div className="inline-block bg-green-500/20 border-2 border-green-400 rounded-2xl p-6">
          <p className="text-lg text-green-300 font-medium">Correct Answer</p>
          <p className="text-5xl font-black text-green-200">
            {cell.question.correctAnswer}
          </p>
        </div>
      )}
    </div>
  );
}
