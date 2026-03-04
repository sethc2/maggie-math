import { useGame } from "@/context/GameContext";
import { PlayerScoreCard } from "./PlayerScoreCard";

export function ScoreBoard() {
  const { state } = useGame();

  return (
    <div className="flex flex-wrap justify-center gap-3 p-4">
      {state.players.map((player) => (
        <PlayerScoreCard key={player.id} player={player} />
      ))}
    </div>
  );
}
