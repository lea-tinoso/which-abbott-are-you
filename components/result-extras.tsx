"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Window } from "@/components/desk";
import { characters, type CharacterId } from "@/data/characters";
import { loadResult } from "@/lib/saved-result";
import type { Result } from "@/lib/score";

// Only the person who took the quiz has a saved breakdown; anyone opening a
// shared link sees the character without percentages.
function useOwnResult(id: CharacterId) {
  const [result, setResult] = useState<Result | null>(null);
  useEffect(() => {
    const saved = loadResult();
    if (saved?.winner === id) setResult(saved);
  }, [id]);
  return result;
}

export function MatchStamp({ id }: { id: CharacterId }) {
  const result = useOwnResult(id);
  if (!result) return null;
  return (
    <div className="stamp">
      <b>{result.ranking[0].percent}%</b>
      <span>match</span>
    </div>
  );
}

export function RunnersUp({ id }: { id: CharacterId }) {
  const result = useOwnResult(id);
  if (!result) return null;
  const rows = result.ranking.slice(1, 4);
  return (
    <Window title="also_in_your_lounge.txt" className="runners">
      <ul>
        {rows.map((m) => (
          <li key={m.id}>
            <span>{characters[m.id].name.toLowerCase()}</span>
            <i style={{ "--w": `${m.percent}%`, "--c": characters[m.id].colour } as React.CSSProperties} />
            <span className="mono">{m.percent}%</span>
          </li>
        ))}
      </ul>
    </Window>
  );
}

export function ResultActions({ id, name }: { id: CharacterId; name: string }) {
  const [copied, setCopied] = useState(false);
  const own = useOwnResult(id);

  async function share() {
    const url = `${location.origin}/result/${id}`;
    const text = `i got ${name}! which abbott are you?`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "which abbott are you?", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // The person closed the share sheet; nothing to do.
    }
  }

  return (
    <div className="row result-actions">
      {own ? (
        <>
          <button type="button" className="pill yellow" onClick={share}>
            {copied ? "link copied!" : "share my result"}
          </button>
          <Link href="/quiz" className="pill grey">
            retake
          </Link>
        </>
      ) : (
        <Link href="/quiz" className="pill yellow">
          take the quiz
        </Link>
      )}
    </div>
  );
}
