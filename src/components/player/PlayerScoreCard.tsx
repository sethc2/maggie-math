import type { Player } from "@/types/game";
import { PLAYER_COLOR_MAP } from "@/lib/playerColors";
import { cn } from "@/lib/utils";

interface Props {
  player: Player;
}

export function PlayerScoreCard({ player }: Props) {
  const colors = PLAYER_COLOR_MAP[player.color];

  return (
    <div
      className={cn(
        "rounded-lg border-2 px-4 py-2 min-w-[120px] text-center",
        colors.border,
        colors.light
      )}
    >
      <div className="font-semibold text-sm truncate">{player.name}</div>
      <div
        className={cn(
          "text-2xl font-bold",
          player.score >= 0 ? "text-green-700" : "text-red-600"
        )}
      >
        ${player.score.toLocaleString()}
      </div>
    </div>
  );
}
