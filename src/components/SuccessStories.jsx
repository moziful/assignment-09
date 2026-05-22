"use client";

import { FaStar, FaCat, FaDog, FaPaw } from "react-icons/fa6";
import ScrollReveal from "@/components/ScrollReveal";

const SuccessStories = () => {
  const stories = [
    {
      icon: <FaCat />,
      color: "rose",
      text: "Luna settled in quickly and now enjoys quiet naps, soft blankets, and gentle daily cuddles with her new family.",
      name: "Ayesha Rahman Keeps Luna",
      breed: "Persian Cat",
    },
    {
      icon: <FaDog />,
      color: "blue",
      text: "Milo is now part of a lively home where long walks, fetch games, and warm evening snuggles are part of every day.",
      name: "Tanvir Islam Keeps Milo",
      breed: "Golden Retriever",
    },
    {
      icon: <FaPaw />,
      color: "emerald",
      text: "Coco went from uncertain days to a safe, loving home where every corner feels calm, bright, and predictable.",
      name: "Mehedi Hasan Keeps Coco",
      breed: "Italian Turtle",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          Success Stories
        </p>
        <h2 className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">
          Happy endings from real adoptions
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stories.map((story, i) => (
          <ScrollReveal key={i}>
            <div
              className={`rounded-xl border p-5 shadow-sm 
              ${story.color === "rose" ? "border-rose-200 bg-rose-50 dark:border-rose-900/50 dark:bg-rose-950/20" : ""}
              ${story.color === "blue" ? "border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/20" : ""}
              ${story.color === "emerald" ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/20" : ""}
            `}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`text-2xl ${story.color === "rose" ? "text-rose-500" : story.color === "blue" ? "text-blue-600" : "text-emerald-600"}`}
                >
                  {story.icon}
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, j) => (
                    <FaStar key={j} />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
                {story.text}
              </p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-950 dark:text-white">
                  {story.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {story.breed}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
