import type { GameState, DifficultyLevel, Player } from "@/types/game";
import { PLAYER_COLORS } from "@/types/game";
import { initialBuzzerState } from "@/types/buzzer";
import { generateBoard } from "@/lib/gameEngine";

export type GameAction =
  | { type: "ADD_PLAYER"; name: string }
  | { type: "REMOVE_PLAYER"; playerId: string }
  | { type: "UPDATE_PLAYER_NAME"; playerId: string; name: string }
  | { type: "SET_DIFFICULTY"; difficulty: DifficultyLevel }
  | { type: "START_GAME" }
  | { type: "SELECT_CELL"; colIndex: number; rowIndex: number }
  | { type: "BUZZ_IN"; playerId: string; timestamp: number }
  | { type: "JUDGE_CORRECT" }
  | { type: "JUDGE_INCORRECT" }
  | { type: "RETURN_TO_BOARD" }
  | { type: "NO_MORE_BUZZERS" }
  | { type: "END_GAME_EARLY" }
  | { type: "PLAY_AGAIN" };

export const initialGameState: GameState = {
  phase: "setup",
  players: [
    { id: crypto.randomUUID(), name: "Player 1", score: 0, color: PLAYER_COLORS[0] },
    { id: crypto.randomUUID(), name: "Player 2", score: 0, color: PLAYER_COLORS[1] },
  ],
  board: [],
  categories: [],
  difficulty: "medium",
  currentCell: null,
  buzzerState: initialBuzzerState,
  revealedCount: 0,
  totalCells: 30,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "ADD_PLAYER": {
      if (state.players.length >= 8) return state;
      const newPlayer: Player = {
        id: crypto.randomUUID(),
        name: action.name,
        score: 0,
        color: PLAYER_COLORS[state.players.length],
      };
      return { ...state, players: [...state.players, newPlayer] };
    }

    case "REMOVE_PLAYER": {
      if (state.players.length <= 2) return state;
      const filtered = state.players.filter((p) => p.id !== action.playerId);
      const recolored = filtered.map((p, i) => ({ ...p, color: PLAYER_COLORS[i] }));
      return { ...state, players: recolored };
    }

    case "UPDATE_PLAYER_NAME": {
      return {
        ...state,
        players: state.players.map((p) =>
          p.id === action.playerId ? { ...p, name: action.name } : p
        ),
      };
    }

    case "SET_DIFFICULTY": {
      return { ...state, difficulty: action.difficulty };
    }

    case "START_GAME": {
      const { board, categories } = generateBoard(state.difficulty);
      return {
        ...state,
        phase: "board",
        board,
        categories,
        revealedCount: 0,
        players: state.players.map((p) => ({ ...p, score: 0 })),
      };
    }

    case "SELECT_CELL": {
      const cell = state.board[action.colIndex][action.rowIndex];
      if (cell.isRevealed) return state;
      return {
        ...state,
        phase: "question",
        currentCell: cell,
        buzzerState: {
          isActive: true,
          buzzEvents: [],
          firstBuzzPlayerId: null,
          lockedOutPlayerIds: [],
        },
      };
    }

    case "BUZZ_IN": {
      if (!state.buzzerState.isActive) return state;
      if (state.buzzerState.firstBuzzPlayerId) return state;
      if (state.buzzerState.lockedOutPlayerIds.includes(action.playerId)) return state;
      return {
        ...state,
        buzzerState: {
          ...state.buzzerState,
          isActive: false,
          firstBuzzPlayerId: action.playerId,
          buzzEvents: [
            ...state.buzzerState.buzzEvents,
            { playerId: action.playerId, timestamp: action.timestamp },
          ],
        },
      };
    }

    case "JUDGE_CORRECT": {
      if (!state.currentCell || !state.buzzerState.firstBuzzPlayerId) return state;
      const pointValue = state.currentCell.pointValue;
      const buzzPlayerId = state.buzzerState.firstBuzzPlayerId;
      return {
        ...state,
        phase: "answer",
        players: state.players.map((p) =>
          p.id === buzzPlayerId ? { ...p, score: p.score + pointValue } : p
        ),
        buzzerState: { ...state.buzzerState, isActive: false },
      };
    }

    case "JUDGE_INCORRECT": {
      if (!state.currentCell || !state.buzzerState.firstBuzzPlayerId) return state;
      const pointVal = state.currentCell.pointValue;
      const wrongPlayerId = state.buzzerState.firstBuzzPlayerId;
      const newLockedOut = [...state.buzzerState.lockedOutPlayerIds, wrongPlayerId];
      const allLockedOut = state.players.every((p) => newLockedOut.includes(p.id));

      return {
        ...state,
        phase: allLockedOut ? "answer" : "question",
        players: state.players.map((p) =>
          p.id === wrongPlayerId ? { ...p, score: p.score - pointVal } : p
        ),
        buzzerState: {
          ...state.buzzerState,
          isActive: !allLockedOut,
          firstBuzzPlayerId: null,
          lockedOutPlayerIds: newLockedOut,
        },
      };
    }

    case "NO_MORE_BUZZERS": {
      return {
        ...state,
        phase: "answer",
        buzzerState: { ...state.buzzerState, isActive: false },
      };
    }

    case "RETURN_TO_BOARD": {
      if (!state.currentCell) return state;
      const { colIndex, rowIndex } = state.currentCell;
      const newBoard = state.board.map((col, ci) =>
        col.map((cell, ri) =>
          ci === colIndex && ri === rowIndex ? { ...cell, isRevealed: true } : cell
        )
      );
      const newRevealedCount = state.revealedCount + 1;
      const isGameOver = newRevealedCount >= state.totalCells;
      return {
        ...state,
        phase: isGameOver ? "gameOver" : "board",
        board: newBoard,
        currentCell: null,
        buzzerState: initialBuzzerState,
        revealedCount: newRevealedCount,
      };
    }

    case "END_GAME_EARLY": {
      return { ...state, phase: "gameOver" };
    }

    case "PLAY_AGAIN": {
      return {
        ...initialGameState,
        players: state.players.map((p, i) => ({
          ...p,
          score: 0,
          color: PLAYER_COLORS[i],
        })),
        difficulty: state.difficulty,
      };
    }

    default:
      return state;
  }
}
