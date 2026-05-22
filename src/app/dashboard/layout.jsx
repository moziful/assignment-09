"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardGuard from "@/components/DashboardGuard";

const navItems = [
  { href: "/dashboard/my-requests", label: "My Requests" },
  { href: "/dashboard/add-pet", label: "Add Pet" },
  { href: "/dashboard/my-listings", label: "My Listings" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  return (
    <DashboardGuard>
      <div className="mx-auto grid gap-6 lg:grid-cols-3 w-full max-w-7xl justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="px-3 text-lg font-bold text-gray-950">Dashboard</h2>
          <nav className="mt-4 space-y-2 flex gap-3 lg:block">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex justify-start items-center rounded-full px-5 py-2 text-sm transition ${
                    isActive
                      ? "bg-blue-100 font-semibold text-blue-700"
                      : "font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <main className="min-w-0 lg:col-span-2">{children}</main>
      </div>
    </DashboardGuard>
  );
}
