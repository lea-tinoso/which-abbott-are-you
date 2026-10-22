import { describe, expect, it } from "vitest";
import { characterIds } from "@/data/characters";
import { questions } from "@/data/questions";
import { maxPoints, score } from "./score";

describe("quiz data", () => {
  it("has 10 questions with 4 answers each", () => {
    expect(questions).toHaveLength(10);
    for (const q of questions) expect(q.answers).toHaveLength(4);
  });

  it("never gives an answer the same main and secondary character", () => {
    for (const q of questions) for (const a of q.answers) expect(a.main).not.toBe(a.also);
  });

  it.each(characterIds)("makes %s the main pick on at least 5 answers", (id) => {
    const mains = questions.flatMap((q) => q.answers).filter((a) => a.main === id);
    expect(mains.length).toBeGreaterThanOrEqual(5);
  });

  it.each(characterIds)("lets someone who always picks %s get %s", (id) => {
    const choices = questions.map((q) => {
      const i = q.answers.findIndex((a) => a.main === id);
      return i >= 0 ? i : Math.max(0, q.answers.findIndex((a) => a.also === id));
    });
    expect(score(questions, choices).winner).toBe(id);
  });
});

describe("score", () => {
  it("returns every character with a percentage between 0 and 100", () => {
    const { ranking } = score(questions, questions.map(() => 0));
    expect(ranking.map((m) => m.id).sort()).toEqual([...characterIds].sort());
    for (const m of ranking) {
      expect(m.percent).toBeGreaterThanOrEqual(0);
      expect(m.percent).toBeLessThanOrEqual(100);
    }
  });

  it("ranks the winner first", () => {
    const result = score(questions, questions.map(() => 1));
    expect(result.ranking[0].id).toBe(result.winner);
  });

  it("measures percent against each character's best possible total", () => {
    const choices = questions.map((q) => q.answers.findIndex((a) => a.main === "janine"));
    const janineOnly = choices.map((c) => (c < 0 ? 0 : c));
    const match = score(questions, janineOnly).ranking.find((m) => m.id === "janine")!;
    expect(match.percent).toBe(Math.round((match.points / maxPoints(questions, "janine")) * 100));
  });

  it("rejects an incomplete set of answers", () => {
    expect(() => score(questions, [0, 1])).toThrow();
  });
});
