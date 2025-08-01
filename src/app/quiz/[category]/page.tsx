"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export default function QuizPage() {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = decodeURIComponent(category);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLocalUser, setIsLocalUser] = useState(false);

  // Check local login
  useEffect(() => {
    const localLogin = localStorage.getItem("isLoggedIn") === "true";
    setIsLocalUser(localLogin);

    if (!localLogin && status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  // Fetch quiz questions
  useEffect(() => {
    if (!category) return;

    setIsLoading(true);
    fetch(`http://localhost:5000/api/questions/${decodedCategory}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch questions.");
        return res.json();
      })
      .then((data: Question[]) => {
        setQuestions(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [category]);

  const handleNext = () => {
    const currentQuestion = questions[currentIndex];

    if (selectedOption === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }

    setSelectedOption(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const finalScore =
        selectedOption === currentQuestion.answer ? score + 1 : score;

      const result = {
        id: `quiz-${Date.now()}`,
        title: `${category} Quiz`,
        score: finalScore,
        total: questions.length,
        percentage: Math.round((finalScore / questions.length) * 100),
        date: new Date().toISOString(),
      };

      const previousResults = JSON.parse(
        localStorage.getItem("quizResults") || "[]"
      );
      localStorage.setItem(
        "quizResults",
        JSON.stringify([...previousResults, result])
      );

      router.push(`/result/${result.id}`);
    }
  };

  const currentQuestion = questions[currentIndex];

  if (!session && !isLocalUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl text-red-600 font-bold">Please login first</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-purple-600">Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-purple-700">
          {decodedCategory.toUpperCase()} Quiz — Question {currentIndex + 1} of{" "}
          {questions.length}
        </h2>
        <p className="text-lg mb-4 font-medium">{currentQuestion.question}</p>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(option)}
              className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                selectedOption === option
                  ? "bg-purple-100 border-purple-600 text-purple-700 font-semibold"
                  : "bg-gray-50 hover:bg-gray-100 border-gray-300"
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
              selectedOption
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {currentIndex === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
