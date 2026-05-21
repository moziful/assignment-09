import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="mx-auto mt-10 grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <p className="mb-5 inline-flex w-fit items-center rounded-md bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          Meet your next best friend
        </p>
        <h1 className="max-w-xl text-4xl font-black tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
          Bring home a pet that fits your life and fills it with joy.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
          Discover lovable pets, connect with their stories, and take the next
          step toward adoption with a smoother, happier experience.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/all-pets"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/40 transition hover:bg-blue-700"
          >
            Adopt Now
          </Link>
          <Link
            href="/add-pet"
            className="inline-flex items-center justify-center rounded-full bg-blue-100 px-6 py-3 text-base font-semibold text-blue-700 shadow-lg shadow-blue-600/20 transition hover:bg-blue-200"
          >
            Add a pet
          </Link>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
        <div className="absolute rounded-3xl bg-blue-500/10 blur-3xl" />
        <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-gray-200/60">
          <Image
            src="/pet-hero.jpg"
            alt="Cute pet for adoption"
            width={200}
            height={200}
            className="h-auto w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
