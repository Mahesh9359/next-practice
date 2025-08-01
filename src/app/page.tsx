"use client";
import Link from "next/link";
import { BrainCircuit, Trophy, Timer, Users, User } from "lucide-react";

export default function HomePage() {
  const categories = [
    "HTML",
    "JavaScript",
    "React",
    "CSS",
    "Next js",
    "Tailwind css",
  ];

  const features = [
    {
      id: 1,
      icon: <BrainCircuit />,
      title: "Challenging Questions",
    },
    {
      id: 2,
      icon: <Timer />,
      title: "Timed Quizzes",
    },
    {
      id: 3,
      icon: <User />,
      title: "Multi-User Leaderboard",
    },
    {
      id: 4,
      icon: <Trophy />,
      title: "Earn Achievements",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800 px-4 md:px-12 py-16 space-y-24">
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-600">
          Welcome to QuizMaster
        </h1>
        <p className="text-gray-600 text-lg">
          Challenge your knowledge with fun, fast-paced quizzes. Compete, learn,
          and lead the board!
        </p>
        <Link href="/quiz">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition">
            Start Quiz
          </button>
        </Link>
      </section>
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {features.map((feature) => (
          <div
            className="flex flex-col items-center space-y-3 "
            key={feature.id}
          >
            <div className="bg-purple-100 p-3 rounded-full text-purple-600">
              {feature.icon}
            </div>
            <h3 className="font-semibold">{feature.title}</h3>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold text-center">Quiz Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link key={index} href={`/quiz/${encodeURIComponent(category.toLowerCase())}`}>
              <div className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-6 rounded-xl shadow-sm cursor-pointer transition text-center font-medium">
                {category}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
