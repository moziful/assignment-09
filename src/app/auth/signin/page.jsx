"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import ScrollReveal from "@/components/ScrollReveal";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { error } = await authClient.signIn.email({
      email: formData.get("email"),
      password: formData.get("password"),
      callbackURL: callbackUrl,
      rememberMe: true,
    });

    if (error) {
      setErrorMessage(error?.message || "Sign in failed. Please try again.");
      toast.error(error?.message || "Sign in failed.");
      return;
    }
    toast.success("Signed in successfully!");
    router.push(callbackUrl);
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({ provider: "google" });
    } catch (error) {
      toast.error("Google sign in failed");
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20 bg-gray-50 dark:bg-gray-950 transition-colors">
      <ScrollReveal>
        <form
          onSubmit={onSubmit}
          className="fieldset bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-box w-xs border p-6 shadow-xl"
        >
          <button
            onClick={handleGoogleSignIn}
            className="btn w-full mt-1 bg-green-500 hover:bg-green-600 text-white border-0"
            type="button"
          >
            Continue with Google
          </button>

          <div className="divider dark:text-gray-500">OR</div>

          <fieldset className="fieldset">
            <label className="label dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              className="input validator w-full dark:bg-gray-950 dark:border-gray-700 dark:text-white"
              placeholder="Email"
              required
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              className="input validator w-full dark:bg-gray-950 dark:border-gray-700 dark:text-white"
              placeholder="Password"
              required
            />
          </fieldset>

          {errorMessage && (
            <p className="mt-2 rounded-md border border-red-500 bg-red-100 dark:bg-red-950/50 px-3 py-2 text-center font-bold text-red-600 dark:text-red-400">
              {errorMessage}
            </p>
          )}

          <button
            className="btn w-full mt-4 bg-blue-600 text-white hover:bg-gray-800 dark:hover:bg-blue-700 border-0"
            type="submit"
          >
            Sign In
          </button>

          <p className="mt-4 text-center dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-500 hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </ScrollReveal>
    </div>
  );
}
