'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const score = Number(searchParams.get('score'));
  const total = Number(searchParams.get('total'));
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!score || !total) router.push('/');
    const percent = Math.round((score / total) * 100);
    setPercentage(percent);

    // Save to quiz history in localStorage
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    history.push({ score: `${score}/${total}`, date: new Date().toISOString() });
    localStorage.setItem('quizHistory', JSON.stringify(history));
  }, [score, total, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">🎉 Quiz Completed!</h1>
        <div className="text-xl mb-4">
          <p>You scored:</p>
          <span className="text-4xl font-bold text-purple-600">{score} / {total}</span>
        </div>
        <p className="text-lg mb-6 text-gray-600">Your performance: {percentage}%</p>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => router.push('/quiz')}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
          >
            Retake Quiz
          </button>
          <button
            onClick={() => router.push('/profile')}
            className="border border-purple-600 text-purple-600 hover:bg-purple-50 py-2 px-4 rounded-lg"
          >
            Go to Profile
          </button>
        </div>
      </div>
    </div>
  );
}
