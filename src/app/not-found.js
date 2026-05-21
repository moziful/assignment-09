import Link from "next/link";
import { MdOutlinePets } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl rounded-3xl border border-blue-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl text-red-500">
          <MdOutlinePets />
        </div>

        <p className="mb-2 font-semibold uppercase tracking-[0.3em] text-red-400">
          404 Not Found
        </p>

        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Oops! this pet ran away.
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-600">
          The page you are looking for does not exist or may have been moved.
          Let&apos;s see which pet is here for you!
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="btn rounded-full border-0 bg-blue-500 px-6 text-white hover:bg-blue-600"
          >
            Back to Home
          </Link>
          <Link
            href="/all-pets"
            className="btn rounded-full border border-gray-300 bg-white px-6 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
          >
            Browse Pets
          </Link>
        </div>
      </div>
    </div>
  );
}
