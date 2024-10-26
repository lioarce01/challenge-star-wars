import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllStarships(offset: number, limit: number) {
  try {
    const starships = await prisma.starship.findMany({
      skip: offset,
      take: limit,
      include: {
        pilots: true,
        films: true,
      },
    });

    if (starships.length === 0) {
      return { error: true, message: 'Starships not found' };
    }

    return starships;
  } catch (error) {
    console.error('Error fetching starships:', error);
    return {
      error: true,
      message: 'Error fetching starships',
      details: error,
    };
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
