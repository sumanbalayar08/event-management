"use client"

import { useState } from "react";

export default function EventForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <input name="description" placeholder="Description" onChange={handleChange} required />
      <input name="date" type="datetime-local" onChange={handleChange} required />
      <input name="location" placeholder="Location" onChange={handleChange} required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Save</button>
    </form>
  );
}
