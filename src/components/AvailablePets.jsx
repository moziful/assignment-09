"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdRemoveRedEye, MdArrowForward } from "react-icons/md";
import ScrollReveal from "@/components/ScrollReveal";

const AvailablePets = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/featured-pets`,
        );

        if (!res.ok) throw new Error("Failed to fetch featured pets");

        const data = await res.json();
        setPets(data.slice(0, 6));
      } catch (error) {
        toast.error("Failed to load featured pets");
        console.error("Failed to fetch pets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-100 w-full items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <section
      id="featured-pets"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          Featured Pets
        </p>
        <h2 className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">
          Pets Available For You
        </h2>
      </div>
      <div className="grid gap-6 gap-x-10 md:grid-cols-2 xl:grid-cols-3">
        {pets.map((pet, index) => (
          <ScrollReveal key={pet._id} delay={index * 0.1}>
            <article className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
              <div className="relative h-64 w-full">
                <Image
                  src={pet.image}
                  alt={pet.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold text-gray-950 dark:text-white">
                    {pet.name}
                  </h3>
                  <span className="rounded-md bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
                    {pet.fee}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {pet.type} ● {pet.age} ● {pet.gender}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Location: {pet.location}
                </p>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Link
                    href={`/all-pets/${pet._id}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 px-5 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200 transition hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-400"
                  >
                    <MdRemoveRedEye size={18} />
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
      <div className="flex justify-center w-full">
        <Link
          href="/all-pets"
          className="w-full sm:w-fit px-12 mt-10 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 py-3 text-sm font-semibold bg-blue-600 text-white transition hover:bg-blue-700"
        >
          View All Pets
          <MdArrowForward size={18} />
        </Link>
      </div>
    </section>
  );
};

export default AvailablePets;
