'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
//   const { data: session, status } = useSession();
  const router = useRouter();
  const [quizHistory, setQuizHistory] = useState<any[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else {
      const data = localStorage.getItem('quizHistory');
      setQuizHistory(data ? JSON.parse(data) : []);
    }
  }, [status]);

  if (status === 'loading') {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4 mb-8">
        <img
        //   src={session?.user?.image || '/default-avatar.png'}
          alt="User Avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">M</h2>
          <p className="text-gray-600">M</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Quiz History</h2>

      {quizHistory.length === 0 ? (
        <p className="text-gray-500">No quiz attempts yet.</p>
      ) : (
        <div className="space-y-4">
          {quizHistory.map((quiz, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow">
              <p><strong>Score:</strong> {quiz.score}</p>
              <p><strong>Date:</strong> {new Date(quiz.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
