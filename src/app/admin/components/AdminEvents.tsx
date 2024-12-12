"use client";

import { adminDeleteEvent,adminUpdateEvent } from "@/app/actions/events";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";


export default function AdminEvents({initialEvents}) {

  const [events, setEvents] = useState(initialEvents);
  const [editingEvent, setEditingEvent] = useState(""); // Tracks the event being edited
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const handleEditClick = (event) => {
    setEditingEvent(event.id);
    setFormData({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().slice(0, 16), // ISO format for `<input type="datetime-local">`
      location: event.location,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const updatedEvent = await adminUpdateEvent(editingEvent, formData);
      setEvents(
        events.map((event) =>
          event.id === editingEvent ? updatedEvent : event
        )
      );
      setEditingEvent(""); // Close the modal
      alert("Event updated successfully");
    } catch (error) {
      console.error("Failed to update event:", error);
      alert("Failed to update event.");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await adminDeleteEvent(id);
        setEvents(events.filter((event) => event.id !== id));
        alert("Event deleted successfully");
      } catch (error) {
        console.error("Failed to delete event:", error);
        alert("Failed to delete event.");
      }
    }
  };

  return (
    <section className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Events</h2>
        <Image
          src="/images/shutdown.png"
          alt="Description"
          width={40} // width of the image
          height={2} // height of the image
          onClick={() => signOut()}
          className="cursor-pointer"
        />
      </div>

      {events.length === 0 ? (
        <p className="text-gray-600">No events found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-gray-600 font-medium border-b">
                  Event Title
                </th>
                <th className="py-3 px-6 text-left text-gray-600 font-medium border-b">
                  Description
                </th>
                <th className="py-3 px-6 text-left text-gray-600 font-medium border-b">
                  Date
                </th>
                <th className="py-3 px-6 text-left text-gray-600 font-medium border-b">
                  Location
                </th>
                <th className="py-3 px-6 text-center text-gray-600 font-medium border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-6 text-gray-800 font-semibold">
                    {event.title}
                  </td>
                  <td className="py-3 px-6 text-gray-600">
                    {event.description}
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    {new Date(event.date).toLocaleString()}
                  </td>
                  <td className="py-3 px-6 text-gray-500">{event.location}</td>
                  <td className="py-3 px-6 text-center space-x-4">
                    <button
                      onClick={() => handleEditClick(event)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Event</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Location"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setEditingEvent("")}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
