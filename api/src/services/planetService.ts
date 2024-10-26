import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllPlanets(
  offset: number,
  limit: number,
  filters: Record<string, string | { contains: string }>
) {
  try {
    const planets = await prisma.planet.findMany({
      skip: offset,
      take: limit,
      where: filters,
      include: {
        residents: true,
        films: true,
      },
    });

    return planets;
  } catch (error) {
    console.error('Error fetching planets:', error);
    throw error;
  }
}

export async function getPlanetById(id: string) {
  try {
    const planet = await prisma.planet.findUnique({
      where: { id },
      include: {
        residents: true,
        films: {
          include: {
            film: true,
          },
        },
      },
    });

    if (!planet) {
      console.log('Planet not found');
      return { error: true, message: 'Planet not found' };
    }

    return planet;
  } catch (error) {
    const e = error as Error;
    return {
      error: true,
      message: 'Error fetching planet',
      details: e.message,
    };
  }
}
