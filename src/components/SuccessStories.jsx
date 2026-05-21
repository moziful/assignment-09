import { FaStar, FaHeart, FaCat, FaDog, FaPaw } from "react-icons/fa6";

const SuccessStories = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Success Stories
        </p>
        <h2 className="mt-2 text-3xl font-bold text-gray-950">
          Happy endings from real adoptions
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <FaCat className="text-2xl text-rose-500" />
            <div className="flex items-center gap-1 text-amber-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Luna settled in quickly and now enjoys quiet naps, soft blankets,
            and gentle daily cuddles with her new family.
          </p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-950">
              Ayesha Rahman Keeps Luna
            </h3>
            <p className="text-sm text-gray-600">Persian Cat</p>
          </div>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <FaDog className="text-2xl text-blue-600" />
            <div className="flex items-center gap-1 text-amber-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Milo is now part of a lively home where long walks, fetch games, and
            warm evening snuggles are part of every day.
          </p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-950">
              Tanvir Islam Keeps Milo
            </h3>
            <p className="text-sm text-gray-600">Golden Retriever</p>
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <FaPaw className="text-2xl text-emerald-600" />
            <div className="flex items-center gap-1 text-amber-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-gray-700">
            Coco went from uncertain days to a safe, loving home where every
            corner feels calm, bright, and predictable.
          </p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-950">
              Mehedi Hasan Keeps Coco
            </h3>
            <p className="text-sm text-gray-600">Italian Turtle</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
