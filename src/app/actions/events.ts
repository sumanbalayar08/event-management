"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().transform((val) => new Date(val)),
  location: z.string().min(1),
});

export async function createEvent(userId: string, data: any) {
  const parsedData = eventSchema.safeParse(data);
  if (!parsedData.success) {
    console.error("Validation errors:", parsedData.error.errors);
    throw new Error(
      "Invalid input: " +
        parsedData.error.errors.map((e) => e.message).join(", ")
    );
  }

  try {
    const { title, description, date, location } = parsedData.data;

    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date,
        location,
        userId,
      },
    });

    return newEvent;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to create event in the database.");
  }
}

export async function getUserEvents(userId: string) {
  const events = await prisma.event.findMany({
    where: { userId },
  });
  return events;
}

export async function updateEvent(id: string, userId: string, data: any) {
  const parsedData = eventSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error("Invalid input");
  }

  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event || event.userId !== userId) {
    throw new Error("Event not found or not authorized");
  }

  const updatedEvent = await prisma.event.update({
    where: { id },
    data: parsedData.data,
  });

  return updatedEvent;
}

export async function deleteEvent(id: string, userId: string) {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event || event.userId !== userId) {
    throw new Error("Event not found or not authorized");
  }

  await prisma.event.delete({
    where: { id },
  });
}

export async function getAllEvents() {
  const events = await prisma.event.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return events;
}

export async function adminUpdateEvent(id: string, data: any) {
  // Validate the incoming data
  const parsedData = eventSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(
      "Invalid input: " +
        parsedData.error.errors.map((e) => e.message).join(", ")
    );
  }

  const updatedEvent = await prisma.event.update({
    where: { id },
    data: parsedData.data,
  });

  return updatedEvent;
}

export async function adminDeleteEvent(id: string) {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new Error("Event not found.");
  }

  // Delete the event
  await prisma.event.delete({
    where: { id },
  });
}
