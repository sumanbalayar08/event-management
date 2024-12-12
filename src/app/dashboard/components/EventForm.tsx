"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "@/app/actions/events";

const EventForm = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();
  console.log("Received userId:", userId);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createEvent(userId, { title, description, date, location });
      setSuccess("Event Created Successfully");
      router.push("/"); // Redirect to dashboard after event creation
    } catch (error) {
      console.error("Error creating event", error);
      setError("Failed to create the event. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-xl max-w-lg mx-auto sm:p-8 md:p-10 lg:p-12"
    >
      <h2 className="flex justify-center text-3xl font-extrabold mb-6 text-gray-800 text-center sm:text-4xl">
        Create an Event
      </h2>
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
          required
        />
      </div>
      <div className="mb-5">
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
          rows={4}
          required
        />
      </div>
      <div className="mb-5">
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 text-gray-800"
          required
        />
      </div>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Event Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Create Event
      </button>
    </form>
  );
};

export default EventForm;
