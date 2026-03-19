import type { BoardCell as BoardCellType } from "@/types/game";
import { cn } from "@/lib/utils";

interface Props {
  cell: BoardCellType;
  onClick?: () => void;
}

export function BoardCell({ cell, onClick }: Props) {
  return (
    <button
      className={cn(
        "aspect-[4/3] flex items-center justify-center rounded-lg",
        "text-yellow-300 font-bold text-lg sm:text-2xl md:text-3xl",
        "transition-all duration-200",
        "shadow-inner",
        cell.isRevealed
          ? "bg-blue-950/50 cursor-default"
          : onClick
            ? "bg-blue-800 hover:bg-blue-600 cursor-pointer hover:scale-105 active:scale-95"
            : "bg-blue-800 cursor-default"
      )}
      onClick={onClick}
      disabled={cell.isRevealed || !onClick}
    >
      {cell.isRevealed ? "" : `$${cell.pointValue}`}
    </button>
  );
}
