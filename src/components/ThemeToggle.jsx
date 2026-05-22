"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => {
        console.log("Current theme:", theme);
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className="w-full h-full p-0 flex justify-center items-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white transition"
    >
      {theme === "dark" ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
    </button>
  );
}
