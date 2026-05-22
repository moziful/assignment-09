"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import {
  MdFavoriteBorder,
  MdDateRange,
  MdEvent,
  MdInfoOutline,
  MdRemoveRedEye,
  MdCancel,
  MdPets,
  MdCheckCircle,
  MdWarning,
} from "react-icons/md";
import ScrollReveal from "@/components/ScrollReveal";

export default function MyRequestsPage() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [requestToCancel, setRequestToCancel] = useState(null);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const load = async () => {
      try {
        if (!session?.user?.email) return;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/adoption-requests?email=${session.user.email}`,
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load requests");
        setRows(data);
      } catch (error) {
        toast.error("Failed to load requests");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [session]);

  const handleCancel = async (id) => {
    const request = rows.find((r) => r._id === id);
    if (request && request.status === "approved") {
      toast.error("Approved requests cannot be cancelled.");
      setRequestToCancel(null);
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/adoption-requests/${id}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error("Failed to cancel request");
      setRows((current) => current.filter((item) => item._id !== id));
      toast.success("Request cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel request");
    } finally {
      setRequestToCancel(null);
    }
  };

  return (
    <section className="h-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-sm overflow-y-auto">
      <ScrollReveal>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-950 dark:text-white flex items-center gap-3">
          <MdFavoriteBorder className="text-blue-600 dark:text-blue-400" /> My
          Requests
        </h1>
        <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
          Track and manage your adoption requests.
        </p>
      </ScrollReveal>

      {rows.length === 0 && !isLoading ? (
        <div className="mt-22 flex flex-col items-center justify-center text-center">
          <ScrollReveal>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You haven't made any requests yet.
            </p>
            <Link
              href="/all-pets"
              className="mt-4 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2 text-sm font-semibold text-white"
            >
              <MdPets /> Browse Pets
            </Link>
          </ScrollReveal>
        </div>
      ) : (
        <div className="mt-8">
          <ScrollReveal>
            <div className="hidden md:grid grid-cols-5 gap-4 bg-gray-50 dark:bg-gray-950 px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 rounded-t-xl border border-gray-200 dark:border-gray-800">
              <span>Pet Name</span>
              <span>Request Date</span>
              <span>Pickup Date</span>
              <span>Status</span>
              <span className="text-center">Action</span>
            </div>
          </ScrollReveal>
          <div className="divide-y divide-gray-200 dark:divide-gray-800 border border-gray-200 dark:border-gray-800 md:border-t-0 rounded-b-xl">
            {rows.map((item) => (
              <ScrollReveal key={item._id}>
                <div className="p-4 md:p-0">
                  <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-4 text-sm text-gray-700 dark:text-gray-300 items-center">
                    <span className="font-semibold text-gray-950 dark:text-white flex items-center gap-2">
                      <MdPets className="text-blue-500 dark:text-blue-400" />{" "}
                      {item.petName}
                    </span>
                    <span className="flex items-center gap-1">
                      <MdDateRange className="text-gray-400" />{" "}
                      {item.requestedAt
                        ? new Date(item.requestedAt).toLocaleDateString()
                        : "-"}
                    </span>
                    <span className="flex items-center gap-1">
                      <MdEvent className="text-gray-400" /> {item.pickupDate}
                    </span>
                    <span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${item.status === "approved" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"}`}
                      >
                        {item.status === "approved" ? (
                          <MdCheckCircle />
                        ) : (
                          <MdInfoOutline />
                        )}{" "}
                        {item.status}
                      </span>
                    </span>
                    <div className="flex gap-2 justify-center">
                      <Link
                        href={`/all-pets/${item.petId}`}
                        className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                      >
                        <MdRemoveRedEye size={18} />
                      </Link>
                      {item.status !== "approved" && (
                        <button
                          onClick={() => setRequestToCancel(item._id)}
                          className="p-2 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                        >
                          <MdCancel size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Mobile View */}
                  <div className="md:hidden flex flex-col gap-3 p-4 border dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-950">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg flex items-center gap-2 text-white">
                        <MdPets className="text-blue-500" /> {item.petName}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "approved" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <p className="flex items-center gap-2">
                        <MdDateRange /> Requested:{" "}
                        {new Date(item.requestedAt).toLocaleDateString()}
                      </p>
                      <p className="flex items-center gap-2">
                        <MdEvent /> Pickup: {item.pickupDate}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {requestToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white dark:bg-gray-900 p-6 shadow-2xl text-center border dark:border-gray-800">
            <MdWarning className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Confirm Cancellation
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Are you sure you want to cancel this adoption request?
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setRequestToCancel(null)}
                className="rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Keep Request
              </button>
              <button
                onClick={() => handleCancel(requestToCancel)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
