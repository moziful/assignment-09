"use client";

import Link from "next/link";
import { useState } from "react";

const requests = [
  {
    id: 1,
    petName: "Milo",
    requestDate: "2026-05-19",
    pickupDate: "2026-05-22",
    status: "Pending",
  },
  {
    id: 2,
    petName: "Luna",
    requestDate: "2026-05-18",
    pickupDate: "2026-05-21",
    status: "Approved",
  },
  {
    id: 3,
    petName: "Coco",
    requestDate: "2026-05-17",
    pickupDate: "2026-05-23",
    status: "Rejected",
  },
];

export default function MyRequestsPage() {
  const [rows, setRows] = useState(requests);

  const handleCancel = (id) => {
    setRows((current) => current.filter((item) => item.id !== id));
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-gray-950">My Requests</h1>
      <p className="mt-3 text-gray-600">
        Track the pets you requested to adopt and manage each request here.
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">
        <div className="grid grid-cols-5 gap-4 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-600">
          <span>Pet Name</span>
          <span>Request Date</span>
          <span>Pickup Date</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        <div className="divide-y divide-gray-200">
          {rows.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-5 gap-4 px-4 py-4 text-sm text-gray-700"
            >
              <span className="font-semibold text-gray-950">
                {item.petName}
              </span>
              <span>{item.requestDate}</span>
              <span>{item.pickupDate}</span>
              <span>
                <span
                  className={`rounded-xl px-3 py-1 text-xs font-semibold ${
                    item.status === "Pending"
                      ? "bg-amber-100 text-amber-700"
                      : item.status === "Approved"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {item.status}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Link
                  href={`/all-pets/${item.id}`}
                  className="rounded-xl border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700"
                >
                  View
                </Link>
                <button
                  type="button"
                  onClick={() => handleCancel(item.id)}
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
