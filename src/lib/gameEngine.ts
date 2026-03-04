import type { DifficultyLevel } from "@/types/game";
import { POINT_VALUES, type Board } from "@/types/game";
import type { CategoryId } from "@/types/question";
import { ALL_CATEGORIES } from "@/types/question";
import { questionGenerators } from "./questionGenerators";

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateBoard(difficulty: DifficultyLevel): {
  board: Board;
  categories: CategoryId[];
} {
  // Pick 6 random categories
  const shuffled = shuffle(ALL_CATEGORIES);
  const selectedCategories = shuffled.slice(0, 6);
  const categoryIds = selectedCategories.map((c) => c.id);

  // Generate the board: 6 columns (categories) x 5 rows (point values)
  const board: Board = categoryIds.map((catId, colIndex) => {
    const generator = questionGenerators[catId];
    return POINT_VALUES.map((pv, rowIndex) => ({
      categoryId: catId,
      pointValue: pv,
      question: generator(pv, difficulty),
      isRevealed: false,
      colIndex,
      rowIndex,
    }));
  });

  return { board, categories: categoryIds };
}
