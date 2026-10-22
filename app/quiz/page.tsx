import type { Metadata } from "next";
import { Quiz } from "@/components/quiz";

export const metadata: Metadata = { title: "the quiz · which abbott are you?" };

export default function QuizPage() {
  return <Quiz />;
}
