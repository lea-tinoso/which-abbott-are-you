import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { characterIds, characters, isCharacterId } from "@/data/characters";

export const alt = "which abbott are you? quiz result";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return characterIds.map((id) => ({ id }));
}

const font = (file: string) => readFile(join(process.cwd(), "assets", file));

// The card people see when a result link is shared: head sticker, quote bubble, name.
export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = characters[isCharacterId(id) ? id : "janine"];
  const [bold, semi, hand, head] = await Promise.all([
    font("Inter-Bold.otf"),
    font("Inter-SemiBold.otf"),
    font("Caveat-Bold.ttf"),
    readFile(join(process.cwd(), "public", c.head)),
  ]);
  const headSrc = `data:image/${c.head.endsWith(".svg") ? "svg+xml" : "png"};base64,${head.toString("base64")}`;
  const [first, ...rest] = c.name.toLowerCase().split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: c.colour,
          color: "#fff",
          fontFamily: "Inter",
          padding: "56px 64px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 600 }}>
          <div style={{ fontSize: 22, letterSpacing: 2, opacity: 0.85 }}>WHICH ABBOTT ARE YOU?</div>
          <div style={{ fontSize: 26, marginTop: 34, opacity: 0.85 }}>i got…</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: c.name.length > 13 ? 100 : 124,
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: -6,
              color: c.ink,
              marginTop: 8,
            }}
          >
            <span>{first}</span>
            <span>{rest.join(" ")}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              background: "#fff",
              color: "#111",
              fontSize: 26,
              fontWeight: 600,
              padding: "10px 20px",
              transform: "rotate(-2deg)",
              alignSelf: "flex-start",
            }}
          >
            {c.role}
          </div>
        </div>

        <img src={headSrc} width={430} height={400} style={{ position: "absolute", right: 70, top: 40, transform: "rotate(-4deg)" }} />

        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: 40,
            display: "flex",
            width: 400,
            background: "#fff",
            color: "#111",
            border: "4px solid #111",
            borderRadius: 26,
            boxShadow: "8px 8px 0 #111",
            padding: "16px 22px",
            fontSize: 28,
            fontWeight: 600,
            lineHeight: 1.2,
            transform: "rotate(3deg)",
          }}
        >
          “{c.line}”
        </div>

        <div style={{ position: "absolute", left: 64, bottom: 44, fontFamily: "Caveat", fontSize: 40, display: "flex" }}>
          take the quiz →
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: bold, weight: 700, style: "normal" },
        { name: "Inter", data: semi, weight: 600, style: "normal" },
        { name: "Caveat", data: hand, weight: 700, style: "normal" },
      ],
    },
  );
}
