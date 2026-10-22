import type { Result } from "./score";

// The full breakdown stays in this browser only; shared links carry just the
// character, so nobody's answers leave their device.
const KEY = "which-abbott:last-result";

export function saveResult(result: Result) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(result));
  } catch {
    // Private mode or storage blocked: the result page still works without it.
  }
}

export function loadResult(): Result | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Result) : null;
  } catch {
    return null;
  }
}
