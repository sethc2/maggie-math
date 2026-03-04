import type { PlayerColor } from "@/types/game";

export const PLAYER_COLOR_MAP: Record<
  PlayerColor,
  { bg: string; text: string; border: string; light: string }
> = {
  red: { bg: "bg-red-500", text: "text-white", border: "border-red-500", light: "bg-red-50" },
  blue: { bg: "bg-blue-500", text: "text-white", border: "border-blue-500", light: "bg-blue-50" },
  green: { bg: "bg-green-500", text: "text-white", border: "border-green-500", light: "bg-green-50" },
  orange: { bg: "bg-orange-500", text: "text-white", border: "border-orange-500", light: "bg-orange-50" },
  purple: { bg: "bg-purple-500", text: "text-white", border: "border-purple-500", light: "bg-purple-50" },
  pink: { bg: "bg-pink-500", text: "text-white", border: "border-pink-500", light: "bg-pink-50" },
  teal: { bg: "bg-teal-500", text: "text-white", border: "border-teal-500", light: "bg-teal-50" },
  yellow: { bg: "bg-yellow-400", text: "text-black", border: "border-yellow-400", light: "bg-yellow-50" },
};
