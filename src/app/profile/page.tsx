"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import userAvatar from "public/icons/person.png";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type QuizResult = {
  id: string;
  title: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const localUser = useSelector((state: RootState) => state.auth.user);

  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    const isLocalLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (status === "unauthenticated" && !isLocalLoggedIn) {
      router.push("/login");
    }

    const storedResults = localStorage.getItem("quizResults");
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults);
        setQuizResults(parsedResults);
      } catch (error) {
        console.error("Error parsing quiz results from localStorage:", error);
      }
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="text-center mt-10 text-purple-600 font-semibold">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-white text-gray-800 px-4 md:px-12 py-16 space-y-16">
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-600">👤 Profile</h1>
        <p className="text-gray-600 text-lg">View your account details and quiz history</p>
      </section>

      <section className="max-w-4xl mx-auto space-y-10">
        <div className="bg-purple-50 p-6 rounded-xl shadow-sm flex items-center space-x-6">
          <Image
            src={session?.user?.image || userAvatar}
            alt="User Image"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold text-purple-700">
              {session?.user?.name || localUser?.name}
            </h2>
            <p className="text-gray-600">{session?.user?.email || localUser?.email}</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">📚 Quiz History</h2>
          {quizResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {quizResults
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((result) => (
                  <div
                    key={result.id}
                    className="bg-white hover:bg-purple-50 transition p-5 rounded-xl shadow-sm border border-gray-100 text-sm"
                  >
                    <p className="font-semibold text-purple-700">{result.title}</p>
                    <p className="text-gray-700">
                      Score: {result.score}/{result.total} ({result.percentage}%)
                    </p>
                    <p className="text-gray-500">
                      {new Date(result.date).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No quiz history found.</p>
          )}
        </div>
      </section>
    </main>
  );
}
