import { getUserEvents } from "../actions/events";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import EventsTable from "@/app/dashboard/components/EventsTable";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    //throw new Error("Session or user data not found");
    redirect("/signin");
  }


  const userId = session.user.id;
  const events = await getUserEvents(userId);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Events Dashboard</h1>
        </header>
        <div className="mb-6">
          <Link
            href="/create-event"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Create a New Event
          </Link>
        </div>
        <EventsTable initialEvents={events} userId={userId} />
      </div>
    </div>
  );
}
