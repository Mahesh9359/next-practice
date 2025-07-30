"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import signupIllustration from "public/icons/Sign up-rafiki (2).png";
import {useRouter} from "next/navigation";
import { toast } from "react-toastify";

type UserForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  nameError: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
};

export default function SignupPage() {
  const [user, setUser] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });
  const router = useRouter();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => {
      const updatedUser = { ...prev, [name]: value };

      if (name === "name") {
        const nameValidation = /^[a-zA-Z ]+$/;
        if (!value.trim()) {
          updatedUser.nameError = "Name is required.";
        } else if (!nameValidation.test(value.trim())) {
          updatedUser.nameError = "Name must contain only letters and spaces.";
        } else {
          updatedUser.nameError = "";
        }
      }

      if (name === "email") {
        const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValidation.test(value.trim())) {
          updatedUser.emailError = "Invalid email address.";
        } else {
          updatedUser.emailError = "";
        }
      }

      if (name === "password") {
        if (value.length < 6) {
          updatedUser.passwordError = "Password must be at least 6 characters.";
        } else {
          updatedUser.passwordError = "";
        }
      }

      if (name === "confirmPassword") {
        if (value !== prev.password) {
          updatedUser.confirmPasswordError = "Passwords do not match.";
        } else {
          updatedUser.confirmPasswordError = "";
        }
      }

      return updatedUser;
    });
  };

  const saveData = () => {
    const nameValidation = /^[a-zA-Z ]+$/;
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    if (!user.name.trim()) {
      nameError = "Name is required.";
    } else if (!nameValidation.test(user.name.trim())) {
      nameError = "Name must contain only letters and spaces.";
    }

    if (!emailValidation.test(user.email.trim())) {
      emailError = "Invalid email address.";
    }

    if (user.password.length < 6) {
      passwordError = "Password must be at least 6 characters.";
    }

    if (user.password!==user.confirmPassword) {
      confirmPasswordError = "Password doesn't match";
    }
    setUser((prev) => ({
      ...prev,
      nameError,
      emailError,
      passwordError,
      confirmPasswordError,
    }));

    if (nameError || emailError || passwordError || confirmPasswordError) {
      return;
    }

    const { name, email, password } = user;
    localStorage.setItem(
      "userData",
      JSON.stringify({ name, email, password })
    );
    toast.success("Sign up successful");
    router.push("/login");

    setUser({
      name: "",
      email: "",
      password: "",
      confirmPassword:"",
      nameError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="bg-purple-100 hidden md:flex items-center justify-center">
          <Image
            src={signupIllustration}
            alt="SignUp illustration"
            className="w-3/4"
            width={500}
            height={300}
          />
        </div>
        <div className="p-8 md:p-12 space-y-6">
          <h2 className="text-3xl font-bold text-purple-600 text-center">
            Create Account
          </h2>
          <p className="text-center text-gray-600">
            Start your quiz journey today!
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInput}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {user.nameError && (
                <p className="text-red-500 text-sm mt-1">{user.nameError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {user.emailError && (
                <p className="text-red-500 text-sm mt-1">{user.emailError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {user.passwordError && (
                <p className="text-red-500 text-sm mt-1">
                  {user.passwordError}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleInput}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {user.confirmPasswordError && (
                <p className="text-red-500 text-sm mt-1">
                  {user.confirmPasswordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
              onClick={saveData}
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
