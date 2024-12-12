// CreateEventPage.server.tsx
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import EventForm from "@/app/dashboard/components/EventForm";
import { redirect } from "next/navigation";

export default async function CreateEventPage() {
  const session = await getServerSession(authOptions);
  console.log("Session:", session);

  if (!session) {
    // Redirect to the sign-in page if not logged in
    redirect("/signin");
  }

  if (!session || !session.user) {
    throw new Error("Session or user data not found");
  }

  return (
    <div className="justify-center items-center">
      <EventForm userId={session.user.id} />
    </div>
  );
}
