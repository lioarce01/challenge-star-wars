import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllPeople(
  offset: number,
  limit: number,
  filters: Record<string, string | { name: string }>
) {
  try {
    const people = await prisma.people.findMany({
      skip: offset,
      take: limit,
      where: filters,
      include: {
        homeworld: true,
        starships: true,
        films: true,
      },
    });
    return people;
  } catch (error) {
    console.error('Error fetching people:', error);
    throw error;
  }
}

export async function getPersonById(id: string) {
  try {
    const person = await prisma.people.findUnique({
      where: { id },
      include: {
        homeworld: true,
        starships: {
          include: {
            starship: true,
          },
        },
        films: {
          include: {
            film: true,
          },
        },
      },
    });

    if (!person) {
      return { error: true, message: 'Person not found' };
    }

    return person;
  } catch (error) {
    console.error('Error fetching person:', error);
    return { error: true, message: 'Error fetching person' };
  }
}
