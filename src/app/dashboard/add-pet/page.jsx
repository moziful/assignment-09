"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const initialForm = {
  petName: "",
  species: "",
  breed: "",
  age: "",
  gender: "",
  imageUrl: "",
  healthStatus: "",
  vaccinationStatus: "",
  location: "",
  adoptionFee: "",
  description: "",
};

export default function AddPetPage() {
  const [form, setForm] = useState(initialForm);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        name: form.petName,
        type: form.species,
        breed: form.breed,
        age: form.age,
        gender: form.gender,
        image: form.imageUrl,
        healthStatus: form.healthStatus,
        vaccinationStatus: form.vaccinationStatus,
        location: form.location,
        fee: `৳${form.adoptionFee}`,
        description: form.description,
        ownerEmail: session?.user?.email || "",
      };
      const res = await fetch("http://localhost:5000/all-pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add pet");
      }
      const data = await res.json();
      console.log("Pet added:", data);
    } catch (error) {
      console.error("Failed to add pet:", error.message);
    } finally {
      setForm(initialForm);
      router.push("/all-pets");
    }
  };
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-gray-950">Add Pet</h1>
      <p className="mt-3 text-gray-600">
        Create a new adoption listing for a pet that needs a home.
      </p>

      <form className="mt-8 grid gap-4 lg:grid-cols-2" onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <label className="label">Pet Name</label>
          <input
            className="input validator"
            name="petName"
            value={form.petName}
            onChange={handleChange}
            required
          />
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Species</label>
          <input
            className="input validator"
            name="species"
            value={form.species}
            onChange={handleChange}
            required
          />
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Breed</label>
          <input
            name="breed"
            value={form.breed}
            onChange={handleChange}
            className="input validator"
            placeholder="Breed"
            required
          />
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Age</label>
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            className="input validator"
            maxLength={9}
            placeholder="Age"
            required
          />
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="select select-bordered"
            required
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Image URL</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            className="input validator"
            onChange={handleChange}
            required
          />
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Health Status</label>
          <input
            name="healthStatus"
            value={form.healthStatus}
            onChange={handleChange}
            className="input validator"
            placeholder="Healthy / Needs care"
            required
          />
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Vaccination Status</label>
          <select
            name="vaccinationStatus"
            value={form.vaccinationStatus}
            onChange={handleChange}
            className="select select-bordered"
            required
          >
            <option value="" disabled>
              Select vaccination status
            </option>
            <option value="Vaccinated">Vaccinated</option>
            <option value="Not Vaccinated">Not Vaccinated</option>
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="input validator"
            placeholder="Location"
            required
          />
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Adoption Fee</label>
          <input
            name="adoptionFee"
            className="input validator"
            value={form.adoptionFee}
            onChange={handleChange}
            required
          />
        </fieldset>
        <fieldset className="fieldset lg:col-span-2">
          <label className="label">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="textarea textarea-bordered min-h-40 w-full"
            placeholder="Write a short description..."
          />
        </fieldset>
        <fieldset className="fieldset lg:col-span-2">
          <label className="label">Owner Email</label>
          <input
            type="email"
            className="input validator"
            value={session?.user?.email || ""}
            readOnly
          />
        </fieldset>
        <div className="lg:col-span-2">
          <button
            type="submit"
            className="btn border-0 bg-blue-600 text-white hover:bg-blue-700"
          >
            Add Pet
          </button>
        </div>
      </form>
    </section>
  );
}
