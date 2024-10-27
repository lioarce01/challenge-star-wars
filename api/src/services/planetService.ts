import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllPlanets(
  offset: number,
  limit: number,
  filters: Record<string, string | { contains: string }>
) {
  try {
    const [planets, totalCount] = await Promise.all([
      prisma.planet.findMany({
        skip: offset,
        take: limit,
        where: filters,
        include: {
          residents: true,
          films: true,
        },
      }),
      prisma.planet.count({ where: filters }),
    ]);

    return { results: planets, count: totalCount };
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

export async function getUniqueFilterValues() {
  try {
    const [climate, terrain] = await Promise.all([
      prisma.planet.findMany({
        select: { climate: true },
        distinct: ['climate'],
      }),
      prisma.planet.findMany({
        select: { terrain: true },
        distinct: ['terrain'],
      }),
    ]);

    return {
      climate: Array.from(
        climate
          .map((item) => item.climate)
          .filter(Boolean)
          .flatMap((climate) => climate?.split(','))
          .map((p) => p?.trim())
          .filter((p) => p !== '')
          .reduce(
            (uniqueClimate, p) => uniqueClimate.add(p!),
            new Set<string>()
          )
      ),
      terrain: Array.from(
        terrain
          .map((item) => item.terrain)
          .filter(Boolean)
          .flatMap((terrain) => terrain?.split(','))
          .map((p) => p?.trim())
          .filter((p) => p !== '')
          .reduce(
            (uniqueTerrain, p) => uniqueTerrain.add(p!),
            new Set<string>()
          )
      ),
    };
  } catch (error) {
    console.error('Error fetching unique filter values', error);
    throw Error;
  }
}
