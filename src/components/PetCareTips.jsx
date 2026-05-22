"use client";

import {
  FaBowlFood,
  FaSyringe,
  FaShieldDog,
  FaHeart,
  FaHouseChimney,
  FaPersonWalking,
  FaScissors,
  FaWandSparkles,
} from "react-icons/fa6";
import ScrollReveal from "@/components/ScrollReveal";

const tips = [
  {
    icon: <FaBowlFood />,
    text: "Keep fresh food and water available every day.",
    color: "blue",
  },
  {
    icon: <FaSyringe />,
    text: "Stay up to date with vaccinations and vet visits.",
    color: "emerald",
  },
  {
    icon: <FaShieldDog />,
    text: "Use safe spaces and gentle training from day one.",
    color: "cyan",
  },
  {
    icon: <FaHeart />,
    text: "Give regular playtime and affection to build trust.",
    color: "rose",
  },
  {
    icon: <FaHouseChimney />,
    text: "Create a cozy home area for rest and recovery.",
    color: "amber",
  },
  {
    icon: <FaPersonWalking />,
    text: "Walk or exercise pets to keep them active and healthy.",
    color: "violet",
  },
  {
    icon: <FaScissors />,
    text: "Groom regularly to keep fur, nails, and skin clean.",
    color: "teal",
  },
  {
    icon: <FaWandSparkles />,
    text: "Celebrate small progress and keep a steady routine.",
    color: "orange",
  },
];

const cardStyles = {
  blue: "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/20 dark:text-blue-400",
  emerald:
    "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-400",
  cyan: "border-cyan-200 bg-cyan-50 text-cyan-600 dark:border-cyan-900/50 dark:bg-cyan-950/20 dark:text-cyan-400",
  rose: "border-rose-200 bg-rose-50 text-rose-500 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-400",
  amber:
    "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-400",
  violet:
    "border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-900/50 dark:bg-violet-950/20 dark:text-violet-400",
  teal: "border-teal-200 bg-teal-50 text-teal-600 dark:border-teal-900/50 dark:bg-teal-950/20 dark:text-teal-400",
  orange:
    "border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-900/50 dark:bg-orange-950/20 dark:text-orange-400",
};

const PetCareTips = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Pet Care Tips
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">
            Simple tips for a happy pet life
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tips.map((tip, i) => (
          <ScrollReveal key={i}>
            <div
              className={`rounded-xl border p-5 shadow-sm transition ${cardStyles[tip.color]}`}
            >
              <div className="text-2xl">{tip.icon}</div>
              <p className="mt-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
                {tip.text}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default PetCareTips;
