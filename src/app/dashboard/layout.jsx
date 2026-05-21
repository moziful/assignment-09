import Link from "next/link";
import DashboardGuard from "@/components/DashboardGuard";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/my-requests", label: "My Requests" },
  { href: "/dashboard/add-pet", label: "Add Pet" },
  { href: "/dashboard/my-listings", label: "My Listings" },
];

export default function DashboardLayout({ children }) {
  return (
    <DashboardGuard>
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="w-full max-w-xs shrink-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="px-3 text-lg font-bold text-gray-950">Dashboard</h2>
          <nav className="mt-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </DashboardGuard>
  );
}
