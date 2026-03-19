import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PLAYER_COLOR_MAP } from "@/lib/playerColors";
import type { DifficultyLevel } from "@/types/game";

export function SetupScreen() {
  const { state, dispatch } = useGame();
  const [showInstructions, setShowInstructions] = useState(false);

  const openDisplayWindow = () => {
    const url =
      window.location.origin + window.location.pathname + "?mode=display";
    window.open(url, "maggie-math-display");
  };

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
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold text-blue-800">
                Presentation Mode
              </Label>
              <button
                onClick={() => setShowInstructions(true)}
                className="text-sm text-blue-600 hover:text-blue-800 underline cursor-pointer"
              >
                How does this work?
              </button>
            </div>
            <p className="text-sm text-blue-700">
              Open a separate window for students to see the board and
              questions.
            </p>
            <Button
              variant="outline"
              className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
              onClick={openDisplayWindow}
            >
              Open Player Display Window
            </Button>
          </div>

          <Separator />

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
                      dispatch({
                        type: "REMOVE_PLAYER",
                        playerId: player.id,
                      })
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

      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              How to Use Presentation Mode
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              Presentation mode lets you project the game for students while
              keeping the answers and controls on your screen.
            </p>

            <div className="space-y-2">
              <h3 className="font-bold text-base">Quick Setup</h3>
              <ol className="list-decimal list-inside space-y-1.5 text-muted-foreground">
                <li>Connect your computer to a projector or TV</li>
                <li>
                  Click{" "}
                  <strong className="text-foreground">
                    &ldquo;Open Player Display Window&rdquo;
                  </strong>{" "}
                  on the setup screen
                </li>
                <li>
                  Drag that window to the projected screen and make it
                  fullscreen (<kbd className="px-1 py-0.5 rounded bg-muted text-xs font-mono">F11</kbd>)
                </li>
                <li>
                  Keep this window on your computer &mdash; this is your control
                  panel
                </li>
                <li>Set up player names and start the game</li>
              </ol>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-base">During the Game</h3>
              <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
                <li>Select questions from the board on your screen</li>
                <li>
                  Students buzz in by raising their hand or slapping their desk
                </li>
                <li>
                  Click the student&apos;s name on your screen to register their
                  buzz
                </li>
                <li>
                  A <strong className="text-foreground">30-second</strong> timer
                  counts down for thinking time
                </li>
                <li>
                  Once a student buzzes, they get{" "}
                  <strong className="text-foreground">5 seconds</strong> to
                  answer
                </li>
                <li>
                  Judge their answer:{" "}
                  <strong className="text-green-600">Correct</strong> (+points)
                  or <strong className="text-red-600">Wrong</strong> (&minus;points)
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-base">Tips</h3>
              <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
                <li>
                  The student display <strong className="text-foreground">never</strong> shows the
                  answer until you reveal it
                </li>
                <li>You always see the answer on your screen</li>
                <li>
                  If no one buzzes, click &ldquo;No one knows&rdquo; to reveal
                  the answer
                </li>
                <li>
                  You can also play without the display window &mdash; the app
                  works on a single screen too
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
