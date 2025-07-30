'use client';
import Link from 'next/link';
import { BrainCircuit, Trophy, Timer, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 px-4 md:px-12 py-16 space-y-24">

      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600">Welcome to QuizMaster</h1>
        <p className="text-gray-600 text-lg">
          Challenge your knowledge with fun, fast-paced quizzes. Compete, learn, and lead the board!
        </p>
        <Link href="/quiz">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition">
            Start Quiz
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <Feature icon={<BrainCircuit />} title="Challenging Questions" />
        <Feature icon={<Timer />} title="Timed Quizzes" />
        <Feature icon={<Users />} title="Multi-User Leaderboard" />
        <Feature icon={<Trophy />} title="Earn Achievements" />
      </section>

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold text-center">Quiz Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["General Knowledge", "JavaScript", "React", "CSS", "Science", "History"].map((category, index) => (
            <Link key={index} href={`/quiz?category=${encodeURIComponent(category)}`}>
              <div className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-6 rounded-xl shadow-sm cursor-pointer transition text-center font-medium">
                {category}
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="bg-blue-100 p-3 rounded-full text-blue-600">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
    </div>
  );
}
