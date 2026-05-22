import {
  FaMagnifyingGlass,
  FaFilePen,
  FaHandHoldingHeart,
  FaHouse,
} from "react-icons/fa6";

const HowAdoptionWorks = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          How Adoption Works
        </p>
        <h2 className="mt-2 text-3xl font-bold text-gray-950">
          A simple path to bringing a pet home
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <FaMagnifyingGlass className="text-2xl text-blue-600" />
          <h3 className="mt-4 text-lg font-semibold text-gray-950">
            Browse pets
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            Explore pets and find one that matches your home and lifestyle.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <FaFilePen className="text-2xl text-emerald-600" />
          <h3 className="mt-4 text-lg font-semibold text-gray-950">
            Submit request
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            Send an adoption request with your basic information.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <FaHandHoldingHeart className="text-2xl text-rose-500" />
          <h3 className="mt-4 text-lg font-semibold text-gray-950">
            Meet the pet
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            Connect with the pet and make sure it feels like the right match.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <FaHouse className="text-2xl text-amber-600" />
          <h3 className="mt-4 text-lg font-semibold text-gray-950">
            Bring them home
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            Finish the process and welcome your new family member home.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowAdoptionWorks;
