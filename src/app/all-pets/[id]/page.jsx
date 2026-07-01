"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import ScrollReveal from "@/components/ScrollReveal";
import {
  MdArrowBack,
  MdPets,
  MdCake,
  MdTransgender,
  MdHealing,
  MdCategory,
  MdOutlinePets,
  MdMedicalServices,
  MdLocationOn,
  MdDescription,
  MdClose,
  MdPerson,
  MdEmail,
  MdCalendarToday,
  MdMessage,
  MdFavorite,
} from "react-icons/md";

export default function PetDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAdoptForm, setShowAdoptForm] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!params?.id) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    const load = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/all-pets/${params.id}`,
        );
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.error || "Failed to load pet details");
        setPet(data);
      } catch (error) {
        toast.error("Failed to load pet details");
        setPet(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params?.id]);

  const handleOpenAdoptForm = () => {
    if (!session?.user) {
      toast.info("Please sign in to request adoption");
      router.push("/auth/signin");
      return;
    }
    setShowAdoptForm(true);
  };

  const handleAdopt = async (event) => {
    event.preventDefault();
    if (!pickupDate || !message.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const payload = {
        petId: pet._id,
        petName: pet.name,
        petImage: pet.image,
        requesterName: session?.user?.name,
        requesterEmail: session?.user?.email,
        ownerEmail: pet.ownerEmail || "",
        message,
        pickupDate,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/adoption-requests`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error("Failed to create request");

      toast.success("Adoption request sent successfully!");
      setShowAdoptForm(false);
      router.push("/dashboard/my-requests");
    } catch (error) {
      toast.error(error.message || "Failed to submit request");
    }
  };

  if (loading)
    return (
      <div className="flex min-h-100 w-full items-center justify-center gap-2 dark:text-gray-400">
        <MdPets className="animate-pulse" size={24} />{" "}
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );

  if (!pet)
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-16">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center shadow-sm">
          <MdPets className="mx-auto mb-4 text-gray-400" size={48} />
          <h1 className="text-2xl font-bold text-gray-950 dark:text-white">
            Pet not found
          </h1>
          <Link
            href="/all-pets"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
          >
            <MdArrowBack /> Back to All Pets
          </Link>
        </div>
      </div>
    );

  const isAdopted = pet.status === "adopted";
  const isOwner = session?.user?.email === pet.ownerEmail;

  return (
    <div className="mx-auto w-full min-h-160 max-w-7xl px-4 py-4 sm:px-6 lg:px-8 dark:bg-gray-950 transition-colors">
      <div className="mb-8">
        <Link
          href="/all-pets"
          className="flex items-center gap-1 w-max text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          <MdArrowBack /> Back to All Pets
        </Link>
        <h1 className="mt-3 text-4xl font-bold text-gray-950 dark:text-white flex items-center gap-3">
          <MdPets className="text-blue-600 dark:text-blue-400" /> {pet.name}{" "}
          adoption details
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Explore the pet details and adopt when ready.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <ScrollReveal>
          <section className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <div className="relative h-full min-h-116 w-full">
              <Image
                src={pet.image}
                alt={pet.name}
                fill
                className="object-cover"
              />
            </div>
          </section>
        </ScrollReveal>

        <aside className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 pt-3 shadow-sm flex flex-col">
          <ScrollReveal>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {pet.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <MdCategory size={18} /> {pet.type}
                </p>
              </div>
              <span className="rounded-md bg-blue-50 dark:bg-blue-900/30 px-3 py-1 min-w-24 text-center font-semibold text-blue-700 dark:text-blue-300">
                {pet.fee}
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="mt-2 grid gap-3 gap-y-1 sm:grid-cols-2 grow">
              {[
                { label: "Age", value: pet.age, icon: <MdCake /> },
                { label: "Gender", value: pet.gender, icon: <MdTransgender /> },
                {
                  label: "Health",
                  value: pet.healthStatus || "Healthy",
                  icon: <MdHealing />,
                },
                {
                  label: "Species",
                  value: pet.species || "Not Mentiond",
                  icon: <MdCategory />,
                },
                {
                  label: "Breed",
                  value: pet.breed || "Not Mentiond",
                  icon: <MdOutlinePets />,
                },
                {
                  label: "Vaccination Status",
                  value: "Not Vaccinated",
                  icon: <MdMedicalServices />,
                },
                {
                  label: "Location",
                  value: pet.location,
                  icon: <MdLocationOn />,
                },
              ].map((d, i) => (
                <div
                  key={i}
                  className="bg-gray-50 dark:bg-gray-950 p-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    {d.icon} {d.label}
                  </p>
                  <p className="font-semibold dark:text-white">{d.value}</p>
                </div>
              ))}
              <div className="col-span-2 bg-gray-50 dark:bg-gray-950 p-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <MdDescription /> Description
                </p>
                <p className="font-semibold dark:text-gray-200">
                  {pet.description || "This pet is looking for a loving home."}
                </p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="mt-3">
              {isAdopted ? (
                <div className="rounded-xl bg-green-50 dark:bg-green-900/20 p-4 text-center border border-green-200 dark:border-green-800">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-400 flex items-center justify-center gap-2">
                    <MdFavorite /> This pet has already been adopted!
                  </p>
                </div>
              ) : isOwner ? (
                <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 p-4 text-center border border-amber-200 dark:border-amber-800">
                  <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                    You cannot adopt your own pet.
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleOpenAdoptForm}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold transition hover:bg-blue-700"
                >
                  <MdFavorite /> Adopt Now
                </button>
              )}
            </div>
          </ScrollReveal>
        </aside>
      </div>

      {showAdoptForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl border dark:border-gray-800">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <MdFavorite className="text-red-500" /> Adoption Form
              </h2>
              <button
                onClick={() => setShowAdoptForm(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition flex items-center gap-1"
              >
                <MdClose size={20} /> Close
              </button>
            </div>
            <form onSubmit={handleAdopt} className="mt-6 space-y-4">
              {[
                { l: "Pet Name", v: pet.name, icon: <MdPets /> },
                { l: "Your Name", v: session?.user?.name, icon: <MdPerson /> },
                { l: "Your Email", v: session?.user?.email, icon: <MdEmail /> },
              ].map((f, i) => (
                <fieldset key={i} className="fieldset">
                  <label className="label text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    {f.icon} {f.l}
                  </label>
                  <input
                    className="input w-full bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-700 text-gray-500"
                    value={f.v || ""}
                    readOnly
                  />
                </fieldset>
              ))}
              <fieldset className="fieldset">
                <label className="label text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <MdCalendarToday /> Preferred Pickup Date
                </label>
                <input
                  type="date"
                  className="input w-full border-gray-300 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  value={pickupDate}
                  required
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <label className="label text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <MdMessage /> Message to Owner
                </label>
                <textarea
                  className="textarea w-full border-gray-300 dark:border-gray-700 dark:bg-gray-950 dark:text-white min-h-25"
                  value={message}
                  required
                  placeholder="Why would you be a great match?"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </fieldset>
              <button
                type="submit"
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700"
              >
                <MdFavorite /> Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
