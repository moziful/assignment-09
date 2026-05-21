"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { pets } from "@/lib/pets-data";

export default function PetDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [showAdoptForm, setShowAdoptForm] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const pet = useMemo(
    () => pets.find((item) => String(item.id) === String(params.id)),
    [params.id],
  );
  const handleOpenAdoptForm = () => {
    if (!session?.user) {
      router.push("/auth/signin");
      return;
    }
    setShowAdoptForm(true);
  };
  const handleAdopt = (event) => {
    event.preventDefault();
    if (!pickupDate) {
      setErrorMessage("Please select a pickup date.");
      return;
    }
    if (!message.trim()) {
      setErrorMessage("Please add a short message.");
      return;
    }
    setErrorMessage("");
    setShowAdoptForm(false);
    router.push("/dashboard/my-requests");
  };
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
            className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Back to All Pets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
          Explore the pet details on the left and open the adoption form when
          you are ready.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="relative h-full min-h-[520px] w-full">
            <Image
              src={pet.image}
              alt={pet.name}
              fill
              className="object-cover"
            />
          </div>
        </section>
        <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-950">{pet.name}</h2>
              <p className="mt-1 text-gray-600">{pet.type}</p>
            </div>
            <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              {pet.fee}
            </span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-semibold text-gray-950">{pet.age}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-semibold text-gray-950">{pet.gender}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-gray-950">{pet.location}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Health Status</p>
              <p className="font-semibold text-gray-950">Healthy and active</p>
            </div>
          </div>
          <p className="mt-6 text-gray-600">
            This pet is ready for a loving home and is waiting for the right
            adopter to continue a happy life.
          </p>
          <button
            type="button"
            onClick={handleOpenAdoptForm}
            className="mt-6 inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Adopt Now
          </button>
        </aside>
      </div>
      {showAdoptForm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-950">
                  Adoption Form
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Fill in the details to request adoption.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAdoptForm(false)}
                className="rounded-full border border-gray-300 px-3 py-1 text-sm font-semibold text-gray-600"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleAdopt} className="mt-6 space-y-4">
              <fieldset className="fieldset">
                <label className="label">Pet Name</label>
                <input
                  type="text"
                  className="input validator"
                  value={pet.name}
                  readOnly
                />
              </fieldset>
              <fieldset className="fieldset">
                <label className="label">User Name</label>
                <input
                  type="text"
                  className="input validator"
                  value={session?.user?.name || ""}
                  readOnly
                />
              </fieldset>
              <fieldset className="fieldset">
                <label className="label">User Email</label>
                <input
                  type="email"
                  className="input validator"
                  value={session?.user?.email || ""}
                  readOnly
                />
              </fieldset>
              <fieldset className="fieldset">
                <label className="label">Pickup Date</label>
                <input
                  type="date"
                  className="input validator"
                  value={pickupDate}
                  onChange={(event) => setPickupDate(event.target.value)}
                  required
                />
              </fieldset>
              <fieldset className="fieldset">
                <label className="label">Message</label>
                <textarea
                  className="textarea textarea-bordered min-h-32 w-full"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write a short note..."
                  required
                />
              </fieldset>
              {errorMessage ? (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {errorMessage}
                </p>
              ) : null}

              <button
                type="submit"
                className="btn w-full border-0 bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit Adoption Request
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
