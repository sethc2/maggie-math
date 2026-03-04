import type { Question } from "@/types/question";
import type { PointValue, DifficultyLevel } from "@/types/game";
import { getComplexityMultiplier, randomInt, pickRandom } from "./types";

const ITEMS = [
  "candy bar", "pencil", "notebook", "apple", "juice box",
  "sticker pack", "eraser", "bookmark", "toy car", "bouncy ball",
];

export function generateMoney(
  pointValue: PointValue,
  difficulty: DifficultyLevel
): Question {
  const mult = getComplexityMultiplier(pointValue, difficulty);
  const questionType = pickRandom(["making-change", "total-price"] as const);

  if (questionType === "making-change") {
    // Pay with a bill, get change back
    const itemPrice = randomInt(1, Math.floor(5 * mult)) * 25; // cents, multiples of 25
    const bills = [100, 500, 1000, 2000]; // 1, 5, 10, 20 dollars in cents
    const validBills = bills.filter((b) => b > itemPrice);
    const paidWith = pickRandom(validBills.length > 0 ? validBills : [2000]);
    const change = paidWith - itemPrice;

    const priceStr = `$${(itemPrice / 100).toFixed(2)}`;
    const paidStr = `$${(paidWith / 100).toFixed(2)}`;
    const changeStr = `$${(change / 100).toFixed(2)}`;
    const item = pickRandom(ITEMS);

    return {
      id: crypto.randomUUID(),
      categoryId: "money",
      pointValue,
      questionText: `A ${item} costs ${priceStr}. You pay with ${paidStr}. How much change do you get?`,
      correctAnswer: changeStr,
      numericAnswer: change / 100,
    };
  } else {
    // Add prices together
    const numItems = randomInt(2, Math.min(4, 2 + Math.floor(mult / 2)));
    const items: { name: string; price: number }[] = [];
    const usedNames = new Set<string>();

    for (let i = 0; i < numItems; i++) {
      let name = pickRandom(ITEMS);
      while (usedNames.has(name)) name = pickRandom(ITEMS);
      usedNames.add(name);
      const price = randomInt(1, Math.floor(5 * mult)) * 25;
      items.push({ name, price });
    }

    const total = items.reduce((sum, item) => sum + item.price, 0);
    const itemList = items
      .map((it) => `a ${it.name} for $${(it.price / 100).toFixed(2)}`)
      .join(", ");

    return {
      id: crypto.randomUUID(),
      categoryId: "money",
      pointValue,
      questionText: `You buy ${itemList}. What is the total?`,
      correctAnswer: `$${(total / 100).toFixed(2)}`,
      numericAnswer: total / 100,
    };
  }
}
