"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdFavoriteBorder,
  MdAddCircleOutline,
  MdList,
} from "react-icons/md";
import DashboardGuard from "@/components/DashboardGuard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollReveal from "@/components/ScrollReveal";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: <MdDashboard /> },
  {
    href: "/dashboard/my-requests",
    label: "My Requests",
    icon: <MdFavoriteBorder />,
  },
  {
    href: "/dashboard/add-pet",
    label: "Add Pet",
    icon: <MdAddCircleOutline />,
  },
  { href: "/dashboard/my-listings", label: "My Listings", icon: <MdList /> },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <DashboardGuard>
      <div className="lg:h-[calc(100vh-4rem)] flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full p-8 overflow-hidden">
          {/* Sidebar */}
          <div className="lg:col-span-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <ScrollReveal>
              <h2 className="px-3 text-lg font-bold text-gray-950 dark:text-white">
                Dashboard
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <nav className="grid grid-cols-2 justify-center items-center text-center lg:text-left lg:grid-cols-1 mt-4 space-y-2">
                {navItems.map((item) => (
                  <ScrollReveal key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center justify-center lg:justify-start gap-3 rounded-full px-5 py-2 text-sm transition ${
                        pathname === item.href
                          ? "bg-blue-100 dark:bg-blue-900/40 font-semibold text-blue-700 dark:text-blue-300"
                          : "font-medium text-gray-700 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-300"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </Link>
                  </ScrollReveal>
                ))}
              </nav>
            </ScrollReveal>
          </div>

          {/* Main Content Area */}
          <main className="lg:col-span-2 h-full overflow-hidden overflow-y-auto rounded-xl bg-gray-50 dark:bg-gray-950 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {children}
          </main>
        </div>
      </div>
      <ToastContainer theme="colored" />
    </DashboardGuard>
  );
}
