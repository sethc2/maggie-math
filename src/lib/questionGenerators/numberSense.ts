import type { Question } from "@/types/question";
import type { PointValue, DifficultyLevel } from "@/types/game";
import { getComplexityMultiplier, randomInt, pickRandom } from "./types";

export function generateRounding(
  pointValue: PointValue,
  difficulty: DifficultyLevel
): Question {
  const mult = getComplexityMultiplier(pointValue, difficulty);

  const roundTos = [10, 100, 1000];
  const roundToIdx = Math.min(roundTos.length - 1, Math.floor(mult / 2));
  const roundTo = roundTos[roundToIdx];

  const maxNum = roundTo * Math.floor(10 * mult);
  const num = randomInt(roundTo, maxNum);
  const answer = Math.round(num / roundTo) * roundTo;

  return {
    id: crypto.randomUUID(),
    categoryId: "rounding",
    pointValue,
    questionText: `Round ${num.toLocaleString()} to the nearest ${roundTo.toLocaleString()}.`,
    correctAnswer: answer.toLocaleString(),
    numericAnswer: answer,
  };
}

export function generateEstimation(
  pointValue: PointValue,
  difficulty: DifficultyLevel
): Question {
  const mult = getComplexityMultiplier(pointValue, difficulty);

  // "About how much is X + Y?" with messy numbers
  const a = randomInt(10, Math.floor(100 * mult));
  const b = randomInt(10, Math.floor(100 * mult));
  const exact = a + b;
  const roundTo = exact > 100 ? 100 : 10;
  const estimated = Math.round(exact / roundTo) * roundTo;

  return {
    id: crypto.randomUUID(),
    categoryId: "estimation",
    pointValue,
    questionText: `Estimate ${a} + ${b} to the nearest ${roundTo}.`,
    correctAnswer: String(estimated),
    numericAnswer: estimated,
  };
}

export function generatePatterns(
  pointValue: PointValue,
  difficulty: DifficultyLevel
): Question {
  const mult = getComplexityMultiplier(pointValue, difficulty);

  const patternType = pickRandom(["add", "multiply", "subtract"] as const);
  let sequence: number[];
  let answer: number;

  if (patternType === "add") {
    const step = randomInt(2, Math.floor(10 * mult));
    const start = randomInt(1, Math.floor(20 * mult));
    sequence = Array.from({ length: 4 }, (_, i) => start + step * i);
    answer = start + step * 4;
  } else if (patternType === "multiply") {
    const factor = randomInt(2, Math.min(5, Math.floor(3 * mult)));
    const start = randomInt(1, 5);
    sequence = Array.from({ length: 4 }, (_, i) => start * Math.pow(factor, i));
    answer = start * Math.pow(factor, 4);
  } else {
    const step = randomInt(2, Math.floor(8 * mult));
    const start = randomInt(Math.floor(50 * mult), Math.floor(100 * mult));
    sequence = Array.from({ length: 4 }, (_, i) => start - step * i);
    answer = start - step * 4;
  }

  return {
    id: crypto.randomUUID(),
    categoryId: "patterns",
    pointValue,
    questionText: `What comes next? ${sequence.join(", ")}, ___`,
    correctAnswer: String(answer),
    numericAnswer: answer,
  };
}

export function generateMissingNumber(
  pointValue: PointValue,
  difficulty: DifficultyLevel
): Question {
  const mult = getComplexityMultiplier(pointValue, difficulty);

  const op = pickRandom(["add", "subtract", "multiply"] as const);

  let a: number, b: number, result: number, questionText: string;

  if (op === "add") {
    a = randomInt(5, Math.floor(50 * mult));
    b = randomInt(5, Math.floor(50 * mult));
    result = a + b;
    questionText = `___ + ${b} = ${result}`;
  } else if (op === "subtract") {
    result = randomInt(5, Math.floor(50 * mult));
    b = randomInt(5, Math.floor(50 * mult));
    a = result + b;
    questionText = `${a} − ___ = ${result}`;
  } else {
    a = randomInt(2, Math.floor(12 * Math.sqrt(mult)));
    b = randomInt(2, Math.floor(12 * Math.sqrt(mult)));
    result = a * b;
    questionText = `___ × ${b} = ${result}`;
  }

  const answer = op === "subtract" ? b : a;

  return {
    id: crypto.randomUUID(),
    categoryId: "missing-number",
    pointValue,
    questionText: `Find the missing number: ${questionText}`,
    correctAnswer: String(answer),
    numericAnswer: answer,
  };
}
