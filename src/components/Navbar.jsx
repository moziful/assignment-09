"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
// Standard icons that are part of the core react-icons package
import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdOutlinePets,
  MdDashboard,
  MdOutlineAddCircleOutline,
  MdLogin,
  MdLogout,
  MdHome,
  MdList,
  MdFavoriteBorder,
} from "react-icons/md";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const navItems = [
  { href: "/", label: "Home", icon: <MdHome /> },
  { href: "/dashboard", label: "Dashboard", icon: <MdDashboard /> },
  { href: "/all-pets", label: "All Pets", icon: <MdList /> },
  {
    href: "/dashboard/my-requests",
    label: "My Requests",
    icon: <MdFavoriteBorder />,
  },
  {
    href: "/dashboard/add-pet",
    label: "Add Pet",
    icon: <MdOutlineAddCircleOutline />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const isLoggedIn = Boolean(session?.user);
  const userName = session?.user?.name || "User";
  const userImage = session?.user?.image;
  const canUseUserImage =
    typeof userImage === "string" && /^https?:\/\//i.test(userImage.trim());

  const linkClass = (href) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${
      pathname === href
        ? "border-blue-500 text-blue-700"
        : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-800"
    }`;

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setMobileMenuOpen(false);
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <div className="navbar sticky top-0 z-50 border-b border-gray-200/80 bg-white dark:bg-gray-900 dark:border-gray-800 backdrop-blur">
      {" "}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-3xl font-black text-white shadow-lg shadow-blue-500/20">
            <MdOutlinePets />
          </span>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            Pet<span className="text-blue-600">Buddy</span>
          </p>{" "}
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(item.href)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="w-10 h-10 border border-gray-200 dark:border-gray-700 rounded-full">
            <ThemeToggle />
          </div>
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 pl-1 py-1 text-gray-700 dark:text-gray-200 hover:border-blue-300 dark:hover:bg-gray-700"
              >
                {canUseUserImage ? (
                  <Image
                    src={userImage}
                    alt={userName}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {userName}
                </span>
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 w-52 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:text-white p-2 shadow-xl"
              >
                <li>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <MdDashboard /> Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex items-center gap-2"
                  >
                    <MdLogout /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="btn bg-blue-500 rounded-full px-6 text-white flex items-center gap-2"
            >
              <MdLogin /> Sign In
            </Link>
          )}
        </div>

        <div className="dropdown dropdown-end lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 border border-gray-200 dark:border-gray-700 rounded-full">
              <ThemeToggle />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="btn btn-ghost rounded-full bg-white dark:bg-gray-800 dark:text-white h-10 w-10 p-0 text-gray-700"
            >
              <GiHamburgerMenu />
            </button>
          </div>
          <div
            className={`dropdown-content mt-3 w-72 rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:text-white p-3 shadow-xl ${mobileMenuOpen ? "block" : "hidden"}`}
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClass(item.href)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 border-t border-gray-200 pt-3">
              {isLoggedIn ? (
                <div className="flex items-center justify-between gap-3 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                    <p className="font-semibold text-gray-900 dark:text-gray-300">
                      {userName}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <MdLogout size={20} />
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="btn bg-blue-500 w-full rounded-full text-white flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MdLogin /> Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
