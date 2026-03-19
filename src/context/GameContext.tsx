import { createContext, useContext, useReducer, useEffect, useRef, type ReactNode } from "react";
import type { GameState, PresentationMode } from "@/types/game";
import { gameReducer, initialGameState, type GameAction } from "./gameReducer";

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  mode: PresentationMode;
}

const GameContext = createContext<GameContextValue | null>(null);

function getMode(): PresentationMode {
  const params = new URLSearchParams(window.location.search);
  return params.get("mode") === "display" ? "display" : "host";
}

const CHANNEL_NAME = "maggie-math-sync";

export function GameProvider({ children }: { children: ReactNode }) {
  const mode = getMode();
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const stateRef = useRef(state);
  stateRef.current = state;
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;

    channel.onmessage = (event) => {
      const msg = event.data;
      if (mode === "display" && msg.type === "STATE_SYNC") {
        dispatch({ type: "SET_STATE", state: msg.state });
      }
      if (mode === "host" && msg.type === "REQUEST_STATE") {
        channel.postMessage({ type: "STATE_SYNC", state: stateRef.current });
      }
    };

    if (mode === "display") {
      channel.postMessage({ type: "REQUEST_STATE" });
    }

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, [mode]);

  // Host broadcasts state changes to display window(s)
  useEffect(() => {
    if (mode === "host" && channelRef.current) {
      channelRef.current.postMessage({ type: "STATE_SYNC", state });
    }
  }, [mode, state]);

  // Host auto-dispatches when timer expires
  useEffect(() => {
    if (mode !== "host" || !state.timerDeadline) return;

    const ms = state.timerDeadline - Date.now();
    if (ms <= 0) {
      dispatch({ type: "TIMER_EXPIRED" });
      return;
    }

    const timeout = setTimeout(() => {
      dispatch({ type: "TIMER_EXPIRED" });
    }, ms);

    return () => clearTimeout(timeout);
  }, [mode, state.timerDeadline]);

  return (
    <GameContext.Provider value={{ state, dispatch, mode }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
