"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import githubIcon from "public/icons/github.png";
import googleIcon from "public/icons/google.png";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import loginIllustration from "public/icons/Privacy policy-rafiki.png";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      toast.success("Logged in with provider ✅");
      router.push("/");
    }
  }, [session, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="bg-purple-100 hidden md:flex items-center justify-center">
          <Image
            src={loginIllustration}
            alt="Login illustration"
            className="w-3/4"
            width={500} 
            height={300} 
          />
        </div>
        <div className="p-8 md:p-12 space-y-6">
          <h2 className="text-3xl font-bold text-purple-600 text-center">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600">
            Login to continue the quiz adventure!
          </p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-purple-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Login
            </button>
          </form>

          <div className="mt-4">
            <p className="text-gray-700 text-sm mb-2 font-extrabold text-center">
              OR
            </p>
            <div className="flex justify-center gap-4 mt-5">
              <button
                type="button"
                onClick={() => signIn("google")}
                className="flex items-center gap-3 px-5 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white cursor-pointer hover:bg-gray-50"
              >
                <Image src={googleIcon} alt="Google Logo" className="w-5 h-5" />
                Sign in with Google
              </button>

              <button
                type="button"
                onClick={() => signIn("github")}
                className="flex items-center gap-3 px-5 py-2 border-[#44444] rounded-md shadow-sm text-sm font-medium text-white bg-[#444444] cursor-pointer hover:bg-[#4e4e4e]"
              >
                <Image src={githubIcon} alt="GitHub Logo" className="w-5 h-5" />
                Sign in with GitHub
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-purple-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
