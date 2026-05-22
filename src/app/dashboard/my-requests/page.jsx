"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function MyRequestsPage() {
  const [rows, setRows] = useState([]);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const load = async () => {
      try {
        if (!session?.user?.email) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/adoption-requests?email=${session.user.email}`,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load requests");
        }

        setRows(data);
      } catch (error) {
        console.error("Failed to load requests:", error);
      }
    };

    load();
  }, [session]);

  const handleCancel = async (id) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/adoption-requests/${id}`,
        {
          method: "DELETE",
        },
      );

      setRows((current) => current.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to cancel request", error);
    }
  };

  return (
    <section className="min-h-140 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-gray-950">My Requests</h1>
      <p className="mt-3 text-gray-600">
        Track the pets you requested to adopt and manage each request here.
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">
        {/* HEADER */}
        <div className="grid grid-cols-5 gap-4 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-600">
          <span>Pet Name</span>
          <span>Request Date</span>
          <span>Pickup Date</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {/* ROWS */}
        <div className="divide-y divide-gray-200">
          {rows.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-5 gap-4 px-4 py-4 text-sm text-gray-700"
            >
              <span className="font-semibold text-gray-950">
                {item.petName}
              </span>

              <span>
                {item.requestedAt
                  ? new Date(item.requestedAt).toLocaleDateString()
                  : "-"}
              </span>

              <span>{item.pickupDate}</span>

              <span>
                <span
                  className={`rounded-xl px-3 py-1 text-xs font-semibold ${
                    item.status === "pending"
                      ? "bg-amber-100 text-amber-700"
                      : item.status === "approved"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {item.status}
                </span>
              </span>

              <span className="flex items-center gap-2">
                <Link
                  href={`/all-pets/${item.petId}`}
                  className="rounded-xl border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700"
                >
                  View
                </Link>

                <button
                  type="button"
                  onClick={() => handleCancel(item._id)}
                  className="rounded-xl border border-red-300 px-3 py-2 text-xs font-semibold text-red-600"
                >
                  Cancel
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
