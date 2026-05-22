"use client";

import Image from "next/image";
import Link from "next/link";
import { MdPets, MdAddCircleOutline } from "react-icons/md";
import ScrollReveal from "@/components/ScrollReveal";

const Hero = () => {
  return (
    <section className="mx-auto mt-10 grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
      <ScrollReveal>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <p className="mb-5 inline-flex w-fit items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-4 py-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
            Meet your next best friend
          </p>
          <h1 className="max-w-xl text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl lg:text-6xl text-center sm:text-left">
            Bring home a pet that fits your life and fills it with joy.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400 text-center sm:text-left">
            Discover lovable pets, connect with their stories, and take the next
            step toward adoption with a smoother, happier experience.
          </p>
          <div className="mt-8 flex gap-4 items-center justify-center md:justify-start">
            <Link
              href="/all-pets"
              className="inline-flex items-center gap-2 justify-center rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/40 transition hover:bg-blue-700"
            >
              <MdPets /> Adopt Now
            </Link>
            <Link
              href="/add-pet"
              className="inline-flex items-center gap-2 justify-center rounded-xl bg-blue-100 dark:bg-gray-800 px-6 py-3 text-base font-semibold text-blue-700 dark:text-blue-300 shadow-lg shadow-blue-600/20 transition hover:bg-blue-200 dark:hover:bg-gray-700"
            >
              <MdAddCircleOutline /> Add a pet
            </Link>
          </div>
        </div>
      </ScrollReveal>
      <div className="relative mx-auto w-full md:max-w-xl lg:max-w-md">
        <div className="absolute rounded-3xl bg-blue-500/10 blur-3xl" />
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-xl shadow-xl shadow-gray-200/60 dark:shadow-black/40">
            <Image
              src="/pet-hero.jpg"
              alt="Cute pet for adoption"
              width={500}
              height={500}
              className="h-auto w-full rounded-xl object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Hero;
