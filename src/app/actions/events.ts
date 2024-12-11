import prisma from "@/lib/prisma";

export async function createEvent(data: any, userId: string) {
  return prisma.event.create({
    data: { ...data, userId },
  });
}

export async function getUserEvents(userId: string) {
  return prisma.event.findMany({
    where: { userId },
    orderBy: { date: "asc" },
  });
}

export async function getAdminEvents() {
  return prisma.event.findMany({
    orderBy: { date: "asc" },
  });
}

export async function updateEvent(id: string, data: any) {
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
