"use client"

import { useSession } from "next-auth/react";
import { getUserEvents,createEvent } from "@/app/actions/events";
import EventForm from "@/components/EventForm";

export default async function UserDashboard() {
  const session = useSession();
  const events = await getUserEvents(session?.user.id);

  return (
    <div>
      <h1>Your Events</h1>
      <EventForm onSubmit={(data) => createEvent(data, session?.user.id)} />
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
}
