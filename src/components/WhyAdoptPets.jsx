import {
  FaHeart,
  FaShieldHeart,
  FaPaw,
  FaHouse,
  FaDollarSign,
  FaClipboardCheck,
  FaPeopleGroup,
  FaWandSparkles,
} from "react-icons/fa6";

const WhyAdoptPets = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Why Adopt Pets?
        </p>
        <h2 className="mt-2 text-3xl font-bold text-gray-950">
          Small reasons that make a big difference
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
          <FaHeart className="text-2xl text-rose-500" />
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Give a pet a second chance at love.
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <FaShieldHeart className="text-2xl text-emerald-600" />
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Support a humane adoption process.
          </p>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <FaPaw className="text-2xl text-blue-600" />
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Find a loyal companion for life.
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <FaHouse className="text-2xl text-amber-600" />
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Help reduce shelter overcrowding.
          </p>
        </div>
        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 shadow-sm">
          <FaDollarSign className="text-2xl text-violet-600" />
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Save on the cost of buying a pet.
          </p>
        </div>
        <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5 shadow-sm">
          <FaClipboardCheck className="text-2xl text-teal-600" />
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Choose from pets with clear histories.
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5 shadow-sm">
          <FaPeopleGroup className="text-2xl text-cyan-600" />
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Adopt a friend that matches your home.
          </p>
        </div>
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
          <FaWandSparkles className="text-2xl text-orange-600" />
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Experience the joy of making a difference.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyAdoptPets;
