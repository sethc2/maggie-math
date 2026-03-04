import type { Player } from "@/types/game";
import { PLAYER_COLOR_MAP } from "@/lib/playerColors";
import { cn } from "@/lib/utils";

interface Props {
  player: Player;
  onBuzz: () => void;
  isLockedOut: boolean;
  isDisabled: boolean;
}

export function BuzzerButton({ player, onBuzz, isLockedOut, isDisabled }: Props) {
  const colors = PLAYER_COLOR_MAP[player.color];

  return (
    <button
      className={cn(
        "w-full h-20 rounded-2xl text-xl sm:text-2xl font-bold",
        "transition-all duration-100",
        "active:scale-95 active:brightness-110",
        "shadow-lg active:shadow-sm",
        colors.bg,
        colors.text,
        (isLockedOut || isDisabled) && "opacity-30 cursor-not-allowed grayscale"
      )}
      onClick={onBuzz}
      disabled={isLockedOut || isDisabled}
    >
      {isLockedOut ? `${player.name} ✗` : player.name}
    </button>
  );
}
