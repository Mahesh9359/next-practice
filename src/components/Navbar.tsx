"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isLocalLoggedIn, setIsLocalLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(()=>{
    const status = localStorage.getItem('isLoggedIn')==='true';
    setIsLocalLoggedIn(status);
  },[]);

  useEffect(()=>{
    const userData = localStorage.getItem("userData");
    if(userData){
      const parsedData = JSON.parse(userData);
      setUserName(parsedData.name)
    }
  },[])
  const handleLogout = () => {
        if (session) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');
            localStorage.removeItem('cartItems');
            signOut({ callbackUrl: '/' });
        } else {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');
        }
    };

  const isLoggedIn = isLocalLoggedIn || !!session;

  return (
    <nav className="bg-white flex justify-between items-center py-4 px-8 shadow-md sticky top-0 z-50">
      <div>
        <Link
          href="/"
          className="text-2xl font-bold text-purple-600 tracking-tight"
        >
          QuizMaster
        </Link>
      </div>
      <div className="flex items-center gap-6 font-medium">
        <Link
          href="/"
          className={`text-sm font-medium ${
            pathname === "/"
              ? "text-purple-600"
              : "text-gray-700 hover:text-purple-600"
          }`}
        >
          Home
        </Link>
        <Link
          href="/quiz"
          className={`text-sm font-medium ${
            pathname === "/quiz"
              ? "text-purple-600"
              : "text-gray-700 hover:text-purple-600"
          }`}
        >
          Quiz
        </Link>

        {isLoggedIn && (
          <>
            <Link
              href="/leaderboard"
              className={`text-sm font-medium ${
                pathname === "/leaderboard"
                  ? "text-purple-600"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Leaderboard
            </Link>
            <Link
              href="/profile"
              className={`text-sm font-medium ${
                pathname === "/profile"
                  ? "text-purple-600"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Profile
            </Link>
          </>
        )}

        <Link
          href="/about"
          className={`text-sm font-medium ${
            pathname === "/about"
              ? "text-purple-600"
              : "text-gray-700 hover:text-purple-600"
          }`}
        >
          About
        </Link>

        {isLoggedIn ? (
          <>
          {session ?(
            <span className="hidden md:block text-sm text-gray-600">
              {session.user?.name}
            </span>
          ):(
            <span className="hidden md:block text-sm text-gray-600">
              {userName}
            </span>
          )}
            <button
              onClick={handleLogout}
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
