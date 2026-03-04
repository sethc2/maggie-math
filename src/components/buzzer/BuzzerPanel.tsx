import { useGame } from "@/context/GameContext";
import { BuzzerButton } from "./BuzzerButton";

export function BuzzerPanel() {
  const { state, dispatch } = useGame();
  const { buzzerState } = state;

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {state.players.map((player) => (
        <BuzzerButton
          key={player.id}
          player={player}
          onBuzz={() =>
            dispatch({
              type: "BUZZ_IN",
              playerId: player.id,
              timestamp: performance.now(),
            })
          }
          isLockedOut={buzzerState.lockedOutPlayerIds.includes(player.id)}
          isDisabled={!buzzerState.isActive || !!buzzerState.firstBuzzPlayerId}
        />
      ))}
    </div>
  );
}
