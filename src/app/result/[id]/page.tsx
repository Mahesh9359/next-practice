'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface QuizResult {
  id: string;
  title: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
}

export default function ResultDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("quizResults") || "[]");
    const quiz = storedResults.find((res: QuizResult) => res.id === id);
    if (quiz) {
      setResult(quiz);
    } else {
      router.push('/'); 
    }
  }, [id, router]);

  if (!result) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-purple-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-8 text-center">
        <h1 className="text-2xl font-bold text-purple-700 mb-2">Quiz: {result.title}</h1>
        <p className="text-sm text-gray-500 mb-4">Completed on {new Date(result.date).toLocaleString()}</p>

        <p className="text-lg text-gray-700 mb-2">
          You answered <span className="font-semibold text-purple-600">{result.score}</span> out of <span className="font-semibold">{result.total}</span> questions correctly.
        </p>
        <p className="text-xl font-bold text-green-600 mb-6">Your Score: {result.percentage}%</p>

        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}