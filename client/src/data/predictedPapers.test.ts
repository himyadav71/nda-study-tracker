import { describe, expect, it } from "vitest";
import { predictedGatPaper, predictedMathPaper } from "./predictedPapers";

describe("NDA II 2026 predicted full papers", () => {
  it("keeps the Mathematics simulation at official-length structure with a valid keyed answer per question", () => {
    expect(predictedMathPaper.questions).toHaveLength(120);
    expect(predictedMathPaper.minutes).toBe(150);
    expect(predictedMathPaper.marks).toBe(300);
    expect(predictedMathPaper.questions.every((question) => question.subject === "Mathematics" && ["A", "B", "C", "D"].includes(question.answer) && question.options.length === 4 && question.options.every((option) => !option.startsWith("Option ")))).toBe(true);
  });

  it("keeps the GAT simulation at 50 English plus 100 GK questions with valid answer keys", () => {
    expect(predictedGatPaper.questions).toHaveLength(150);
    expect(predictedGatPaper.minutes).toBe(150);
    expect(predictedGatPaper.marks).toBe(600);
    expect(predictedGatPaper.questions.filter((question) => question.subject === "English")).toHaveLength(50);
    expect(predictedGatPaper.questions.filter((question) => question.subject === "GAT")).toHaveLength(100);
    expect(predictedGatPaper.questions.every((question) => ["A", "B", "C", "D"].includes(question.answer) && question.options.length === 4 && question.options.every((option) => !option.startsWith("Option ")))).toBe(true);
  });
});
