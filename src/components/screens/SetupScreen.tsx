import { useGame } from "@/context/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PLAYER_COLOR_MAP } from "@/lib/playerColors";
import type { DifficultyLevel } from "@/types/game";

export function SetupScreen() {
  const { state, dispatch } = useGame();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Maggie Math Jeopardy
          </CardTitle>
          <p className="text-muted-foreground mt-2">Set up your game!</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Players</Label>
            {state.players.map((player) => (
              <div key={player.id} className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full shrink-0 ${PLAYER_COLOR_MAP[player.color].bg}`}
                />
                <Input
                  value={player.name}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_PLAYER_NAME",
                      playerId: player.id,
                      name: e.target.value,
                    })
                  }
                  placeholder="Player name"
                  className="flex-1"
                />
                {state.players.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      dispatch({ type: "REMOVE_PLAYER", playerId: player.id })
                    }
                    className="text-red-500 hover:text-red-700 shrink-0"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            {state.players.length < 8 && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  dispatch({
                    type: "ADD_PLAYER",
                    name: `Player ${state.players.length + 1}`,
                  })
                }
              >
                + Add Player
              </Button>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <Label className="text-lg font-semibold">Difficulty</Label>
            <Select
              value={state.difficulty}
              onValueChange={(val) =>
                dispatch({
                  type: "SET_DIFFICULTY",
                  difficulty: val as DifficultyLevel,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy (smaller numbers)</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard (larger numbers)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
            onClick={() => dispatch({ type: "START_GAME" })}
            disabled={state.players.some((p) => !p.name.trim())}
          >
            Start Game!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
