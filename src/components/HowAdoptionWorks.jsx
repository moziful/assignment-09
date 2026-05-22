"use client";

import {
  FaMagnifyingGlass,
  FaFilePen,
  FaHandHoldingHeart,
  FaHouse,
} from "react-icons/fa6";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    icon: <FaMagnifyingGlass />,
    title: "Browse pets",
    text: "Explore pets and find one that matches your home and lifestyle.",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: <FaFilePen />,
    title: "Submit request",
    text: "Send an adoption request with your basic information.",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Meet the pet",
    text: "Connect with the pet and make sure it feels like the right match.",
    color: "text-rose-500 dark:text-rose-400",
  },
  {
    icon: <FaHouse />,
    title: "Bring them home",
    text: "Finish the process and welcome your new family member home.",
    color: "text-amber-600 dark:text-amber-400",
  },
];

const HowAdoptionWorks = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            How Adoption Works
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">
            A simple path to bringing a pet home
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, i) => (
          <ScrollReveal key={i}>
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm transition hover:shadow-md">
              <div className={`text-2xl ${step.color}`}>{step.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-gray-950 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-400">
                {step.text}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default HowAdoptionWorks;
