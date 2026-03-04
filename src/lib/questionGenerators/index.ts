import type { CategoryId, QuestionGenerator } from "@/types/question";
import { generateAddition, generateSubtraction, generateMultiplication, generateDivision } from "./arithmetic";
import { generateLongDivision } from "./longDivision";
import { generateTwoDigitMultiplication } from "./twoDigitMultiplication";
import { generateWeightConversion, generateLengthConversion, generateVolumeConversion, generateTimeConversion } from "./measurement";
import { generateMoney } from "./money";
import { generateBarGraph } from "./visualBarGraph";
import { generateRounding, generateEstimation, generatePatterns, generateMissingNumber } from "./numberSense";

export const questionGenerators: Record<CategoryId, QuestionGenerator> = {
  addition: generateAddition,
  subtraction: generateSubtraction,
  multiplication: generateMultiplication,
  division: generateDivision,
  "long-division": generateLongDivision,
  "two-digit-multiplication": generateTwoDigitMultiplication,
  "weight-conversion": generateWeightConversion,
  "length-conversion": generateLengthConversion,
  "volume-conversion": generateVolumeConversion,
  "time-conversion": generateTimeConversion,
  money: generateMoney,
  "bar-graph": generateBarGraph,
  rounding: generateRounding,
  estimation: generateEstimation,
  patterns: generatePatterns,
  "missing-number": generateMissingNumber,
};
