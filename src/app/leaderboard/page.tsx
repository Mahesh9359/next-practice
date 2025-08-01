"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type QuizResult = {
  id: string;
  title: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
};

export default function LeaderboardPage() {
  const [results, setResults] = useState<QuizResult[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const isLocalLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // Redirect if not logged in via session or localStorage
    if (status === "unauthenticated" && !isLocalLoggedIn) {
      router.push("/login");
    }

    const storedResults = localStorage.getItem("quizResults");
    if (storedResults) {
      try {
        const parsedResults: QuizResult[] = JSON.parse(storedResults);
        setResults(parsedResults);
      } catch (err) {
        console.error("Failed to parse quiz results:", err);
      }
    }
  }, [status, router]);

  // Show loading until session status is resolved
  if (status === "loading") {
    return <div className="text-center mt-10 text-purple-600 font-semibold">Loading...</div>;
  }

  // Group by quiz title and keep only the highest score per quiz
  const highestScores: { [title: string]: QuizResult } = {};
  results.forEach((result) => {
    const existing = highestScores[result.title];
    if (!existing || result.percentage > existing.percentage) {
      highestScores[result.title] = result;
    }
  });

  const sorted = Object.values(highestScores).sort((a, b) => b.percentage - a.percentage);

  return (
    <main className="min-h-screen bg-white text-gray-800 px-4 md:px-12 py-16 space-y-16">
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-600">🏆 Your Leaderboard</h1>
        <p className="text-gray-600 text-lg">
          View your best scores across all quizzes and track your progress!
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        {sorted.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No quiz data found.</p>
        ) : (
          <div className="space-y-6">
            {sorted.map((quiz, index) => (
              <div
                key={quiz.id}
                className="bg-purple-50 hover:bg-purple-100 transition p-6 rounded-xl shadow-sm flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold text-purple-700">{quiz.title}</h2>
                  <p className="text-gray-700">
                    Score: {quiz.score} / {quiz.total} ({quiz.percentage}%)
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-600">#{index + 1}</p>
                  <p className="text-sm text-gray-500">
                    {quiz.percentage >= 90
                      ? "🥇 Gold"
                      : quiz.percentage >= 75
                      ? "🥈 Silver"
                      : quiz.percentage >= 50
                      ? "🥉 Bronze"
                      : "🎯 Keep Practicing"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
