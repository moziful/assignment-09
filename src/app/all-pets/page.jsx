"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const sortOptions = [
  { value: "None", label: "None" },
  { value: "fee-asc", label: "Fee: Low to High" },
  { value: "fee-desc", label: "Fee: High to Low" },
  { value: "name", label: "Name A-Z" },
];

const AllPetsPage = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/all-pets`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch pets");
        }

        const data = await res.json();
        setPets(data);
      } catch (error) {
        console.error("Error loading pets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  const handleClearFilters = () => {
    setSearch("");
    setSpecies("all");
    setSortBy("latest");
  };

  const speciesOptions = useMemo(
    () => ["all", ...new Set(pets.map((pet) => pet.type))],
    [pets],
  );

  const filteredPets = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = pets.filter((pet) => {
      const matchesSearch =
        !normalizedSearch || pet.name.toLowerCase().includes(normalizedSearch);

      const matchesSpecies = species === "all" || pet.type === species;

      return matchesSearch && matchesSpecies;
    });

    const sortedPets = [...result];

    if (sortBy === "fee-asc") {
      sortedPets.sort(
        (a, b) =>
          Number(a.fee.replace(/\D/g, "")) - Number(b.fee.replace(/\D/g, "")),
      );
    }

    if (sortBy === "fee-desc") {
      sortedPets.sort(
        (a, b) =>
          Number(b.fee.replace(/\D/g, "")) - Number(a.fee.replace(/\D/g, "")),
      );
    }

    if (sortBy === "name") {
      sortedPets.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sortedPets;
  }, [pets, search, species, sortBy]);

  if (isLoading) {
    return (
      <div className="flex min-h-150 w-full items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          All Pets
        </p>
        <h1 className="mt-2 text-4xl font-bold text-gray-950">
          Browse all pets available for adoption
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Search by name, filter by species, and sort the listings to find the
          right companion faster.
        </p>
      </div>

      <div className="grid gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:grid-cols-4">
        <label className="fieldset">
          <span className="label">Search by name</span>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="input validator"
            placeholder="Search pets"
          />
        </label>

        <label className="fieldset">
          <span className="label">Filter by species</span>
          <select
            value={species}
            onChange={(event) => setSpecies(event.target.value)}
            className="select select-bordered w-full"
          >
            {speciesOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All Species" : option}
              </option>
            ))}
          </select>
        </label>

        <label className="fieldset">
          <span className="label">Sort</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="select select-bordered w-full"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="fieldset">
          <span className="label opacity-0">Clear Filters</span>
          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex items-center gap-2 rounded-sm h-10 text-sm px-4 border bg-red-50 border-red-300"
          >
            <span aria-hidden="true">×</span>
            Clear filters
          </button>
        </label>
      </div>

      {filteredPets.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-16 shadow-sm">
          <p className="text-lg font-semibold text-gray-900">No pets found</p>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPets.map((pet) => (
            <article
              key={pet._id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
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
                  <div>
                    <h2 className="text-2xl font-bold text-gray-950">
                      {pet.name}
                    </h2>
                    <p className="text-sm text-gray-600">{pet.type}</p>
                  </div>
                  <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                    {pet.fee}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {pet.age} • {pet.gender} • {pet.location}
                </p>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Link
                    href={`/all-pets/${pet._id}`}
                    className="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 transition hover:border-blue-300 hover:text-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPetsPage;
