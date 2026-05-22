"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: callbackUrl,
      rememberMe: true,
    });

    if (error) {
      setErrorMessage(error?.message || "Sign in failed. Please try again.");
      return;
    }

    router.push(callbackUrl);
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20">
      <form
        onSubmit={onSubmit}
        className="fieldset bg-blue-100 border-base-300 rounded-box w-xs border p-4"
      >
        <button
          onClick={handleGoogleSignIn}
          className="btn mt-1 bg-green-300 border-green-400"
          type="reset"
        >
          Continue with Google
        </button>
        <div className="divider">OR</div>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input validator"
            placeholder="Email"
            required
          />
          <p className="validator-hint hidden">Required</p>
        </fieldset>

        <fieldset className="fieldset">
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input validator"
            placeholder="Password"
            required
          />
          <p className="validator-hint hidden">Required</p>
        </fieldset>

        {errorMessage ? (
          <p className="mt-2 rounded-md border border-red-500 bg-red-400 px-3 py-2 text-center font-bold text-white">
            {errorMessage}
          </p>
        ) : null}

        <button
          className="btn btn-neutral mt-4 border-0 bg-black text-white"
          type="submit"
        >
          Sign In
        </button>
        <p className="mt-3">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
