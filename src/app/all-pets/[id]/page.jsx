"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function PetDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showAdoptForm, setShowAdoptForm] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!params?.id) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    const load = async () => {
      try {
        console.log("Fetching ID:", params.id);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/all-pets/${params.id}`,
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(JSON.stringify(data));
        }
        setPet(data);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setPet(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params?.id]);

  const handleOpenAdoptForm = () => {
    if (!session?.user) {
      router.push("/auth/signin");
      return;
    }
    setShowAdoptForm(true);
  };

  const handleAdopt = async (event) => {
    event.preventDefault();

    if (!pickupDate || !message.trim()) {
      setErrorMessage("Please fill all fields");
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create request");
      }

      console.log("SUCCESS:", data);

      setShowAdoptForm(false);
      router.push("/dashboard/my-requests");
    } catch (error) {
      console.error("ADOPTION ERROR:", error);
      setErrorMessage(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-100 w-full items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-16">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-950">Pet not found</h1>
          <p className="mt-3 text-gray-600">
            The pet you are looking for does not exist or may have been removed.
          </p>
          <Link
            href="/all-pets"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Back to All Pets
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Edge Case Logic Flags
  const isAdopted = pet.status === "adopted";
  const isOwner = session?.user?.email === pet.ownerEmail;

  return (
    <div className="mx-auto w-full min-h-160 max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/all-pets"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          Back to All Pets
        </Link>
        <h1 className="mt-3 text-4xl font-bold text-gray-950">
          {pet.name} adoption details
        </h1>
        <p className="mt-2 text-gray-600">
          Explore the pet details and adopt when ready.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="relative h-full min-h-116 w-full">
            <Image
              src={pet.image}
              alt={pet.name}
              fill
              className="object-cover"
            />
          </div>
        </section>
        <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-blue-600">{pet.name}</h2>
              <p className="text-gray-600">{pet.type}</p>
            </div>
            <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              {pet.fee}
            </span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 flex-grow">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-semibold">{pet.age}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-semibold">{pet.gender}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold">{pet.location}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-500">Health</p>
              <p className="font-semibold">{pet.healthStatus || "Healthy"}</p>
            </div>
            <div className="col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-500">Description</p>
              <p className="font-semibold">
                {pet.description ||
                  "This pet is looking for a loving home. It is friendly, playful, and great with families. Adopt now to give this pet a second chance at happiness!"}
              </p>
            </div>
          </div>

          {/* ✅ Conditional Rendering based on Adopted / Owner status */}
          <div className="mt-6">
            {isAdopted ? (
              <div className="rounded-xl bg-emerald-50 p-4 text-center border border-emerald-200">
                <p className="text-sm font-semibold text-emerald-700">
                  🎉 This pet has already found a loving home!
                </p>
              </div>
            ) : isOwner ? (
              <div className="rounded-xl bg-amber-50 p-4 text-center border border-amber-200">
                <p className="text-sm font-semibold text-amber-700">
                  🐾 You cannot adopt this pet since you own this listing!
                </p>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleOpenAdoptForm}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold transition hover:bg-blue-700"
              >
                Adopt Now
              </button>
            )}
          </div>
        </aside>
      </div>

      {showAdoptForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-gray-900">Adoption Form</h2>
              <button
                onClick={() => setShowAdoptForm(false)}
                className="text-gray-500 hover:text-gray-900 font-medium text-sm rounded-lg hover:bg-gray-100 px-3 py-1 transition"
              >
                Close
              </button>
            </div>
            <form onSubmit={handleAdopt} className="mt-6 space-y-4">
              <fieldset className="fieldset">
                <label className="label text-sm font-medium text-gray-700">
                  Pet Name
                </label>
                <input
                  className="input w-full bg-gray-50 border-gray-200 text-gray-500"
                  value={pet.name}
                  readOnly
                />
              </fieldset>

              <fieldset className="fieldset">
                <label className="label text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  className="input w-full bg-gray-50 border-gray-200 text-gray-500"
                  value={session?.user?.name || ""}
                  readOnly
                />
              </fieldset>

              <fieldset className="fieldset">
                <label className="label text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  className="input w-full bg-gray-50 border-gray-200 text-gray-500"
                  value={session?.user?.email || ""}
                  readOnly
                />
              </fieldset>

              <fieldset className="fieldset">
                <label className="label text-sm font-medium text-gray-700">
                  Preferred Pickup Date
                </label>
                <input
                  type="date"
                  className="input w-full border-gray-300"
                  value={pickupDate}
                  required
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <label className="label text-sm font-medium text-gray-700">
                  Message to Owner
                </label>
                <textarea
                  className="textarea w-full border-gray-300 min-h-[100px]"
                  value={message}
                  required
                  placeholder="Tell the owner why you'd be a great match..."
                  onChange={(e) => setMessage(e.target.value)}
                />
              </fieldset>

              {errorMessage && (
                <p className="text-sm font-medium text-red-600">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-blue-600 py-3 text-white font-semibold transition hover:bg-blue-700"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
