"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function MyListingsPage() {
  const [listings, setListings] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState(null);

  const { data: session } = authClient.useSession();

  const [editPet, setEditPet] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    fee: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    const load = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch(
          `http://localhost:5000/pets?email=${session.user.email}`,
        );
        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error("Failed to load listings", err);
      }
    };
    load();
  }, [session]);
  const openRequests = async (petId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/adoption-requests/pet/${petId}`,
        {
          headers: {
            authorization: "logged in",
          },
        },
      );

      const data = await res.json();
      setSelectedRequests({
        requests: data,
        petId,
      });
    } catch (err) {
      console.error("Failed to load requests", err);
    }
  };

  const stats = {
    total: listings.length,
    available: listings.filter((p) => p.status !== "adopted").length,
    adopted: listings.filter((p) => p.status === "adopted").length,
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/all-pets/${editPet._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setListings((prev) =>
        prev.map((p) => (p._id === editPet._id ? { ...p, ...editForm } : p)),
      );
      setEditPet(null);
    } catch (err) {
      console.error(err);
    }
  };
  const handleStatusUpdate = async (id, status, petId) => {
    try {
      const res = await fetch(`http://localhost:5000/adoption-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, petId }),
      });

      if (!res.ok) throw new Error("Failed");

      // 🔥 reload requests from server (IMPORTANT)
      const refreshed = await fetch(
        `http://localhost:5000/adoption-requests/pet/${petId}`,
      );
      const data = await refreshed.json();

      setSelectedRequests({
        ...selectedRequests,
        requests: data,
      });

      // 🔥 also reload pets so status updates instantly
      const petsRes = await fetch(
        `http://localhost:5000/pets?email=${session.user.email}`,
      );
      const petsData = await petsRes.json();
      setListings(petsData);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Dashboard
        </p>
        <h1 className="mt-2 text-4xl font-bold text-gray-950">My Listings</h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Manage your pets, track adoption requests, and update listings.
        </p>
      </div>
      <div className="grid gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:grid-cols-3">
        <div>
          <p className="text-sm text-gray-600">Total Listings</p>
          <p className="text-2xl font-bold text-gray-950">{stats.total}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Available</p>
          <p className="text-2xl font-bold text-gray-950">{stats.available}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Adopted</p>
          <p className="text-2xl font-bold text-gray-950">{stats.adopted}</p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {listings.map((pet) => (
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
                <h2 className="text-2xl font-bold text-gray-950">{pet.name}</h2>
                <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                  {pet.fee}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Status: {pet.status || "Available"}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => openRequests(pet._id)}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-700"
                >
                  Requests
                </button>
                <button
                  onClick={() => {
                    setEditPet(pet);
                    setEditForm({
                      name: pet.name,
                      fee: pet.fee,
                      image: pet.image,
                      description: pet.description,
                    });
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-700"
                >
                  Edit
                </button>
                <Link
                  href={`/all-pets/${pet._id}`}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-700 text-center"
                >
                  View
                </Link>
                <button className="flex-1 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:border-red-400">
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {selectedRequests && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-950">
                Adoption Requests
              </h2>
              <button
                onClick={() => setSelectedRequests(null)}
                className="rounded-lg border border-gray-300 px-3 py-1 text-sm"
              >
                Close
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {selectedRequests.requests.length === 0 && (
                <p className="text-sm text-gray-600">No requests yet</p>
              )}
              {selectedRequests.requests.map((r) => (
                <div
                  key={r._id}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <p className="font-semibold text-gray-950">
                    {r.requesterName}
                  </p>
                  <p className="text-sm text-gray-600">{r.requesterEmail}</p>
                  <p className="text-sm text-gray-600">
                    Pickup: {r.pickupDate}
                  </p>
                  <p className="text-sm text-gray-600">
                    Message: {r.description || "No message provided"}
                  </p>
                  {r.status === "pending" && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() =>
                          handleStatusUpdate(r._id, "approved", pet._id)
                        }
                        className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(r._id, "rejected", pet._id)
                        }
                        className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {editPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h2 className="text-xl font-bold">Edit Pet</h2>

            <form onSubmit={handleUpdate} className="mt-4 space-y-3">
              <input
                className="input w-full"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                placeholder="Name"
              />

              <input
                className="input w-full"
                value={editForm.fee}
                onChange={(e) =>
                  setEditForm({ ...editForm, fee: e.target.value })
                }
                placeholder="Fee"
              />

              <input
                className="input w-full"
                value={editForm.image}
                onChange={(e) =>
                  setEditForm({ ...editForm, image: e.target.value })
                }
                placeholder="Image URL"
              />
              <textarea
                className="textarea w-full"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                placeholder="Description"
              />

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditPet(null)}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
