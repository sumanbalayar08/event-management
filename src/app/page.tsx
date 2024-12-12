import { getUserEvents } from "./actions/events";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import EventsTable from "@/app/dashboard/components/EventsTable";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    //throw new Error("Session or user data not found");
    redirect("/signin");
  }
   const role = session?.user?.role;
   console.log(role);

  if (session?.user?.role === "admin") {
    redirect("/admin");
  } else if (session?.user) {
    redirect("/dashboard");
  }

 

  return (
    <div className="text-center py-10">
      <h1>Welcome to the Event Management Platform</h1>
      <p>Please sign in to continue.</p>
    </div>
  );
}
