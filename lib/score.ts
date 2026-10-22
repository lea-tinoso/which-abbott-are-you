import { characterIds, type CharacterId } from "@/data/characters";
import type { Question } from "@/data/questions";

export type Match = { id: CharacterId; points: number; percent: number };

export type Result = {
  winner: CharacterId;
  // Every character, best match first.
  ranking: Match[];
};

const MAIN_POINTS = 2;
const ALSO_POINTS = 1;

function pointsFor(question: Question, choice: number, id: CharacterId) {
  const answer = question.answers[choice];
  if (answer.main === id) return MAIN_POINTS;
  if (answer.also === id) return ALSO_POINTS;
  return 0;
}

// The most points a character could collect across the quiz. Percentages are
// measured against this so characters with fewer answers aren't disadvantaged.
export function maxPoints(questions: Question[], id: CharacterId) {
  return questions.reduce(
    (sum, q) => sum + Math.max(...q.answers.map((_, i) => pointsFor(q, i, id))),
    0,
  );
}

// `choices[i]` is the index of the answer picked for `questions[i]`.
export function score(questions: Question[], choices: number[]): Result {
  if (choices.length !== questions.length) {
    throw new Error(`expected ${questions.length} answers, got ${choices.length}`);
  }

  const lastMain = questions.at(-1)!.answers[choices.at(-1)!].main;

  const matches = characterIds.map((id) => {
    let points = 0;
    let mains = 0;
    questions.forEach((q, i) => {
      const p = pointsFor(q, choices[i], id);
      points += p;
      if (p === MAIN_POINTS) mains += 1;
    });
    const ratio = points / maxPoints(questions, id);
    return { id, points, mains, ratio };
  });

  // Ties: higher share of possible points, then the final answer's character,
  // then more main picks, then the order characters are listed in.
  const ranked = [...matches].sort(
    (a, b) =>
      b.ratio - a.ratio ||
      Number(b.id === lastMain) - Number(a.id === lastMain) ||
      b.mains - a.mains ||
      characterIds.indexOf(a.id) - characterIds.indexOf(b.id),
  );

  return {
    winner: ranked[0].id,
    ranking: ranked.map(({ id, points, ratio }) => ({
      id,
      points,
      percent: Math.round(ratio * 100),
    })),
  };
}
