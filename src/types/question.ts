import type { DifficultyLevel, PointValue } from "./game";

export type CategoryId =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division"
  | "long-division"
  | "two-digit-multiplication"
  | "weight-conversion"
  | "length-conversion"
  | "volume-conversion"
  | "time-conversion"
  | "money"
  | "bar-graph"
  | "rounding"
  | "estimation"
  | "patterns"
  | "missing-number";

export interface CategoryMeta {
  id: CategoryId;
  displayName: string;
  icon: string;
}

export const ALL_CATEGORIES: CategoryMeta[] = [
  { id: "addition", displayName: "Addition", icon: "+" },
  { id: "subtraction", displayName: "Subtraction", icon: "−" },
  { id: "multiplication", displayName: "Multiplication", icon: "×" },
  { id: "division", displayName: "Division", icon: "÷" },
  { id: "long-division", displayName: "Long Division", icon: "➗" },
  { id: "two-digit-multiplication", displayName: "2-Digit Multiply", icon: "✖" },
  { id: "weight-conversion", displayName: "Weight", icon: "⚖" },
  { id: "length-conversion", displayName: "Length", icon: "📏" },
  { id: "volume-conversion", displayName: "Volume", icon: "🥛" },
  { id: "time-conversion", displayName: "Time", icon: "⏰" },
  { id: "money", displayName: "Money", icon: "💰" },
  { id: "bar-graph", displayName: "Bar Graphs", icon: "📊" },
  { id: "rounding", displayName: "Rounding", icon: "🔄" },
  { id: "estimation", displayName: "Estimation", icon: "🤔" },
  { id: "patterns", displayName: "Patterns", icon: "🔢" },
  { id: "missing-number", displayName: "Missing Number", icon: "❓" },
];

export interface BarGraphBar {
  label: string;
  value: number;
  color: string;
}

export interface BarGraphData {
  title: string;
  bars: BarGraphBar[];
  yAxisLabel: string;
}

export interface Question {
  id: string;
  categoryId: CategoryId;
  pointValue: PointValue;
  questionText: string;
  correctAnswer: string;
  numericAnswer: number;
  visual?: BarGraphData;
}

export type QuestionGenerator = (
  pointValue: PointValue,
  difficulty: DifficultyLevel
) => Question;
