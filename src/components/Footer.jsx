"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import ScrollReveal from "@/components/ScrollReveal";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div>
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              PetBuddy
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-600 dark:text-gray-400">
              Helping people find loving pets and giving every animal a chance
              at a better home.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Contact Information
            </h3>
            <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p className="flex items-center gap-2">
                <MdEmail className="text-blue-600 dark:text-blue-400" />{" "}
                support@petbuddy.com
              </p>
              <p className="flex items-center gap-2">
                <MdPhone className="text-blue-600 dark:text-blue-400" /> +880
                1234 567890
              </p>
              <p className="flex items-center gap-2">
                <MdLocationOn className="text-blue-600 dark:text-blue-400" />{" "}
                Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Social Links
            </h3>
            <div className="mt-4 flex items-center gap-3">
              {[
                { icon: <FaFacebookF />, href: "https://facebook.com" },
                { icon: <FaInstagram />, href: "https://instagram.com" },
                { icon: <FaXTwitter />, href: "https://x.com" },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 transition hover:bg-blue-100 dark:hover:bg-gray-700"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800">
        <ScrollReveal delay={0.3}>
          <div className="text-center mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 text-sm text-gray-500 dark:text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>Copyright © 2026 PetBuddy. All rights reserved.</p>
            <p>Built with care for happy adoptions.</p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;
