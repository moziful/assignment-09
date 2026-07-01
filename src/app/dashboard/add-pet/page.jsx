"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ScrollReveal from "@/components/ScrollReveal";
import {
  MdPets,
  MdCategory,
  MdOutlinePets,
  MdCake,
  MdTransgender,
  MdImage,
  MdHealing,
  MdLocationOn,
  MdAttachMoney,
  MdDescription,
  MdEmail,
  MdAddCircleOutline,
} from "react-icons/md";

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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
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

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/all-pets`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        },
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add pet");
      }

      toast.success("Pet added successfully!");
      setForm(initialForm);
      router.push("/dashboard/my-listings");
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex min-h-[300px] w-full items-center justify-center dark:text-gray-400">
        Loading...
      </div>
    );

  return (
    <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-4 shadow-sm transition-colors">
      <ScrollReveal>
        <h1 className="text-3xl font-bold text-gray-950 dark:text-white flex items-center gap-3">
          <MdAddCircleOutline className="text-blue-600 dark:text-blue-400" />{" "}
          Add Pet
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Create a new adoption listing for a pet that needs a home.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <form
          className="mt-4 grid w-full gap-4 lg:grid-cols-2"
          onSubmit={handleSubmit}
        >
          {/* Input fields updated with dark mode classes */}
          {[
            {
              name: "petName",
              label: "Pet Name",
              icon: <MdPets />,
              type: "text",
            },
            {
              name: "species",
              label: "Species",
              icon: <MdCategory />,
              type: "text",
            },
            {
              name: "breed",
              label: "Breed",
              icon: <MdOutlinePets />,
              type: "text",
            },
            { name: "age", label: "Age", icon: <MdCake />, type: "text" },
            {
              name: "imageUrl",
              label: "Image URL",
              icon: <MdImage />,
              type: "text",
            },
            {
              name: "healthStatus",
              label: "Health Status",
              icon: <MdHealing />,
              type: "text",
            },
            {
              name: "location",
              label: "Location",
              icon: <MdLocationOn />,
              type: "text",
            },
            {
              name: "adoptionFee",
              label: "Adoption Fee",
              icon: <MdAttachMoney />,
              type: "number",
            },
          ].map((field) => (
            <fieldset key={field.name} className="fieldset w-full">
              <label className="label flex items-center gap-2 dark:text-gray-300">
                {field.icon} {field.label}
              </label>
              <input
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="input input-bordered w-full dark:bg-gray-950 dark:border-gray-700 dark:text-white"
                placeholder={field.label}
                required
              />
            </fieldset>
          ))}

          {/* Select fields */}
          <fieldset className="fieldset w-full">
            <label className="label flex items-center gap-2 dark:text-gray-300">
              <MdTransgender size={18} /> Gender
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="select select-bordered w-full dark:bg-gray-950 dark:border-gray-700 dark:text-white"
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </fieldset>

          <fieldset className="fieldset w-full">
            <label className="label flex items-center gap-2 dark:text-gray-300">
              <MdOutlinePets size={18} /> Vaccination Status
            </label>
            <select
              name="vaccinationStatus"
              value={form.vaccinationStatus}
              onChange={handleChange}
              className="select select-bordered w-full dark:bg-gray-950 dark:border-gray-700 dark:text-white"
              required
            >
              <option value="">Select status</option>
              <option value="Vaccinated">Vaccinated</option>
              <option value="Not Vaccinated">Not Vaccinated</option>
            </select>
          </fieldset>

          <fieldset className="fieldset w-full lg:col-span-2">
            <label className="label flex items-center gap-2 dark:text-gray-300">
              <MdDescription size={18} /> Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full dark:bg-gray-950 dark:border-gray-700 dark:text-white"
              placeholder="Write a description..."
            />
          </fieldset>

          <fieldset className="fieldset w-full lg:col-span-2">
            <label className="label flex items-center gap-2 dark:text-gray-300">
              <MdEmail size={18} /> Owner Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              value={session?.user?.email || ""}
              readOnly
            />
          </fieldset>

          <button
            type="submit"
            className="btn w-full lg:col-span-2 bg-blue-600 text-white hover:bg-blue-700 border-0 flex items-center gap-2"
          >
            <MdAddCircleOutline /> Add Pet
          </button>
        </form>
      </ScrollReveal>
    </section>
  );
}
