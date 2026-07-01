"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  MdSearch,
  MdFilterList,
  MdSort,
  MdClose,
  MdRemoveRedEye,
  MdLocationOn,
  MdPets,
  MdCake,
  MdTransgender,
} from "react-icons/md";
import ScrollReveal from "@/components/ScrollReveal";

const sortOptions = [
  { value: "None", label: "None" },
  { value: "fee-asc", label: "Fee: Low to High" },
  { value: "fee-desc", label: "Fee: High to Low" },
  { value: "name", label: "Name A-Z" },
];

const AllPetsPage = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [species, setSpecies] = useState("all");
  const [sortBy, setSortBy] = useState("None");

  const [allSpecies, setAllSpecies] = useState(["all"]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearch(searchInput);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  useEffect(() => {
    const loadSpecies = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/all-pets`);
        if (res.ok) {
          const allPets = await res.json();
          const uniqueSpecies = ["all", ...new Set(allPets.map((pet) => pet.type))];
          setAllSpecies(uniqueSpecies);
        }
      } catch (err) {
        console.error("Failed to load species", err);
      }
    };
    loadSpecies();
  }, []);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.set("search", search);
        if (species && species !== "all") queryParams.set("species", species);
        if (sortBy && sortBy !== "None") queryParams.set("sortBy", sortBy);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/all-pets?${queryParams.toString()}`
        );
        if (!res.ok) throw new Error("Failed to fetch pets");
        setPets(await res.json());
      } catch (error) {
        toast.error("Error loading pets");
      } finally {
        setIsLoading(false);
        setIsInitialLoading(false);
      }
    };
    load();
  }, [search, species, sortBy]);

  const speciesOptions = allSpecies;
  const filteredPets = pets;

  if (isInitialLoading) {
    return (
      <div className="flex min-h-150 w-full items-center justify-center dark:text-gray-400">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8 dark:bg-gray-950 transition-colors">
      <ScrollReveal>
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            All Pets
          </p>
          <h1 className="mt-2 text-4xl font-bold text-gray-950 dark:text-white">
            Browse all pets available for adoption
          </h1>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm lg:grid-cols-4">
          <div className="relative flex items-center">
            <MdSearch className="absolute left-3 text-gray-400" size={20} />
            <input
              className="input w-full border border-gray-200 dark:border-gray-700 pl-10 dark:bg-gray-950 dark:text-white"
              placeholder="Search name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="relative flex items-center">
            <MdFilterList className="absolute left-3 text-gray-400" size={20} />
            <select
              className="select select-bordered w-full pl-10 dark:bg-gray-950 dark:border-gray-700 dark:text-white"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
            >
              {speciesOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "all" ? "All Species" : opt}
                </option>
              ))}
            </select>
          </div>
          <div className="relative flex items-center">
            <MdSort className="absolute left-3 text-gray-400" size={20} />
            <select
              className="select select-bordered w-full pl-10 dark:bg-gray-950 dark:border-gray-700 dark:text-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 flex items-center gap-2"
            onClick={() => {
              setSearchInput("");
              setSpecies("all");
              setSortBy("None");
            }}
          >
            <MdClose /> Clear Filters
          </button>
        </div>
      </ScrollReveal>

      {isLoading && (
        <div className="flex justify-center mt-6">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
        </div>
      )}

      {filteredPets.length === 0 ? (
        !isLoading && (
          <div className="mt-8 text-center py-16 dark:text-gray-400">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              No pets found
            </p>
          </div>
        )
      ) : (
        <div className={`mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3 transition-opacity duration-200 ${isLoading ? "opacity-40" : "opacity-100"}`}>
          {filteredPets.map((pet, index) => (
            <ScrollReveal key={pet._id} delay={index * 0.1}>
              <article className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-64 w-full">
                  <Image
                    src={pet.image}
                    alt={pet.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold dark:text-white">
                      {pet.name}
                    </h2>
                    <span className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded text-blue-700 dark:text-blue-300 font-bold">
                      {pet.fee}
                    </span>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <MdPets className="text-blue-500" size={16} />{" "}
                        {pet.type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MdTransgender className="text-blue-500" size={16} />{" "}
                        {pet.gender}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MdCake className="text-blue-500" size={16} /> {pet.age}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <MdLocationOn className="text-blue-500" size={16} />{" "}
                        {pet.location}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/all-pets/${pet._id}`}
                    className="flex items-center justify-center gap-2 py-3 bg-blue-200 dark:bg-blue-900/40 rounded-lg font-semibold text-blue-900 dark:text-blue-200 hover:bg-blue-500 hover:text-white transition"
                  >
                    <MdRemoveRedEye /> View Details
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPetsPage;
