'use client';

import React from 'react';
import Image from 'next/image';
import quizImage from 'public/icons/Online test-rafiki.png';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-10 md:px-20">
      <h1 className="text-4xl font-bold mb-6 text-center text-purple-700">About QuizMaster</h1>

      <div className="flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="flex-1 space-y-4">
          <p className="text-lg">
            Welcome to <strong>QuizMaster</strong>, your ultimate destination for testing your knowledge across various topics!
          </p>
          <p>
            Our platform allows users to take quizzes, view results, and track performance. Whether you're preparing for exams or just having fun, QuizMaster is designed to be fast, responsive, and easy to use.
          </p>
          
        </div>

        <div className="flex-1">
          <Image
            src={quizImage}
            alt="Quiz Illustration"
            width={500}
            height={500}
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
