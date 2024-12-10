import prisma from "./prisma";

export async function createEvent(data: { title: string; description: string; date: string; location: string; userId: string }) {
  return prisma.event.create({
    data,
  });
}

export async function getUserEvents(userId: string) {
  return prisma.event.findMany({
    where: { userId },
  });
}

export async function getAllEvents() {
  return prisma.event.findMany();
}

export async function updateEvent(id: string, data: Partial<{ title: string; description: string; date: string; location: string }>) {
  return prisma.event.update({
    where: { id },
    data,
  });
}

export async function deleteEvent(id: string) {
  return prisma.event.delete({
    where: { id },
  });
}
