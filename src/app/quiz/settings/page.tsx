'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const categories = ['JavaScript', 'HTML', 'CSS', 'React'];
const difficulties = ['Easy', 'Medium', 'Hard'];

export default function QuizSettingsPage() {
  const router = useRouter();

  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [timeLimit, setTimeLimit] = useState(30); // in seconds per question

  const handleStartQuiz = () => {
    if (!category || !difficulty) {
      alert('Please select category and difficulty.');
      return;
    }

    // Save settings to localStorage or Redux
    const settings = {
      category,
      difficulty,
      numQuestions,
      timeLimit,
    };

    localStorage.setItem('quiz-settings', JSON.stringify(settings));
    router.push('/quiz');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-center text-indigo-600">Quiz Settings</h2>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Select</option>
            {difficulties.map((dif) => (
              <option key={dif}>{dif}</option>
            ))}
          </select>
        </div>

        {/* Number of Questions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Questions</label>
          <input
            type="number"
            min={1}
            max={20}
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
          />
        </div>

        {/* Time Limit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Limit per Question (in seconds)
          </label>
          <input
            type="number"
            min={10}
            max={120}
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={timeLimit}
            onChange={(e) => setTimeLimit(parseInt(e.target.value))}
          />
        </div>

        <button
          onClick={handleStartQuiz}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
