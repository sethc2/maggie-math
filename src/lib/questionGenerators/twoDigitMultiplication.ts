import type { Question } from "@/types/question";
import type { PointValue, DifficultyLevel } from "@/types/game";
import { getComplexityMultiplier, randomInt } from "./types";

export function generateTwoDigitMultiplication(
  pointValue: PointValue,
  difficulty: DifficultyLevel
): Question {
  const mult = getComplexityMultiplier(pointValue, difficulty);

  // Keep numbers in 2-digit range but scale max with difficulty
  const minVal = 10;
  const maxVal = Math.min(99, Math.floor(20 + 15 * mult));

  const a = randomInt(minVal, maxVal);
  const b = randomInt(minVal, maxVal);
  const answer = a * b;

  return {
    id: crypto.randomUUID(),
    categoryId: "two-digit-multiplication",
    pointValue,
    questionText: `What is ${a} × ${b}?`,
    correctAnswer: String(answer),
    numericAnswer: answer,
  };
}
