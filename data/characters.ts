// The 7 possible results. Swap `head` for a fan-edit PNG in /public/heads
// (transparent background) and the result card picks it up as is.
// `line` values are placeholders in each character's voice, not exact quotes.

export const characterIds = [
  "janine",
  "gregory",
  "barbara",
  "melissa",
  "ava",
  "jacob",
  "johnson",
] as const;

export type CharacterId = (typeof characterIds)[number];

export type Character = {
  id: CharacterId;
  name: string;
  role: string;
  line: string;
  // Short sign that bursts out of the torn head.
  sign: string;
  blurb: string;
  head: string;
  // Background of the result screen; `ink` is the colour of the big name on it.
  colour: string;
  ink: string;
  props: string[];
};

export const characters: Record<CharacterId, Character> = {
  janine: {
    id: "janine",
    name: "Janine Teagues",
    role: "2nd grade teacher · professional fixer",
    line: "it's fine. i can fix this. i can fix all of this!",
    sign: "i got this!!",
    blurb:
      "you see a problem and you're already holding a stapler. sometimes it works, sometimes there's a fire drill. either way, abbott is better with you in it.",
    head: "/heads/janine.svg",
    colour: "#2f7fe8",
    ink: "#ffe45c",
    props: ["⭐", "☕", "✏️", "📎"],
  },
  gregory: {
    id: "gregory",
    name: "Gregory Eddie",
    role: "1st grade teacher · master of the side-eye",
    line: "i'm going to need a minute. and maybe a plant.",
    sign: "no.",
    blurb:
      "calm, structured and quietly hilarious. you say more with one look at the camera than most people say all day, and your classroom runs like clockwork.",
    head: "/heads/gregory.svg",
    colour: "#1f8f5f",
    ink: "#d9ff6b",
    props: ["🪴", "📐", "⏰", "🍞"],
  },
  barbara: {
    id: "barbara",
    name: "Barbara Howard",
    role: "kindergarten teacher · the standard",
    line: "i have been doing this since before you were born, baby.",
    sign: "not today",
    blurb:
      "wise, warm and absolutely not to be tested. people come to you for advice, and they leave with advice plus a gentle reminder to fix their posture.",
    head: "/heads/barbara.svg",
    colour: "#6f45d4",
    ink: "#ffd6f2",
    props: ["📖", "🍬", "🎶", "🍎"],
  },
  melissa: {
    id: "melissa",
    name: "Melissa Schemmenti",
    role: "2nd grade teacher · knows a guy",
    line: "relax. i know a guy.",
    sign: "handled.",
    blurb:
      "tough on the outside, fiercely loyal on the inside. whatever the school needs, you can get it by friday, and nobody needs to know how.",
    head: "/heads/melissa.svg",
    colour: "#e5484d",
    ink: "#fff1c9",
    props: ["📞", "🍝", "🍷", "💅"],
  },
  ava: {
    id: "ava",
    name: "Ava Coleman",
    role: "principal · main character",
    line: "the district called. i let it go to voicemail.",
    sign: "#bossmoves",
    blurb:
      "confident, chaotic and somehow always landing on your feet. you have big ideas, bigger sunglasses and a follower count that the school board should frankly respect.",
    head: "/heads/ava.svg",
    colour: "#f24fd0",
    ink: "#ffffff",
    props: ["🕶️", "📱", "💸", "👑"],
  },
  jacob: {
    id: "jacob",
    name: "Jacob Hill",
    role: "history teacher · has read the article",
    line: "fun fact! actually, i have eleven fun facts.",
    sign: "citation needed",
    blurb:
      "earnest, curious and always over-prepared. you care about doing the right thing so much that you made a slideshow about it, with sources.",
    head: "/heads/jacob.svg",
    colour: "#f28c28",
    ink: "#1d1d1d",
    props: ["📚", "🧃", "🗺️", "💡"],
  },
  johnson: {
    id: "johnson",
    name: "Mr. Johnson",
    role: "custodian · unverified legend",
    line: "back in '84 i fixed a boiler with a shoelace.",
    sign: "don't ask",
    blurb:
      "you have seen everything, fixed everything and have a story about all of it. nobody can confirm a single one, and nobody dares to ask.",
    head: "/heads/johnson.svg",
    colour: "#0f9aa0",
    ink: "#ffe45c",
    props: ["🔧", "🧹", "🔑", "🦝"],
  },
};

export function isCharacterId(value: string): value is CharacterId {
  return (characterIds as readonly string[]).includes(value);
}
