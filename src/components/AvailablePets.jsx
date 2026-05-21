import Image from "next/image";
import Link from "next/link";

const pets = [
  {
    id: 1,
    image: "/pet-hero.jpg",
    name: "Milo",
    type: "Golden Retriever",
    age: "2 years",
    gender: "Male",
    location: "Dhaka",
    fee: "$120",
  },
  {
    id: 2,
    image: "/pet-hero.jpg",
    name: "Luna",
    type: "Persian Cat",
    age: "1 year",
    gender: "Female",
    location: "Chattogram",
    fee: "$150",
  },
  {
    id: 3,
    image: "/pet-hero.jpg",
    name: "Coco",
    type: "Italian Turtle",
    age: "3 years",
    gender: "Female",
    location: "Sylhet",
    fee: "$110",
  },
  {
    id: 4,
    image: "/pet-hero.jpg",
    name: "Bella",
    type: "Golden Retriever",
    age: "4 years",
    gender: "Female",
    location: "Rajshahi",
    fee: "$130",
  },
  {
    id: 5,
    image: "/pet-hero.jpg",
    name: "Rocky",
    type: "Siberian Husky",
    age: "3 years",
    gender: "Male",
    location: "Khulna",
    fee: "$140",
  },
  {
    id: 6,
    image: "/pet-hero.jpg",
    name: "Penny",
    type: "Tabby Cat",
    age: "10 months",
    gender: "Female",
    location: "Barishal",
    fee: "$100",
  },
  {
    id: 7,
    image: "/pet-hero.jpg",
    name: "Bruno",
    type: "French Bulldog",
    age: "5 years",
    gender: "Male",
    location: "Mymensingh",
    fee: "$160",
  },
  {
    id: 8,
    image: "/pet-hero.jpg",
    name: "Nina",
    type: "Calico Cat",
    age: "2 years",
    gender: "Female",
    location: "Cumilla",
    fee: "$125",
  },
];

const AvailablePets = () => {
  return (
    <section
      id="featured-pets"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          featureed pets
        </p>
        <h2 className="mt-2 text-3xl font-bold text-gray-950">
          Pets Available For You
        </h2>
      </div>

      <div className="grid gap-6 gap-x-10 md:grid-cols-2 xl:grid-cols-3">
        {pets.map((pet) => (
          <article
            key={pet.id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white hover:bg-blue-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-64 w-full">
              <Image
                src={pet.image}
                alt={pet.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3 p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-bold text-gray-950">{pet.name}</h3>
                <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                  {pet.fee}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                {pet.type} ● {pet.age} ● {pet.gender}
              </p>

              <p className="text-sm text-gray-600">Location: {pet.location}</p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Link
                  href={`/all-pets/${pet.id}`}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 transition hover:border-blue-300 hover:text-blue-700"
                >
                  View Details
                </Link>
                <Link
                  href="/all-pets"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Adopt Now
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AvailablePets;
