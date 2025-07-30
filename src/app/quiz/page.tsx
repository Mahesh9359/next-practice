'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const quizData: Question[] = [
  {
    id: 1,
    question: 'What does JSX stand for?',
    options: ['Java Syntax Extension', 'JavaScript XML', 'JavaScript Extension', 'JSON Syntax'],
    answer: 'JavaScript XML',
  },
  {
    id: 2,
    question: 'Which hook is used for state in React?',
    options: ['useState', 'useEffect', 'useRef', 'useContext'],
    answer: 'useState',
  },
  {
    id: 3,
    question: 'What is the virtual DOM?',
    options: [
      'A copy of the real DOM',
      'A lightweight version of JavaScript',
      'A database',
      'A server-side framework',
    ],
    answer: 'A copy of the real DOM',
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ [id: number]: string }>({});
  const router = useRouter();

  const handleNext = () => {
    const current = quizData[currentQuestion];
    if (selectedOption === current.answer) {
      setScore(score + 1);
    }

    setAnswers({ ...answers, [current.id]: selectedOption || '' });
    setSelectedOption(null);

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = {
        id: `quiz-${Date.now()}`,
        title: 'React Quiz',
        score: selectedOption === current.answer ? score + 1 : score,
        total: quizData.length,
        percentage: Math.round(((selectedOption === current.answer ? score + 1 : score) / quizData.length) * 100),
        date: new Date().toISOString(),
      };
      const prev = JSON.parse(localStorage.getItem('quizResults') || '[]');
      localStorage.setItem('quizResults', JSON.stringify([...prev, result]));
      router.push(`/result/${result.id}`);
    }
  };

  const current = quizData[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-purple-700">
          Question {currentQuestion + 1} of {quizData.length}
        </h2>
        <p className="text-lg mb-4 font-medium">{current.question}</p>

        <div className="space-y-3">
          {current.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(option)}
              className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                selectedOption === option
                  ? 'bg-purple-100 border-purple-600 text-purple-700 font-semibold'
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`px-6 py-2 rounded-lg text-white font-medium transition ${
              selectedOption ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestion === quizData.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
