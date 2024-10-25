import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllStarships() {
  try {
    const starships = await prisma.starship.findMany({
      include: {
        pilots: true,
        films: true,
      },
    });

    if (!starships) {
      throw new Error('No starships found');
    }

    return starships;
  } catch (error) {
    console.error('Error fetching starships:', error);
    throw error;
  }
}

export async function getStarshipById(id: string) {
  try {
    const starship = await prisma.starship.findUnique({
      where: { id },
      include: {
        pilots: {
          include: {
            pilot: true,
          },
        },
        films: {
          include: {
            film: true,
          },
        },
      },
    });

    if (!starship) {
      console.log('Starship not found');
      return { error: true, message: 'Starship not found' };
    }

    return starship;
  } catch (error) {
    const e = error as Error;
    console.error('Error fetching starship:', error);
    return {
      error: true,
      message: 'Error fetching starship',
      details: e.message,
    };
  }
}
