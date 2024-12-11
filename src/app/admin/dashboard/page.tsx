import { getAdminEvents } from "@/app/actions/events";

export default async function AdminDashboard() {
  const events = await getAdminEvents();

  return (
    <div>
      <h1>All Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.title} - {event.user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
