"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlinePets } from "react-icons/md";
import { authClient } from "@/lib/auth-client";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/all-pets", label: "All Pets" },
  { href: "/dashboard/my-requests", label: "My Requests" },
  { href: "/dashboard/add-pet", label: "Add Pet" },
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
    `rounded-full border px-4 py-2 text-sm font-medium transition ${
      pathname === href
        ? "border-blue-500 text-blue-700"
        : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900"
    }`;

  const handleSignOut = async () => {
    await authClient.signOut();
    setMobileMenuOpen(false);
  };

  return (
    <div className="navbar sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-3xl font-black text-white shadow-lg shadow-blue-500/20">
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
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
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
                <span className="max-w-28 truncate text-sm font-medium">
                  {userName}
                </span>
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 w-52 rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
              >
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button type="button" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="btn bg-blue-500 rounded-full px-6 text-white"
            >
              Sign In
            </Link>
          )}
        </div>
        <div className="dropdown dropdown-end lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="btn btn-ghost rounded-full bg-white p-4 text-gray-700"
            aria-expanded={mobileMenuOpen}
            aria-haspopup="menu"
          >
            <GiHamburgerMenu />
          </button>
          <div
            className={`dropdown-content mt-3 w-72 rounded-xl border border-gray-200 bg-white p-3 shadow-xl ${
              mobileMenuOpen ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClass(item.href)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 border-t border-gray-200 pt-3">
              {isLoggedIn ? (
                <div className="flex items-center gap-3 rounded-xl px-3 py-2">
                  {canUseUserImage ? (
                    <Image
                      src={userImage}
                      alt={userName}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {userName}
                    </p>
                    <Link
                      href="/dashboard"
                      className="text-sm text-blue-600 hover:underline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="mt-1 text-sm text-gray-600 hover:text-gray-900 hover:underline"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="btn bg-blue-500 w-full rounded-full text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
