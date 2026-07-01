"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import ScrollReveal from "@/components/ScrollReveal";
import {
  MdPets,
  MdOutlineRequestQuote,
  MdCheckCircle,
  MdCancel,
  MdHistory,
  MdInfoOutline,
} from "react-icons/md";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    pets: 0,
    requests: 0,
    approved: 0,
    rejected: 0,
    rawReqs: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!session?.user?.email) return;
      setIsLoading(true);
      try {
        const [petsRes, reqsRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/pets?email=${session.user.email}`,
            { credentials: "include" }
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/adoption-requests?email=${session.user.email}`,
            { credentials: "include" }
          ),
        ]);

        const pets = await petsRes.json();
        const reqs = await reqsRes.json();

        setStats({
          pets: pets.length,
          requests: reqs.length,
          approved: reqs.filter((r) => r.status === "approved").length,
          rejected: reqs.filter((r) => r.status === "rejected").length,
          rawReqs: reqs.sort(
            (a, b) => new Date(b.requestedAt) - new Date(a.requestedAt),
          ),
        });
      } catch (error) {
        toast.error("Failed to load dashboard summary");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, [session]);

  if (isLoading)
    return (
      <div className="flex min-h-[300px] w-full items-center justify-center dark:text-gray-400">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>{" "}
      </div>
    );

  return (
    <section className="h-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <ScrollReveal>
        <h1 className="text-3xl font-bold text-gray-950 dark:text-white">
          Dashboard
        </h1>
      </ScrollReveal>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: "My Pets",
            v: stats.pets,
            c: "text-blue-600 dark:text-blue-400",
            icon: <MdPets />,
          },
          {
            label: "Total Requests",
            v: stats.requests,
            c: "text-gray-900 dark:text-gray-100",
            icon: <MdOutlineRequestQuote />,
          },
          {
            label: "Approved",
            v: stats.approved,
            c: "text-emerald-600 dark:text-emerald-400",
            icon: <MdCheckCircle />,
          },
          {
            label: "Rejected",
            v: stats.rejected,
            c: "text-rose-600 dark:text-rose-400",
            icon: <MdCancel />,
          },
        ].map((item, i) => (
          <ScrollReveal key={i}>
            <div className="rounded-xl border border-gray-100 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-950">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {item.icon}
                {item.label}
              </div>
              <p className={`mt-2 text-4xl font-bold ${item.c}`}>{item.v}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Distribution Section */}
      <div className="mt-8">
        <ScrollReveal>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MdInfoOutline /> Request Distribution
          </h3>
        </ScrollReveal>
        <ScrollReveal>
          <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full flex overflow-hidden">
            <div
              style={{
                width: `${(stats.approved / (stats.requests || 1)) * 100}%`,
              }}
              className="bg-emerald-500"
            />
            <div
              style={{
                width: `${(stats.rejected / (stats.requests || 1)) * 100}%`,
              }}
              className="bg-rose-500"
            />
            <div
              style={{
                width: `${((stats.requests - (stats.approved + stats.rejected)) / (stats.requests || 1)) * 100}%`,
              }}
              className="bg-amber-400"
            />
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="flex gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>● Approved</span>
            <span>● Rejected</span>
            <span>● Pending</span>
          </div>
        </ScrollReveal>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <ScrollReveal>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MdHistory /> Most Recent Activity
          </h3>
        </ScrollReveal>
        <ScrollReveal>
          <div className="space-y-3">
            {stats.rawReqs.slice(0, 5).map((r) => (
              <div
                key={r._id}
                className="flex justify-between items-center p-2 px-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
              >
                <p className="font-medium text-gray-950 dark:text-gray-200">
                  Requested {r.petName}
                  <span className="text-gray-500 dark:text-gray-500 font-normal ml-2">
                    {new Date(r.requestedAt).toLocaleDateString()}
                  </span>
                </p>
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    r.status === "approved"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                      : r.status === "rejected"
                        ? "bg-rose-100 dark:bg-rose-900/30 text-red-600 dark:text-rose-400"
                        : "bg-amber-100 dark:bg-amber-900/30 text-orange-600 dark:text-amber-400"
                  }`}
                >
                  {r.status.toUpperCase()}
                </span>
              </div>
            ))}
            {stats.rawReqs.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No recent activity.
              </p>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
