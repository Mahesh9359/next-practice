import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-xl font-bold text-purple-600">QuizMaster</h2>
          <p className="mt-2 text-sm text-gray-500">
            Level up your knowledge with quick and fun quizzes!
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:text-purple-600">Home</Link></li>
            <li><Link href="/quiz" className="hover:text-purple-600">Quiz</Link></li>
            <li><Link href="/leaderboard" className="hover:text-purple-600">Leaderboard</Link></li>
            <li><Link href="/about" className="hover:text-purple-600">About</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Connect with us</h3>
          <div className="flex gap-4 text-gray-600">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 hover:text-purple-600" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5 hover:text-purple-600" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 hover:text-purple-600" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
