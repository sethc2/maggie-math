import { useGame } from "@/context/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PLAYER_COLOR_MAP } from "@/lib/playerColors";
import { cn } from "@/lib/utils";

export function GameOverScreen() {
  const { state, dispatch, mode } = useGame();

  const sorted = [...state.players].sort((a, b) => b.score - a.score);
  const winner = sorted[0];
  const isTie = sorted.length > 1 && sorted[0].score === sorted[1].score;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">Game Over!</CardTitle>
          {!isTie ? (
            <div className="mt-4">
              <p className="text-lg text-muted-foreground">Winner</p>
              <p
                className={cn(
                  "text-5xl font-black mt-2",
                  `text-${winner.color}-500`
                )}
                style={{ color: getColorHex(winner.color) }}
              >
                {winner.name}
              </p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                ${winner.score.toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-2xl font-bold mt-4 text-yellow-500">It's a tie!</p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {sorted.map((player, index) => {
              const colors = PLAYER_COLOR_MAP[player.color];
              return (
                <div
                  key={player.id}
                  className={cn(
                    "flex items-center justify-between rounded-lg border-2 px-4 py-3",
                    colors.border,
                    colors.light,
                    index === 0 && !isTie && "ring-2 ring-yellow-400"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-muted-foreground">
                      #{index + 1}
                    </span>
                    <span className="font-semibold">{player.name}</span>
                  </div>
                  <span
                    className={cn(
                      "text-xl font-bold",
                      player.score >= 0 ? "text-green-700" : "text-red-600"
                    )}
                  >
                    ${player.score.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>

          {mode === "host" && (
            <Button
              className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
              onClick={() => dispatch({ type: "PLAY_AGAIN" })}
            >
              Play Again!
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function getColorHex(color: string): string {
  const map: Record<string, string> = {
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#22c55e",
    orange: "#f97316",
    purple: "#a855f7",
    pink: "#ec4899",
    teal: "#14b8a6",
    yellow: "#eab308",
  };
  return map[color] ?? "#3b82f6";
}
