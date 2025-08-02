"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";

export default function Navbar() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = !!user || !!session;

  const handleLogout = () => {
    if (session) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userData");
      localStorage.removeItem("quizResults");
      signOut({ callbackUrl: "/" });
    } else {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userData");
      localStorage.removeItem("quizResults");
      dispatch(logout());
      toast.success("Logged Out Successfully");
      router.push("/login");
    }
  };

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

        {isLoggedIn && (
          <>
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
        {isLoggedIn ? (
          <>
            {session ? (
              <span className="hidden md:block text-sm text-gray-600">
                {session.user?.name}
              </span>
            ) : (
              <span className="hidden md:block text-sm text-gray-600">
                {user?.name}
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
