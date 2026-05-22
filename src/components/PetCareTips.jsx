import {
  FaBowlFood,
  FaSyringe,
  FaShieldDog,
  FaHeart,
  FaHouseChimney,
  FaPersonWalking,
  FaScissors,
  FaWandSparkles,
} from "react-icons/fa6";

const PetCareTips = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Pet Care Tips
        </p>
        <h2 className="mt-2 text-3xl font-bold text-gray-950">
          Simple tips for a happy pet life
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <FaBowlFood className="text-2xl text-blue-600" />
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Keep fresh food and water available every day.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <FaSyringe className="text-2xl text-emerald-600" />
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Stay up to date with vaccinations and vet visits.
          </p>
        </div>
        <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-5 shadow-sm">
          <FaShieldDog className="text-2xl text-cyan-600" />
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Use safe spaces and gentle training from day one.
          </p>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
          <FaHeart className="text-2xl text-rose-500" />
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Give regular playtime and affection to build trust.
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <FaHouseChimney className="text-2xl text-amber-600" />
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Create a cozy home area for rest and recovery.
          </p>
        </div>
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-5 shadow-sm">
          <FaPersonWalking className="text-2xl text-violet-600" />
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Walk or exercise pets to keep them active and healthy.
          </p>
        </div>
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-5 shadow-sm">
          <FaScissors className="text-2xl text-teal-600" />
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Groom regularly to keep fur, nails, and skin clean.
          </p>
        </div>
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
          <FaWandSparkles className="text-2xl text-orange-600" />
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Celebrate small progress and keep a steady routine.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PetCareTips;
