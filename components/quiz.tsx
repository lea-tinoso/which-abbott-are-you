"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Folder, Kaomoji, Sticky, Window } from "@/components/desk";
import { MenuBar } from "@/components/menu-bar";
import { questions } from "@/data/questions";
import { saveResult } from "@/lib/saved-result";
import { score } from "@/lib/score";

const ADVANCE_MS = 380;
const GRADING_MS = 1400;

const faces = ["( ͡° ͜ʖ ͡°)", "(•_•)", "ʕ•ᴥ•ʔ", "(¬‿¬)", "(o_O)", "(ᵔᴥᵔ)", "(⌐■_■)", "(；一_一)", "(ﾉ◕ヮ◕)ﾉ", "(¬_¬ )"];

export function Quiz() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState<number[]>([]);
  const [grading, setGrading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const heading = useRef<HTMLHeadingElement>(null);

  const question = questions[index];
  const picked = choices[index];
  const left = questions.length - index - 1;

  useEffect(() => () => clearTimeout(timer.current), []);

  // Move focus to the new question so keyboard and screen reader users follow along.
  useEffect(() => {
    if (index > 0) heading.current?.focus();
  }, [index]);

  function choose(answer: number) {
    if (grading) return;
    const next = [...choices.slice(0, index), answer];
    setChoices(next);
    clearTimeout(timer.current);

    if (index < questions.length - 1) {
      timer.current = setTimeout(() => setIndex(index + 1), ADVANCE_MS);
      return;
    }

    const result = score(questions, next);
    saveResult(result);
    timer.current = setTimeout(() => {
      setGrading(true);
      timer.current = setTimeout(() => router.push(`/result/${result.winner}`), GRADING_MS);
    }, ADVANCE_MS / 2);
  }

  function back() {
    clearTimeout(timer.current);
    if (index === 0) router.push("/");
    else setIndex(index - 1);
  }

  // Number keys 1–4 pick an answer.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const n = Number(e.key);
      if (n >= 1 && n <= 4 && !e.metaKey && !e.ctrlKey) choose(n - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <main className="desk quiz">
      <MenuBar file="quiz" extra={`${index + 1} / ${questions.length}`} />

      <div className="stage">
        <div
          className="progress"
          role="progressbar"
          aria-label="quiz progress"
          aria-valuemin={1}
          aria-valuemax={questions.length}
          aria-valuenow={index + 1}
        >
          {questions.map((q, i) => (
            <i key={q.file} className={i <= index ? "done" : undefined} />
          ))}
        </div>

        {grading ? (
          <div className="grading" role="status">
            <Window title="grading.exe">
              <div className="grading-body">
                <span className="hand">grading your paper…</span>
                <div className="grading-bar">
                  <i />
                </div>
                <span className="mono small">checking the teachers&apos; lounge</span>
              </div>
            </Window>
          </div>
        ) : (
          <div className="q-wrap" key={index}>
            <Window title={question.file} className="q-window">
              <div className="q-body">
                <div className="wave" aria-hidden>
                  <i /><i /><i /><i /><i /><i />
                  <span className="mono">{question.source}</span>
                </div>
                <h1 ref={heading} tabIndex={-1} className="q-text">
                  {question.text}
                  <span className="cursor" aria-hidden />
                </h1>
              </div>
            </Window>

            <div className="answers" role="group" aria-label="answers">
              {question.answers.map((a, i) => (
                <button
                  key={a.title}
                  type="button"
                  className={`ans${picked === i ? " on" : ""}`}
                  aria-pressed={picked === i}
                  onClick={() => choose(i)}
                >
                  <span className="ico" aria-hidden>
                    {a.icon}
                  </span>
                  <b>{a.title}</b>
                  <span className="detail">{a.detail}</span>
                  {picked === i && (
                    <svg className="pointer" width="26" height="32" viewBox="0 0 26 32" aria-hidden>
                      <path d="M2 2l20 16-9 1 5 10-4 2-5-10-7 6z" fill="#111" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="quiz-scatter">
          {picked !== undefined && !grading && <span className="hand bold-choice">bold choice ↑</span>}
          <Folder label="my_answers" style={{ left: "4%", top: 40 }} />
          <Kaomoji face={faces[index % faces.length]} style={{ left: "34%", top: 80 }} />
          <Sticky className="pink" style={{ right: "6%", top: 70, transform: "rotate(-5deg)" }}>
            tap to
            <br />
            answer
          </Sticky>
        </div>

        <div className="quiz-foot">
          <button type="button" className="pill grey small-pill" onClick={back} disabled={grading}>
            ← back
          </button>
          <span className="mono small">{left === 0 ? "last one!" : `${left} more to go`}</span>
        </div>
      </div>
    </main>
  );
}
