import type { PointValue, DifficultyLevel } from "@/types/game";

export function getComplexityMultiplier(
  pointValue: PointValue,
  difficulty: DifficultyLevel
): number {
  const pointMultiplier: Record<PointValue, number> = {
    200: 1,
    400: 1.5,
    600: 2,
    800: 3,
    1000: 4,
  };
  const diffMultiplier: Record<DifficultyLevel, number> = {
    easy: 0.7,
    medium: 1,
    hard: 1.5,
  };
  return pointMultiplier[pointValue] * diffMultiplier[difficulty];
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pickRandom<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}
