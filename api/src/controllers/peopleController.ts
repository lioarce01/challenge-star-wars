import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllPeople() {
  try {
    const people = await prisma.people.findMany({
      include: {
        homeworld: true,
        starships: true,
        films: true,
      },
    });

    if (!people) {
      throw new Error('No people found');
    }

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
      console.log('Person not found');
      return { error: true, message: 'Person not found' };
    }

    return person;
  } catch (error) {
    const e = error as Error;
    console.error('Error fetching person:', error);
    return {
      error: true,
      message: 'Error fetching person',
      details: e.message,
    };
  }
}
