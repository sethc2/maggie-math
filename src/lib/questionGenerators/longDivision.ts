import type { Question } from "@/types/question";
import type { PointValue, DifficultyLevel } from "@/types/game";
import { getComplexityMultiplier, randomInt } from "./types";

export function generateLongDivision(
  pointValue: PointValue,
  difficulty: DifficultyLevel
): Question {
  const mult = getComplexityMultiplier(pointValue, difficulty);

  // Higher difficulty at higher point values can include remainders
  const useRemainder = pointValue >= 800 && difficulty !== "easy";

  const quotient = randomInt(10, Math.floor(50 * mult));
  const divisor = randomInt(3, Math.floor(12 * Math.sqrt(mult)));
  const remainder = useRemainder ? randomInt(1, divisor - 1) : 0;
  const dividend = quotient * divisor + remainder;

  const answerStr = useRemainder ? `${quotient} R ${remainder}` : String(quotient);

  return {
    id: crypto.randomUUID(),
    categoryId: "long-division",
    pointValue,
    questionText: useRemainder
      ? `What is ${dividend} ÷ ${divisor}? (include remainder)`
      : `What is ${dividend} ÷ ${divisor}?`,
    correctAnswer: answerStr,
    numericAnswer: quotient,
  };
}
