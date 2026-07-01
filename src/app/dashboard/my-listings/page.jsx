"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import ScrollReveal from "@/components/ScrollReveal";
import {
  MdPets,
  MdCheckCircle,
  MdVerifiedUser,
  MdOutlineRequestQuote,
  MdEdit,
  MdRemoveRedEye,
  MdDelete,
  MdCake,
  MdTransgender,
  MdLocationOn,
  MdCategory,
  MdOutlinePets,
  MdImage,
  MdHealing,
  MdAttachMoney,
  MdDescription,
  MdEmail,
  MdSave,
} from "react-icons/md";

export default function MyListingsPage() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = authClient.useSession();

  // Modal and Action States
  const [modal, setModal] = useState({ isOpen: false, type: null, pet: null });
  const [petRequests, setPetRequests] = useState([]);
  const [isFetchingRequests, setIsFetchingRequests] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Comprehensive Edit Form State
  const [editForm, setEditForm] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    gender: "",
    image: "",
    healthStatus: "",
    vaccinationStatus: "",
    location: "",
    fee: "",
    description: "",
  });

  const stats = {
    total: listings.length,
    available: listings.filter((p) => p.status !== "adopted").length,
    adopted: listings.filter((p) => p.status === "adopted").length,
  };

  useEffect(() => {
    const load = async () => {
      if (!session?.user?.email) return;
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/pets?email=${session.user.email}`,
          { credentials: "include" }
        );
        const data = await res.json();
        setListings(data);
      } catch (err) {
        toast.error("Failed to load listings");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [session]);

  const closeModal = () => setModal({ isOpen: false, type: null, pet: null });

  // --- DELETE LOGIC ---
  const handleDeleteClick = (pet) => {
    if (pet.status === "adopted") {
      toast.error("Cannot delete an already adopted pet.");
      return;
    }
    setModal({ isOpen: true, type: "delete", pet });
  };

  const confirmDelete = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/all-pets/${modal.pet._id}`,
        { method: "DELETE", credentials: "include" },
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Pet deleted successfully!");
        setListings((prev) => prev.filter((p) => p._id !== modal.pet._id));
        closeModal();
      } else {
        toast.error(data.error || "Failed to delete pet");
      }
    } catch (err) {
      toast.error("An error occurred during deletion.");
    } finally {
      setIsProcessing(false);
    }
  };

  // --- EDIT LOGIC ---
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((current) => ({ ...current, [name]: value }));
  };

  const handleEditClick = (pet) => {
    if (pet.status === "adopted") {
      toast.error("Cannot edit an already adopted pet.");
      return;
    }
    setEditForm({
      name: pet.name || "",
      type: pet.type || "",
      breed: pet.breed || "",
      age: pet.age || "",
      gender: pet.gender || "",
      image: pet.image || "",
      healthStatus: pet.healthStatus || "",
      vaccinationStatus: pet.vaccinationStatus || "",
      location: pet.location || "",
      fee: pet.fee ? pet.fee.replace("৳", "") : "", // Strip ৳ for the number input
      description: pet.description || "",
    });
    setModal({ isOpen: true, type: "edit", pet });
  };

  const confirmEdit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const payload = {
      ...editForm,
      fee: `৳${editForm.fee}`, // Re-append ৳ before sending
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/all-pets/${modal.pet._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        },
      );
      if (res.ok) {
        toast.success("Pet details updated successfully!");
        setListings((prev) =>
          prev.map((p) => (p._id === modal.pet._id ? { ...p, ...payload } : p)),
        );
        closeModal();
      } else {
        toast.error("Failed to update pet details.");
      }
    } catch (err) {
      toast.error("An error occurred during update.");
    } finally {
      setIsProcessing(false);
    }
  };

  // --- REQUESTS LOGIC ---
  const handleRequestsClick = async (pet) => {
    setModal({ isOpen: true, type: "requests", pet });
    setIsFetchingRequests(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/adoption-requests/pet/${pet._id}`,
        { credentials: "include" }
      );
      const data = await res.json();
      setPetRequests(data);
    } catch (err) {
      toast.error("Failed to fetch requests.");
    } finally {
      setIsFetchingRequests(false);
    }
  };

  const handleRequestAction = async (requestId, newStatus) => {
    setIsProcessing(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/adoption-requests/${requestId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus, petId: modal.pet._id }),
          credentials: "include",
        },
      );
      const data = await res.json();
      if (data.success) {
        toast.success(`Request ${newStatus} successfully!`);

        if (newStatus === "approved") {
          setPetRequests((prev) =>
            prev.map((r) =>
              r._id === requestId
                ? { ...r, status: "approved" }
                : { ...r, status: "rejected" },
            ),
          );
          setListings((prev) =>
            prev.map((p) =>
              p._id === modal.pet._id ? { ...p, status: "adopted" } : p,
            ),
          );
          setModal((prev) => ({
            ...prev,
            pet: { ...prev.pet, status: "adopted" },
          }));
        } else {
          setPetRequests((prev) =>
            prev.map((r) =>
              r._id === requestId ? { ...r, status: newStatus } : r,
            ),
          );
        }
      } else {
        toast.error(data.error || "Action failed.");
      }
    } catch (err) {
      toast.error("An error occurred processing the request.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex min-h-[300px] w-full items-center justify-center dark:text-gray-400">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>{" "}
      </div>
    );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-2 sm:px-4 lg:px-6 space-y-4 dark:bg-gray-950 relative">
      <div>
        <h1 className="text-4xl font-bold text-gray-950 dark:text-white flex items-center gap-3">
          <MdPets className="text-blue-600 dark:text-blue-400" /> My Listings
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your pets, track adoption requests, and update listings.
        </p>
      </div>

      {/* Stats Cards */}
      <ScrollReveal>
        <div className="grid gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm sm:grid-cols-3">
          {[
            {
              label: "Total",
              val: stats.total,
              icon: <MdPets />,
              color: "text-blue-500",
            },
            {
              label: "Available",
              val: stats.available,
              icon: <MdCheckCircle />,
              color: "text-emerald-500",
            },
            {
              label: "Adopted",
              val: stats.adopted,
              icon: <MdVerifiedUser />,
              color: "text-blue-600 dark:text-blue-400",
            },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`${s.color} text-3xl`}>{s.icon}</div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {s.label}
                </p>
                <p className="text-2xl font-bold dark:text-white">{s.val}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Listings Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {listings.map((pet) => (
          <ScrollReveal key={pet._id}>
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition hover:shadow-lg">
              <div className="relative h-40 w-full">
                <Image
                  src={pet.image}
                  alt={pet.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold dark:text-white">
                    {pet.name}
                  </h2>
                  <span className="bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded text-blue-700 dark:text-blue-300 font-bold">
                    {pet.fee}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <MdTransgender /> {pet.gender}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdCake /> {pet.age}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdLocationOn /> {pet.location}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => handleRequestsClick(pet)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-200 transition"
                  >
                    <MdOutlineRequestQuote /> Requests
                  </button>
                  <button
                    onClick={() => handleEditClick(pet)}
                    className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      pet.status === "adopted"
                        ? "border-gray-200 text-gray-400 cursor-not-allowed dark:border-gray-800 dark:text-gray-600"
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-200"
                    }`}
                  >
                    <MdEdit /> Edit
                  </button>
                  <Link
                    href={`/all-pets/${pet._id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-200 transition"
                  >
                    <MdRemoveRedEye /> View
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(pet)}
                    className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      pet.status === "adopted"
                        ? "border-gray-200 text-gray-400 cursor-not-allowed dark:border-gray-800 dark:text-gray-600"
                        : "border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                    }`}
                  >
                    <MdDelete /> Delete
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* --- MODALS OVERLAYS --- */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          {/* Delete Modal */}
          {modal.type === "delete" && (
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-sm w-full shadow-xl">
              <h3 className="text-xl font-bold dark:text-white mb-2">
                Confirm Delete
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete <b>{modal.pet?.name}</b>? This
                action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg font-semibold border dark:border-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold disabled:opacity-50"
                >
                  {isProcessing ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          )}

          {/* Edit Modal (Matches Add Pet Page exactly) */}
          {modal.type === "edit" && (
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-4xl w-full shadow-xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                  <MdEdit className="text-blue-600 dark:text-blue-400" /> Edit
                  Pet Listing
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
                >
                  &times; Close
                </button>
              </div>

              <form
                className="grid w-full gap-4 lg:grid-cols-2"
                onSubmit={confirmEdit}
              >
                {[
                  {
                    name: "name",
                    label: "Pet Name",
                    icon: <MdPets />,
                    type: "text",
                  },
                  {
                    name: "type",
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
                    name: "image",
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
                    name: "fee",
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
                      type={field.type}
                      name={field.name}
                      value={editForm[field.name]}
                      onChange={handleEditChange}
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
                    value={editForm.gender}
                    onChange={handleEditChange}
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
                    value={editForm.vaccinationStatus}
                    onChange={handleEditChange}
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
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="textarea textarea-bordered w-full dark:bg-gray-950 dark:border-gray-700 dark:text-white"
                    placeholder="Write a description..."
                    rows="3"
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

                <div className="flex gap-3 justify-end pt-4 lg:col-span-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 rounded-lg font-semibold border dark:border-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn bg-blue-600 text-white hover:bg-blue-700 border-0 flex items-center gap-2 disabled:opacity-50"
                  >
                    <MdSave /> {isProcessing ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Requests Modal */}
          {modal.type === "requests" && (
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-2xl w-full shadow-xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold dark:text-white">
                  Requests for {modal.pet?.name}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
                >
                  &times; Close
                </button>
              </div>

              {isFetchingRequests ? (
                <p className="text-center py-4 dark:text-gray-400">
                  Loading requests...
                </p>
              ) : petRequests.length === 0 ? (
                <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No adoption requests yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {petRequests.map((req) => (
                    <div
                      key={req._id}
                      className="border dark:border-gray-800 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div>
                        <p className="font-semibold dark:text-white">
                          {req.requesterName || req.requesterEmail}
                        </p>
                        <p className="text-sm text-gray-500">
                          {req.requesterEmail}
                        </p>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 text-xs font-bold rounded ${
                            req.status === "approved"
                              ? "bg-emerald-100 text-emerald-700"
                              : req.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {req.status.toUpperCase()}
                        </span>
                      </div>

                      {/* Show actions only if pet is NOT adopted and request is pending */}
                      {modal.pet?.status !== "adopted" &&
                        req.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleRequestAction(req._id, "approved")
                              }
                              disabled={isProcessing}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm font-semibold disabled:opacity-50"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleRequestAction(req._id, "rejected")
                              }
                              disabled={isProcessing}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-semibold disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
