"use client"; // Ensure this runs client-side

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function CustomSignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {/* Main container with padding and a white background */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Event Management System
        </h1>

        {/* Sign-in button */}
        <button
          onClick={() => signIn("credentials", { callbackUrl: "/" })}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Sign in with Credentials
        </button>

        {/* Link to the signup page */}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
