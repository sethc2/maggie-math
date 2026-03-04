import { useGame } from "@/context/GameContext";
import { PLAYER_COLOR_MAP } from "@/lib/playerColors";
import { cn } from "@/lib/utils";

export function BuzzIndicator() {
  const { state } = useGame();
  const { buzzerState } = state;

  const buzzedPlayer = state.players.find(
    (p) => p.id === buzzerState.firstBuzzPlayerId
  );

  if (!buzzedPlayer) {
    if (!buzzerState.isActive) return null;
    return (
      <div className="text-center py-3 text-lg text-muted-foreground animate-pulse">
        Waiting for a buzz...
      </div>
    );
  }

  const colors = PLAYER_COLOR_MAP[buzzedPlayer.color];

  return (
    <div
      className={cn(
        "text-center py-3 text-xl font-bold rounded-lg animate-buzz-flash",
        colors.bg,
        colors.text
      )}
    >
      {buzzedPlayer.name} buzzed in!
    </div>
  );
}
