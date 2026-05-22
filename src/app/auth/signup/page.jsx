"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import ScrollReveal from "@/components/ScrollReveal";

const SignUpPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const image = formData.get("image");

    if (password !== confirmPassword) {
      const msg = "Passwords do not match.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      const msg =
        "Password must be at least 6 characters long and include both uppercase and lowercase letters.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
      callbackURL: "/auth/signin",
    });

    if (error) {
      setErrorMessage(error?.message || "Signup failed. Please try again.");
      toast.error(error?.message || "Signup failed.");
      return;
    }

    toast.success("Account created successfully!");
    router.push("/auth/signin");
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({ provider: "google" });
    } catch (error) {
      toast.error("Google sign up failed");
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

          {[
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "image", label: "Photo URL", type: "text" },
            { name: "password", label: "Password", type: "password" },
            {
              name: "confirmPassword",
              label: "Confirm Password",
              type: "password",
            },
          ].map((field) => (
            <fieldset key={field.name} className="fieldset">
              <label className="label dark:text-gray-300">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                className="input validator w-full dark:bg-gray-950 dark:border-gray-700 dark:text-white"
                placeholder={field.label}
                required
              />
            </fieldset>
          ))}

          {errorMessage && (
            <p className="mt-2 rounded-md border border-red-500 bg-red-100 dark:bg-red-950/50 px-3 py-2 text-center font-bold text-red-600 dark:text-red-400">
              {errorMessage}
            </p>
          )}

          <button
            className="btn w-full mt-4 bg-blue-600 text-white hover:bg-gray-800 dark:hover:bg-blue-700 border-0"
            type="submit"
          >
            Sign Up
          </button>

          <p className="mt-4 text-center dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-blue-500 hover:underline font-semibold"
            >
              Sign In
            </Link>
          </p>
        </form>
      </ScrollReveal>
    </div>
  );
};

export default SignUpPage;
