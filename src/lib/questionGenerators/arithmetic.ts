import type { Question } from "@/types/question";
import type { PointValue, DifficultyLevel } from "@/types/game";
import { getComplexityMultiplier, randomInt } from "./types";

export function generateAddition(
  pointValue: PointValue,
  difficulty: DifficultyLevel
): Question {
  const mult = getComplexityMultiplier(pointValue, difficulty);
  const max = Math.floor(50 * mult);
  const a = randomInt(10, max);
  const b = randomInt(10, max);
  const answer = a + b;

  return {
    id: crypto.randomUUID(),
    categoryId: "addition",
    pointValue,
    questionText: `What is ${a} + ${b}?`,
    correctAnswer: String(answer),
    numericAnswer: answer,
  };
}

export function generateSubtraction(
  pointValue: PointValue,
  difficulty: DifficultyLevel
): Question {
  const mult = getComplexityMultiplier(pointValue, difficulty);
  const max = Math.floor(50 * mult);
  // Ensure a >= b so answer is non-negative
  let a = randomInt(10, max);
  let b = randomInt(5, max);
  if (b > a) [a, b] = [b, a];
  const answer = a - b;

  return {
    id: crypto.randomUUID(),
    categoryId: "subtraction",
    pointValue,
    questionText: `What is ${a} − ${b}?`,
    correctAnswer: String(answer),
    numericAnswer: answer,
  };
}

export function generateMultiplication(
  pointValue: PointValue,
  difficulty: DifficultyLevel
): Question {
  const mult = getComplexityMultiplier(pointValue, difficulty);
  const a = randomInt(2, Math.floor(12 * Math.sqrt(mult)));
  const b = randomInt(2, Math.floor(12 * Math.sqrt(mult)));
  const answer = a * b;

  return {
    id: crypto.randomUUID(),
    categoryId: "multiplication",
    pointValue,
    questionText: `What is ${a} × ${b}?`,
    correctAnswer: String(answer),
    numericAnswer: answer,
  };
}

export function generateDivision(
  pointValue: PointValue,
  difficulty: DifficultyLevel
): Question {
  const mult = getComplexityMultiplier(pointValue, difficulty);
  // Answer-first: generate answer and divisor, multiply to get dividend
  const answer = randomInt(2, Math.floor(12 * mult));
  const divisor = randomInt(2, Math.floor(9 * Math.sqrt(mult)));
  const dividend = answer * divisor;

  return {
    id: crypto.randomUUID(),
    categoryId: "division",
    pointValue,
    questionText: `What is ${dividend} ÷ ${divisor}?`,
    correctAnswer: String(answer),
    numericAnswer: answer,
  };
}
