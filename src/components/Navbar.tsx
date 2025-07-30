"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="bg-white flex justify-between items-center py-4 px-8 shadow-md sticky top-0 z-50">
      {/* Left: Logo */}
      <div>
        <Link
          href="/"
          className="text-2xl font-bold text-purple-600 tracking-tight"
        >
          QuizMaster
        </Link>
      </div>

      {/* Right: Nav Links + Auth Buttons */}
      <div className="flex items-center gap-6 font-medium">
        <Link
          href="/"
          className={`text-sm font-medium ${
            pathname === "/" ? "text-purple-600" : "text-gray-700 hover:text-purple-600"
          }`}
        >
          Home
        </Link>
        <Link
          href="/quiz"
          className={`text-sm font-medium ${
            pathname === "/quiz" ? "text-purple-600" : "text-gray-700 hover:text-purple-600"
          }`}
        >
          Quiz
        </Link>

        {session && (
          <>
            <Link
              href="/leaderboard"
              className={`text-sm font-medium ${
                pathname === "/leaderboard" ? "text-purple-600" : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Leaderboard
            </Link>
            <Link
              href="/profile"
              className={`text-sm font-medium ${
                pathname === "/profile" ? "text-purple-600" : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Profile
            </Link>
          </>
        )}

        <Link
          href="/about"
          className={`text-sm font-medium ${
            pathname === "/about" ? "text-purple-600" : "text-gray-700 hover:text-purple-600"
          }`}
        >
          About
        </Link>

        {session ? (
          <>
            <span className="hidden md:block text-sm text-gray-600">
              {session.user?.name}
            </span>
            <button
              onClick={() => signOut()}
              className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">
            <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
