# which abbott are you?

A BuzzFeed-style personality quiz: 10 questions, and the result tells you which
Abbott Elementary staff member you are. Fan-made, not affiliated with ABC.

The look is a messy mac desktop ("abbott os") with die-cut head stickers on the
result screen.

Made by [lea](https://lea-showcase.vercel.app). Curious how it came together?
Read [how this was made](#how-this-was-made).

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # scoring and quiz balance checks
npm run build
```

## Where things live

| What | File |
| --- | --- |
| Questions and answers | `data/questions.ts` |
| Characters, quotes, colours, head images | `data/characters.ts` |
| Scoring and tie-breaks | `lib/score.ts` |
| Cover, quiz and result pages | `app/page.tsx`, `components/quiz.tsx`, `app/result/[id]/page.tsx` |
| Share image for each result | `app/result/[id]/opengraph-image.tsx` |
| Styles | `app/globals.css` |

## Scoring

Each answer gives 2 points to its main character and 1 to a secondary one. A
character's match percentage is their points divided by the most they could have
scored, and the highest percentage wins. Ties go to the character picked on the
last question, then to whoever had more main picks. `npm test` fails if any
character is the main pick on fewer than 5 answers or can't be reached.

## Swapping in fan-edit heads

The heads in `public/heads/*.svg` are placeholder cartoons drawn by
`npm run heads`. To use a fan edit, drop a transparent PNG into `public/heads/`
(for example `janine.png`) and change that character's `head` path in
`data/characters.ts`. The result page and share image pick it up automatically.
For the sticker look, give the cutout a thick white outline before exporting.

## Deploying

Import the repo in Vercel with the default Next.js settings. Every push to the
production branch goes live, and every pull request gets a preview link.

## How this was made

I built this with Claude Code in one sitting, the same way I build everything
now: I make the calls, the agent does the typing, and nothing ships until I've
seen it.

### From idea to live site in about 40 minutes

| Time (Oct 22, 2026, UTC) | Since the first message | What happened |
| --- | --- | --- |
| 13:17 | 0 min | First message: "make me a BuzzFeed-style Abbott quiz" |
| 13:21 | 4 min | Plan ready: stack, scoring, characters, 3 visual directions, repo name |
| 13:36 | 18 min | Design approved from static preview images |
| 13:51 | 34 min | First version merged (PR #1) |
| 13:56 | 39 min | Live on Vercel after fixing the deploy 404 (PR #2) |

### 1. The ask

> "Similar to how buzzfeed quiz works... the result will tell you which Abbott
> Elementary character you are. It's also somewhat similar to the quizzes you
> fill out for fun in magazines. I don't have a visual style yet in mind but I
> have attached UI/UX skills repos. Please create a plan."

_My first messages to Claude Code, lightly trimmed._

### 2. My decisions

1. **Plan before code.** I asked for a plan first: stack, quiz structure,
   scoring, characters, visual directions and a repo name. I picked the name
   from a short list.
2. **Borrow taste, don't guess it.** I don't have a design eye yet, so I
   attached three design repos ([taste-skill](https://github.com/lea-tinoso/taste-skill),
   [awesome-design-md](https://github.com/lea-tinoso/awesome-design-md) and
   [agent-skills](https://github.com/lea-tinoso/agent-skills)) and asked for real
   sample sites to look at. I chose heyclicky's messy-Mac-desktop look for the
   page and Trevor Noah's die-cut head stickers for the result.
3. **Pictures before code.** I asked for static preview images first. I
   approved the design only after seeing the cover, a question and the result.
4. **Fan-made, not ripped.** No screenshots from the show. The heads are
   cartoon placeholders until I add my own fan edits, and the footer says it
   isn't affiliated with ABC.
5. **Review every change.** Everything went in through pull requests, with a
   Vercel preview I could open on my phone before merging.

### 3. What Claude did

- **Read the design repos** and pulled four matching sites per style from
  taste-skill's study of 247 curated sites, so I had something real to react to.
- **Mocked up the screens** as images, then built them in Next.js with plain
  CSS once I signed off.
- **Wrote the quiz**: 10 questions, 40 answers, and a scoring model that
  measures each character against their own best score, so no one is harder
  to get. Tests fail if any character becomes unreachable.
- **Drew the placeholder heads** in code (`scripts/draw-heads.mjs`), with the
  white sticker outline and torn crown baked in.
- **Kept answers private.** Only the quiz taker sees their percentages. A shared
  link shows just the character.
- **Debugged the first deploy.** The live site returned 404 because Vercel was
  connected while the repo still held only a README, so it treated the project
  as a plain static folder. `vercel.json` now pins the framework to Next.js.

### 4. What I'd do next

- Swap the placeholder heads for my fan edits.
- Replace the placeholder lines with real quotes from the show.
- Watch which results people share most, and rebalance questions if one
  character dominates.
