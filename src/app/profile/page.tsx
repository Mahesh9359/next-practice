"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import userAvatar from "public/icons/person.png";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const localUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const isLocalLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (status === "unauthenticated" && !isLocalLoggedIn) {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4 mb-8">
        <Image
          src={session?.user?.image || userAvatar}
          alt="User Image"
          width={64}
          height={64}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{session?.user?.name || localUser?.name}</h2>
          <p className="text-gray-600">{session?.user?.email || localUser?.email}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Quiz History</h2>

      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-md shadow">
          <p>
            <strong>Score:</strong>{" "}
          </p>
          <p>
            <strong>Date:</strong>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
