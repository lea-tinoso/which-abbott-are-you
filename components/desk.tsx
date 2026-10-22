// Desktop props for the "messy mac desktop" look. All decorative.
import type { CSSProperties, ReactNode } from "react";

type Placed = { style?: CSSProperties; className?: string };

export function Folder({ label, note, style }: Placed & { label: string; note?: string }) {
  return (
    <div className="folder" style={style} aria-hidden>
      <svg viewBox="0 0 54 44">
        <path d="M2 8a4 4 0 0 1 4-4h14l5 5h23a4 4 0 0 1 4 4v25a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" fill="#5aa9f7" />
        <path d="M2 15h50v23a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" fill="#7cc0ff" />
      </svg>
      {label}
      {note && <span>{note}</span>}
    </div>
  );
}

export function Window({
  title,
  children,
  style,
  className = "",
  decorative,
}: Placed & { title: string; children: ReactNode; decorative?: boolean }) {
  return (
    <div className={`win ${className}`} style={style} aria-hidden={decorative || undefined}>
      <div className="win-bar">
        <span className="lights" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="win-title">{title}</span>
      </div>
      {children}
    </div>
  );
}

export function Sticky({ children, style, className = "" }: Placed & { children: ReactNode }) {
  return (
    <div className={`sticky ${className}`} style={style} aria-hidden>
      {children}
    </div>
  );
}

export function NameTag({ name, style }: Placed & { name: string }) {
  return (
    <div className="nametag" style={style} aria-hidden>
      HELLO
      <small>my name is</small>
      <div>{name}</div>
    </div>
  );
}

export function Kaomoji({ face, style }: Placed & { face: string }) {
  return (
    <span className="kao" style={style} aria-hidden>
      {face}
    </span>
  );
}

export function Trash({ style }: Placed) {
  return (
    <svg className="trash" style={style} width="56" height="56" viewBox="0 0 56 56" aria-hidden>
      <path d="M8 12h40l-4 40H12z" fill="#cfd4da" stroke="#111" strokeWidth="2.5" />
      <rect x="4" y="6" width="48" height="8" rx="2" fill="#e8ebee" stroke="#111" strokeWidth="2.5" />
      <path d="M20 20v24M28 20v24M36 20v24" stroke="#111" strokeWidth="2" />
    </svg>
  );
}

export function Arrow({ style, className = "" }: Placed) {
  return (
    <svg className={className} style={style} width="80" height="60" viewBox="0 0 80 60" aria-hidden>
      <path d="M8 54 Q12 18 66 10" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M52 4 L68 10 L56 22" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
