import Link from "next/link";
import { Folder, Kaomoji, NameTag, Sticky, Trash, Window } from "@/components/desk";
import { MenuBar } from "@/components/menu-bar";
import { Signature } from "@/components/signature";
import { characters } from "@/data/characters";

export default function Cover() {
  return (
    <main className="desk cover">
      <MenuBar />

      <div className="stage">
        <Folder label="lesson_plans" style={{ left: "4%", top: 24 }} />
        <Folder label="budget_2026" note="(empty)" style={{ right: "4%", top: 34 }} />

        <Window title="lounge_cam.mov" className="tilt-l cover-cam" decorative>
          <svg viewBox="0 0 196 110">
            <rect width="196" height="110" fill="#f0e6d6" />
            <rect y="78" width="196" height="32" fill="#c9a77c" />
            <rect x="70" y="40" width="44" height="42" rx="6" fill="#fff" stroke="#111" strokeWidth="3" />
            <path d="M114 50 q16 0 16 12 q0 12 -16 12" fill="none" stroke="#111" strokeWidth="3" />
            <text x="92" y="68" fontFamily="Inter" fontWeight="700" fontSize="10" textAnchor="middle">
              #1
            </text>
            <path className="steam" d="M84 34 q4 -8 0 -16 M98 34 q4 -8 0 -16" stroke="#999" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle className="rec" cx="170" cy="20" r="5" fill="#e5484d" />
            <text x="156" y="24" fontFamily="Inter" fontSize="9" fill="#e5484d" textAnchor="end" fontWeight="600">
              REC
            </text>
          </svg>
        </Window>

        <section className="cover-copy">
          <h1>
            which abbott
            <br />
            are you?
          </h1>
          <p>10 questions, 1 teachers&apos; lounge, zero budget. find your abbott elementary twin.</p>
          <div className="row">
            <Link href="/quiz" className="pill blue">
              start the quiz
            </Link>
            <a href="#how" className="pill grey">
              how it works
            </a>
          </div>
          <p className="mono small">about 2 min · no sign-up</p>
        </section>

        <div className="cover-scatter">
          <NameTag name="you?" style={{ left: "3%", top: 10, transform: "rotate(-8deg)" }} />
          <Kaomoji face="(ง •̀_•́)ง" style={{ left: "42%", top: 64 }} />
          <Sticky style={{ right: "2%", top: 18, transform: "rotate(6deg)" }}>
            gold star
            <br />
            for showing up ★
          </Sticky>
        </div>

        <section id="how" className="how">
          <Window title="how_it_works.txt">
            <ol>
              <li>answer 10 questions about your work life (real or imagined).</li>
              <li>every answer earns points for the abbott staff it sounds like.</li>
              <li>meet your match, then share it with the group chat.</li>
            </ol>
          </Window>
        </section>

        <div className="peek" aria-hidden>
          <img src={characters.janine.head} alt="" className="peek-head" />
          <div className="bubble peek-bubble">
            psst… which
            <br />
            one of us
            <br />
            are you?
          </div>
          <Trash style={{ position: "absolute", right: "6%", bottom: 20 }} />
        </div>

        <Signature />
      </div>
    </main>
  );
}
