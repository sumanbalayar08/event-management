"use server"

import { authOptions } from "@/lib/auth";
import { getAllEvents } from "../actions/events";
import { getServerSession } from "next-auth";
import AdminEvents from "./components/AdminEvents";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    //throw new Error("Session or user data not found");
    redirect("/signin");
  }

    const events = await getAllEvents();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Events Dashboard</h1>
        </header>
        <AdminEvents initialEvents={events} />
      </div>
    </div>
  );
}
