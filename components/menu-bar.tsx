"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function now() {
  return new Date()
    .toLocaleString("en-US", { weekday: "short", hour: "numeric", minute: "2-digit" })
    .toLowerCase()
    .replace(",", "");
}

// A fake mac menu bar with a live clock. The clock renders after mount so the
// server and browser agree on the first paint.
export function MenuBar({ file, extra, onDark }: { file?: string; extra?: string; onDark?: boolean }) {
  const [time, setTime] = useState("mon 8:15 am");

  useEffect(() => {
    setTime(now());
    const id = setInterval(() => setTime(now()), 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className={`menubar${onDark ? " on-dark" : ""}`}>
      <nav className="menubar-l">
        <Link href="/" className="brand">
          abbott os
        </Link>
        {file ? <span>{file}</span> : <Link href="/quiz">quiz</Link>}
      </nav>
      <div className="menubar-r">
        {extra && <span className="mono">{extra}</span>}
        <span suppressHydrationWarning>{time}</span>
        <span className="batt" aria-hidden />
      </div>
    </header>
  );
}
