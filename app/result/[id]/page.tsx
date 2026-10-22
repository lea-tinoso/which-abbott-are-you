import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Arrow } from "@/components/desk";
import { MenuBar } from "@/components/menu-bar";
import { MatchStamp, ResultActions, RunnersUp } from "@/components/result-extras";
import { characterIds, characters, isCharacterId } from "@/data/characters";

export const dynamicParams = false;

export function generateStaticParams() {
  return characterIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/result/[id]">): Promise<Metadata> {
  const { id } = await params;
  if (!isCharacterId(id)) return {};
  const c = characters[id];
  return {
    title: `i'm ${c.name}! · which abbott are you?`,
    description: `"${c.line}" take the quiz and find your abbott elementary twin.`,
  };
}

// Where the props land around the head, as % of the head box.
const propSpots: CSSProperties[] = [
  { left: "6%", top: "4%", rotate: "-18deg" },
  { right: "8%", top: "0%", rotate: "14deg" },
  { left: "-4%", top: "30%", rotate: "-30deg" },
  { right: "-4%", top: "24%", rotate: "22deg" },
];

export default async function ResultPage({ params }: PageProps<"/result/[id]">) {
  const { id } = await params;
  if (!isCharacterId(id)) notFound();
  const c = characters[id];
  const [first, ...rest] = c.name.toLowerCase().split(" ");

  return (
    <main className="result" style={{ "--field": c.colour, "--name-ink": c.ink } as CSSProperties}>
      <MenuBar file="results.jpg" onDark />

      <div className="result-grid">
        <section className="result-title">
          <p className="mono eyebrow">YOU ARE…</p>
          <h1 className="result-name">
            {first}
            <br />
            {rest.join(" ")}
          </h1>
        </section>

        <section className="result-info">
          <p className="lower-third">{c.role}</p>
          <p className="blurb">{c.blurb}</p>
          <ResultActions id={c.id} name={c.name} />
          <RunnersUp id={c.id} />
        </section>

        <section className="result-art" aria-label={`${c.name} says`}>
          <div className="head-box">
            <span className="sign" aria-hidden>
              {c.sign}
            </span>
            {c.props.map((p, i) => (
              <span key={p} className="prop" style={{ ...propSpots[i], animationDelay: `${0.35 + i * 0.08}s` }} aria-hidden>
                {p}
              </span>
            ))}
            {/* Swap the file in data/characters.ts for a fan-edit cutout. */}
            <img src={c.head} alt={`cartoon cutout of ${c.name}`} className="head" />
            <MatchStamp id={c.id} />
          </div>

          <blockquote className="bubble result-bubble">“{c.line}”</blockquote>

          <div className="thats-you" aria-hidden>
            <Arrow className="thats-arrow" />
            <span className="hand">
              that&apos;s
              <br />
              you!
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
