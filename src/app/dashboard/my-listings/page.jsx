"use client";

import Image from "next/image";
import { useState } from "react";

const listings = [
  {
    id: 1,
    name: "Milo",
    price: "$120",
    image: "/pet-hero.jpg",
    status: "Available",
  },
  {
    id: 2,
    name: "Luna",
    price: "$150",
    image: "/pet-hero.jpg",
    status: "Adopted",
  },
  {
    id: 3,
    name: "Coco",
    price: "$110",
    image: "/pet-hero.jpg",
    status: "Available",
  },
];

const requests = [
  {
    id: 1,
    name: "Ayesha Rahman",
    email: "ayesha@example.com",
    date: "2026-05-20",
    status: "Pending",
  },
  {
    id: 2,
    name: "Tanvir Islam",
    email: "tanvir@example.com",
    date: "2026-05-19",
    status: "Approved",
  },
];

export default function MyListingsPage() {
  const [selectedRequests, setSelectedRequests] = useState(null);

  const stats = {
    total: listings.length,
    available: listings.filter((item) => item.status === "Available").length,
    adopted: listings.filter((item) => item.status === "Adopted").length,
  };

  return (
    <section className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-950">My Listings</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-blue-50 p-4">
            <p className="text-sm text-gray-600">Total Listings</p>
            <p className="text-2xl font-bold text-gray-950">{stats.total}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-4">
            <p className="text-sm text-gray-600">Available</p>
            <p className="text-2xl font-bold text-gray-950">
              {stats.available}
            </p>
          </div>
          <div className="rounded-xl bg-amber-50 p-4">
            <p className="text-sm text-gray-600">Adopted</p>
            <p className="text-2xl font-bold text-gray-950">{stats.adopted}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {listings.map((pet) => (
          <article
            key={pet.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="relative h-56 w-full">
              <Image
                src={pet.image}
                alt={pet.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-950">{pet.name}</h2>
                <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                  {pet.price}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Status: {pet.status}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRequests(requests)}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
                >
                  Requests
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
                >
                  View
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedRequests ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-950">Requests</h2>
              <button
                type="button"
                onClick={() => setSelectedRequests(null)}
                className="rounded-xl border border-gray-300 px-3 py-1 text-sm font-semibold text-gray-600"
              >
                Close
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {selectedRequests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <p className="font-semibold text-gray-950">{request.name}</p>
                  <p className="text-sm text-gray-600">{request.email}</p>
                  <p className="text-sm text-gray-600">
                    Pickup Date: {request.date}
                  </p>
                  <p className="text-sm text-gray-600">
                    Status: {request.status}
                  </p>
                  <div className="mt-3 flex gap-2">
                    {request.status === "Pending" ? (
                      <>
                        <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                          Approve
                        </button>
                        <button className="rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-600">
                          Reject
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
