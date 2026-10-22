import type { CharacterId } from "./characters";

export type Answer = {
  icon: string;
  title: string;
  detail: string;
  // `main` gets 2 points, `also` gets 1.
  main: CharacterId;
  also: CharacterId;
};

export type Question = {
  file: string;
  source: string;
  text: string;
  answers: [Answer, Answer, Answer, Answer];
};

export const questions: Question[] = [
  {
    file: "monday.txt",
    source: "bedroom · 6:00 am",
    text: "your alarm goes off on a monday. what happens next?",
    answers: [
      { icon: "🗂️", title: "already up", detail: "with a colour-coded plan for the week", main: "janine", also: "barbara" },
      { icon: "😴", title: "snooze ×4", detail: "then arrive looking flawless anyway", main: "ava", also: "melissa" },
      { icon: "🏃", title: "5 am run", detail: "plus a podcast about the civil war", main: "jacob", also: "gregory" },
      { icon: "🌙", title: "what alarm?", detail: "i never went to sleep. long story.", main: "johnson", also: "ava" },
    ],
  },
  {
    file: "donation.txt",
    source: "front office · email",
    text: "the school just got a surprise donation. what do you spend it on?",
    answers: [
      { icon: "🛋️", title: "a reading-corner glow-up", detail: "new rug, a lamp, and—", main: "janine", also: "jacob" },
      { icon: "🧾", title: "what the kids actually need", detail: "receipts filed, obviously", main: "barbara", also: "gregory" },
      { icon: "📺", title: "a giant lobby screen", detail: "featuring my face, for morale", main: "ava", also: "johnson" },
      { icon: "🤝", title: "make it stretch", detail: "i know someone who can triple it", main: "melissa", also: "johnson" },
    ],
  },
  {
    file: "lunch.txt",
    source: "teachers' lounge · noon",
    text: "pick your teachers' lounge lunch.",
    answers: [
      { icon: "🍝", title: "homemade lasagna", detail: "don't ask for the recipe", main: "melissa", also: "barbara" },
      { icon: "🥗", title: "sunday meal prep", detail: "in labelled containers", main: "gregory", also: "barbara" },
      { icon: "🍟", title: "vending machine chips", detail: "from the machine i fixed myself", main: "johnson", also: "janine" },
      { icon: "🌯", title: "a vegan wrap", detail: "and a documentary on my phone", main: "jacob", also: "gregory" },
    ],
  },
  {
    file: "announcement.txt",
    source: "principal's office · intercom",
    text: "the principal just announced a brand-new \"viral\" school idea. your move?",
    answers: [
      { icon: "📋", title: "volunteer to run it", detail: "and make a sign-up sheet", main: "janine", also: "jacob" },
      { icon: "🙄", title: "stare into the camera", detail: "say nothing. say everything.", main: "gregory", also: "melissa" },
      { icon: "📞", title: "make a call", detail: "someone can do it cheaper", main: "melissa", also: "johnson" },
      { icon: "☕", title: "finish your coffee first", detail: "it'll blow over by friday", main: "barbara", also: "gregory" },
    ],
  },
  {
    file: "classroom.txt",
    source: "room 104 · 10:42 am",
    text: "a student is acting out in class. what do you do?",
    answers: [
      { icon: "👀", title: "the look", detail: "one look. it's handled.", main: "barbara", also: "melissa" },
      { icon: "🫶", title: "a quiet word", detail: "ask what's really going on", main: "gregory", also: "janine" },
      { icon: "🖥️", title: "teachable moment", detail: "with a 14-slide presentation", main: "jacob", also: "janine" },
      { icon: "⚓", title: "tell them a story", detail: "about my years at sea", main: "johnson", also: "ava" },
    ],
  },
  {
    file: "karaoke.txt",
    source: "staff night out · 9 pm",
    text: "staff karaoke night. what are you singing?",
    answers: [
      { icon: "🎤", title: "a gospel classic", detail: "the whole room goes quiet", main: "barbara", also: "ava" },
      { icon: "💔", title: "a power ballad", detail: "i am not emotionally ready for", main: "janine", also: "ava" },
      { icon: "🎸", title: "loud 80s rock", detail: "with the whole crew on chorus", main: "melissa", also: "johnson" },
      { icon: "📻", title: "a deep cut", detail: "nobody knows it. i'll explain after.", main: "jacob", also: "gregory" },
    ],
  },
  {
    file: "field_trip.txt",
    source: "school bus · 8:30 am",
    text: "field trip day. where are you on the bus?",
    answers: [
      { icon: "📋", title: "front seat", detail: "clipboard out, headcount every 10 minutes", main: "barbara", also: "janine" },
      { icon: "🚌", title: "back row", detail: "keeping the troublemakers in line", main: "melissa", also: "gregory" },
      { icon: "🛞", title: "driving", detail: "don't ask how i got the licence", main: "johnson", also: "melissa" },
      { icon: "🚗", title: "not on the bus", detail: "meeting you there in my own car", main: "ava", also: "melissa" },
    ],
  },
  {
    file: "broken.txt",
    source: "hallway b · again",
    text: "something in the building is broken. again.",
    answers: [
      { icon: "🩹", title: "fix it myself", detail: "a tutorial video and duct tape", main: "janine", also: "johnson" },
      { icon: "🔧", title: "already fixed", detail: "i was here at 6 am", main: "johnson", also: "barbara" },
      { icon: "📨", title: "submit a ticket", detail: "then follow up. then follow up again.", main: "jacob", also: "gregory" },
      { icon: "📸", title: "post about it", detail: "the district will see it go viral", main: "ava", also: "janine" },
    ],
  },
  {
    file: "desk_drawer.txt",
    source: "your desk · top drawer",
    text: "what's in your desk drawer?",
    answers: [
      { icon: "✨", title: "craft supplies", detail: "glitter, laminated name tags, three staplers", main: "janine", also: "jacob" },
      { icon: "🍬", title: "the essentials", detail: "hand sanitiser, peppermints, a bible", main: "barbara", also: "melissa" },
      { icon: "📄", title: "a protein bar", detail: "and a cv i haven't sent", main: "gregory", also: "ava" },
      { icon: "🕶️", title: "a ring light", detail: "sunglasses and someone else's mail", main: "ava", also: "johnson" },
    ],
  },
  {
    file: "confessional.mov",
    source: "documentary crew · rolling",
    text: "the documentary camera turns to you. you say...",
    answers: [
      { icon: "😬", title: "\"this is fine\"", detail: "i'm fine. we're all fine.", main: "janine", also: "gregory" },
      { icon: "😐", title: "nothing", detail: "just long, silent eye contact with the lens", main: "gregory", also: "jacob" },
      { icon: "🙊", title: "\"blur my face\"", detail: "you're gonna want to for this one", main: "melissa", also: "ava" },
      { icon: "💁", title: "\"is this on?\"", detail: "great. let's talk about me.", main: "ava", also: "johnson" },
    ],
  },
];
