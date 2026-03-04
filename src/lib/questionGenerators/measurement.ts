import type { Question } from "@/types/question";
import type { CategoryId } from "@/types/question";
import type { PointValue, DifficultyLevel } from "@/types/game";
import { getComplexityMultiplier, randomInt, pickRandom } from "./types";

interface ConversionFact {
  fromUnit: string;
  toUnit: string;
  factor: number;
}

const WEIGHT_FACTS: ConversionFact[] = [
  { fromUnit: "pounds", toUnit: "ounces", factor: 16 },
  { fromUnit: "kilograms", toUnit: "grams", factor: 1000 },
  { fromUnit: "tons", toUnit: "pounds", factor: 2000 },
];

const LENGTH_FACTS: ConversionFact[] = [
  { fromUnit: "feet", toUnit: "inches", factor: 12 },
  { fromUnit: "yards", toUnit: "feet", factor: 3 },
  { fromUnit: "meters", toUnit: "centimeters", factor: 100 },
  { fromUnit: "miles", toUnit: "feet", factor: 5280 },
];

const VOLUME_FACTS: ConversionFact[] = [
  { fromUnit: "gallons", toUnit: "quarts", factor: 4 },
  { fromUnit: "quarts", toUnit: "pints", factor: 2 },
  { fromUnit: "pints", toUnit: "cups", factor: 2 },
  { fromUnit: "gallons", toUnit: "cups", factor: 16 },
  { fromUnit: "liters", toUnit: "milliliters", factor: 1000 },
];

const TIME_FACTS: ConversionFact[] = [
  { fromUnit: "hours", toUnit: "minutes", factor: 60 },
  { fromUnit: "minutes", toUnit: "seconds", factor: 60 },
  { fromUnit: "days", toUnit: "hours", factor: 24 },
  { fromUnit: "weeks", toUnit: "days", factor: 7 },
];

function generateConversion(
  categoryId: CategoryId,
  facts: ConversionFact[],
  pointValue: PointValue,
  difficulty: DifficultyLevel
): Question {
  const mult = getComplexityMultiplier(pointValue, difficulty);
  const fact = pickRandom(facts);

  // Keep source values reasonable for mental math
  const maxSource = Math.max(2, Math.floor(10 * Math.sqrt(mult)));
  const sourceValue = randomInt(1, maxSource);
  const answer = sourceValue * fact.factor;

  return {
    id: crypto.randomUUID(),
    categoryId,
    pointValue,
    questionText: `How many ${fact.toUnit} are in ${sourceValue} ${sourceValue === 1 ? fact.fromUnit.replace(/s$/, "") : fact.fromUnit}?`,
    correctAnswer: String(answer),
    numericAnswer: answer,
  };
}

export function generateWeightConversion(pv: PointValue, d: DifficultyLevel): Question {
  return generateConversion("weight-conversion", WEIGHT_FACTS, pv, d);
}

export function generateLengthConversion(pv: PointValue, d: DifficultyLevel): Question {
  return generateConversion("length-conversion", LENGTH_FACTS, pv, d);
}

export function generateVolumeConversion(pv: PointValue, d: DifficultyLevel): Question {
  return generateConversion("volume-conversion", VOLUME_FACTS, pv, d);
}

export function generateTimeConversion(pv: PointValue, d: DifficultyLevel): Question {
  return generateConversion("time-conversion", TIME_FACTS, pv, d);
}
