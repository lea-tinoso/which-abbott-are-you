# which abbott are you?

A BuzzFeed-style personality quiz: 10 questions, and the result tells you which
Abbott Elementary staff member you are. Fan-made, not affiliated with ABC.

The look is a messy mac desktop ("abbott os") with die-cut head stickers on the
result screen.

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
