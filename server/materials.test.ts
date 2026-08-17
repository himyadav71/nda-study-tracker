import { describe, expect, it } from "vitest";
import { isValidStudyFile, safeStudyFileName } from "./materials";

describe("study material guardrails", () => {
  it("normalizes a learner-friendly storage file name", () => {
    expect(safeStudyFileName("  Physics Ray Optics #1!.pdf ")).toBe("Physics-Ray-Optics-1.pdf");
  });

  it("allows supported study files but rejects unsupported executable uploads", () => {
    expect(isValidStudyFile("revision-notes.pdf", "application/pdf")).toBe(true);
    expect(isValidStudyFile("formula-sheet.png", "image/png")).toBe(true);
    expect(isValidStudyFile("answer.exe", "application/x-msdownload")).toBe(false);
  });
});
