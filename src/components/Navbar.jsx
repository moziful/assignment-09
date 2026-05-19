"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlinePets } from "react-icons/md";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/all-pets", label: "All Pets" },
  { href: "/my-requests", label: "My Requests" },
  { href: "/add-pet", label: "Add Pet" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isLoggedIn = false;

  const linkClass = (href) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition ${
      pathname === href
        ? "border-emerald-500 text-emerald-700"
        : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900"
    }`;

  return (
    <div className="navbar sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-3xl font-black text-white shadow-lg shadow-emerald-500/20">
            <MdOutlinePets />
          </span>
          <p className="text-xl font-semibold text-gray-900">PetBuddy</p>
        </Link>
        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <button
                type="button"
                className="btn border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50"
              >
                Profile
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 w-52 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl"
              >
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button type="button">Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              href="/login"
              className="btn btn-success rounded-full px-6 text-white"
            >
              Login
            </Link>
          )}
        </div>
        <div className="dropdown dropdown-end lg:hidden">
          <button
            type="button"
            className="btn btn-ghost rounded-full bg-white p-4 text-gray-700"
          >
            <GiHamburgerMenu />
          </button>
          <div
            tabIndex={0}
            className="dropdown-content mt-3 w-72 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClass(item.href)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 border-t border-gray-200 pt-3">
              {isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/dashboard"
                    className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    className="rounded-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="btn btn-success w-full rounded-full text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
