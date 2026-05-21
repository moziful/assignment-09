"use client";

import { useState } from "react";

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-gray-950">Add Pet</h1>
      <p className="mt-3 text-gray-600">
        Create a new adoption listing for a pet that needs a home.
      </p>

      <form className="mt-8 grid gap-4 lg:grid-cols-2">
        <fieldset className="fieldset">
          <label className="label">Pet Name</label>
          <input
            name="petName"
            value={form.petName}
            onChange={handleChange}
            className="input validator"
            placeholder="Pet Name"
          />
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Species</label>
          <input
            name="species"
            value={form.species}
            onChange={handleChange}
            className="input validator"
            placeholder="Dog, Cat, Bird..."
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
          />
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Age</label>
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            className="input validator"
            placeholder="Age"
          />
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Gender</label>
          <input
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="input validator"
            placeholder="Male / Female"
          />
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Image URL</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="input validator"
            placeholder="https://..."
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
          />
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Vaccination Status</label>
          <input
            name="vaccinationStatus"
            value={form.vaccinationStatus}
            onChange={handleChange}
            className="input validator"
            placeholder="Vaccinated / Not vaccinated"
          />
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="input validator"
            placeholder="Location"
          />
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Adoption Fee</label>
          <input
            name="adoptionFee"
            value={form.adoptionFee}
            onChange={handleChange}
            className="input validator"
            placeholder="$100"
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
            value="owner@petbuddy.com"
            readOnly
          />
        </fieldset>
        <div className="lg:col-span-2">
          <button
            type="button"
            className="btn border-0 bg-blue-600 text-white hover:bg-blue-700"
          >
            Add Pet
          </button>
        </div>
      </form>
    </section>
  );
}
