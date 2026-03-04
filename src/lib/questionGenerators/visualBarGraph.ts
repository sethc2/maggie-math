import type { Question, BarGraphData, BarGraphBar } from "@/types/question";
import type { PointValue, DifficultyLevel } from "@/types/game";
import { getComplexityMultiplier, randomInt, pickRandom } from "./types";

const GRAPH_THEMES = [
  { title: "Favorite Fruits in Class", labels: ["Apples", "Bananas", "Grapes", "Oranges", "Strawberries"] },
  { title: "Books Read This Month", labels: ["Emma", "Jack", "Mia", "Noah", "Sophia"] },
  { title: "Goals Scored This Season", labels: ["Lions", "Tigers", "Bears", "Eagles", "Wolves"] },
  { title: "Pets Owned by Students", labels: ["Dogs", "Cats", "Fish", "Birds", "Hamsters"] },
  { title: "Favorite Colors in Class", labels: ["Red", "Blue", "Green", "Purple", "Yellow"] },
  { title: "Points Earned This Week", labels: ["Team A", "Team B", "Team C", "Team D", "Team E"] },
];

const BAR_COLORS = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-amber-400",
  "bg-purple-400",
];

type QuestionBuilder = (bars: BarGraphBar[]) => { text: string; answer: number };

const QUESTION_BUILDERS: QuestionBuilder[] = [
  // How many does X have?
  (bars) => {
    const bar = pickRandom(bars);
    return { text: `How many does "${bar.label}" have?`, answer: bar.value };
  },
  // How many more does X have than Y?
  (bars) => {
    const [a, b] = pickTwoDifferent(bars);
    const bigger = a.value >= b.value ? a : b;
    const smaller = a.value >= b.value ? b : a;
    return {
      text: `How many more does "${bigger.label}" have than "${smaller.label}"?`,
      answer: bigger.value - smaller.value,
    };
  },
  // What is the total?
  (bars) => {
    const total = bars.reduce((sum, b) => sum + b.value, 0);
    return { text: `What is the total of all the bars?`, answer: total };
  },
  // Combined total of two
  (bars) => {
    const [a, b] = pickTwoDifferent(bars);
    return {
      text: `What is the combined total of "${a.label}" and "${b.label}"?`,
      answer: a.value + b.value,
    };
  },
];

function pickTwoDifferent(bars: BarGraphBar[]): [BarGraphBar, BarGraphBar] {
  const i = randomInt(0, bars.length - 1);
  let j = randomInt(0, bars.length - 2);
  if (j >= i) j++;
  return [bars[i], bars[j]];
}

export function generateBarGraph(
  pointValue: PointValue,
  difficulty: DifficultyLevel
): Question {
  const mult = getComplexityMultiplier(pointValue, difficulty);
  const theme = pickRandom(GRAPH_THEMES);
  const numBars = randomInt(3, Math.min(5, 3 + Math.floor(mult / 2)));

  const bars: BarGraphBar[] = theme.labels.slice(0, numBars).map((label, i) => ({
    label,
    value: randomInt(1, Math.floor(15 * mult)),
    color: BAR_COLORS[i % BAR_COLORS.length],
  }));

  const builder = pickRandom(QUESTION_BUILDERS);
  const { text, answer } = builder(bars);

  const visual: BarGraphData = {
    title: theme.title,
    bars,
    yAxisLabel: "Count",
  };

  return {
    id: crypto.randomUUID(),
    categoryId: "bar-graph",
    pointValue,
    questionText: text,
    correctAnswer: String(answer),
    numericAnswer: answer,
    visual,
  };
}
