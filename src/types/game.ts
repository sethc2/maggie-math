import type { CategoryId, Question } from "./question";
import type { BuzzerState } from "./buzzer";

export type GamePhase = "setup" | "board" | "question" | "answer" | "gameOver";

export type DifficultyLevel = "easy" | "medium" | "hard";

export type PresentationMode = "host" | "display";

export type PlayerColor =
  | "red"
  | "blue"
  | "green"
  | "orange"
  | "purple"
  | "pink"
  | "teal"
  | "yellow";

export const PLAYER_COLORS: PlayerColor[] = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
  "teal",
  "yellow",
];

export const POINT_VALUES = [200, 400, 600, 800, 1000] as const;
export type PointValue = (typeof POINT_VALUES)[number];

export interface Player {
  id: string;
  name: string;
  score: number;
  color: PlayerColor;
}

export interface BoardCell {
  categoryId: CategoryId;
  pointValue: PointValue;
  question: Question;
  isRevealed: boolean;
  colIndex: number;
  rowIndex: number;
}

export type Board = BoardCell[][];

export interface GameState {
  phase: GamePhase;
  players: Player[];
  board: Board;
  categories: CategoryId[];
  difficulty: DifficultyLevel;
  currentCell: BoardCell | null;
  buzzerState: BuzzerState;
  revealedCount: number;
  totalCells: number;
  timerDeadline: number | null;
  timerPhase: "thinking" | "answering" | null;
}
