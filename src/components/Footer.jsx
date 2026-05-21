import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-xl font-bold text-blue-600">PetBuddy</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-gray-600">
            Helping people find loving pets and giving every animal a chance at
            a better home.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Contact Information
          </h3>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>Email: support@petbuddy.com</p>
            <p>Phone: +880 1234 567890</p>
            <p>Address: Dhaka, Bangladesh</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Social Links
          </h3>
          <div className="mt-4 flex items-center gap-3">
            <Link
              href="https://facebook.com"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition hover:bg-blue-100"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://instagram.com"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition hover:bg-blue-100"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://x.com"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition hover:bg-blue-100"
            >
              <FaXTwitter />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Copyright © 2026 PetBuddy. All rights reserved.</p>
          <p>Built with care for happy adoptions.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
