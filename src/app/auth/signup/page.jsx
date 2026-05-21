"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const image = formData.get("image");

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
      callbackURL: "/auth/signin",
    });

    if (error) {
      setErrorMessage(error?.message || "Signup failed. Please try again.");
      return;
    }

    router.push("/auth/signin");
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20">
      <form
        onSubmit={onSubmit}
        className="fieldset bg-blue-100 border-base-300 rounded-box w-xs border p-4"
      >
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className="input validator"
            placeholder="Name"
            required
          />
          <p className="validator-hint hidden">Required</p>
        </fieldset>

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
          <label className="label">Photo URL</label>
          <input
            type="text"
            name="image"
            className="input validator"
            placeholder="Photo URL"
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

        <button className="btn btn-neutral mt-4 border-0 bg-black text-white" type="submit">
          Sign Up
        </button>
        <p className="mt-3">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
