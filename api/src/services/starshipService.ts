import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllStarships(
  offset: number,
  limit: number,
  filters: Record<string, string>
) {
  try {
    const [starships, totalCount] = await Promise.all([
      prisma.starship.findMany({
        skip: offset,
        take: limit,
        where: filters,
        include: {
          pilots: true,
          films: true,
        },
      }),
      prisma.starship.count({ where: filters }),
    ]);

    if (starships.length === 0) {
      return { error: true, message: 'Starships not found' };
    }

    return { results: starships, count: totalCount };
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

export async function getUniqueFilterValues() {
  try {
    const [starship_class, manufacturer] = await Promise.all([
      prisma.starship.findMany({
        select: { starship_class: true },
        distinct: ['starship_class'],
      }),
      prisma.starship.findMany({
        select: { manufacturer: true },
        distinct: ['manufacturer'],
      }),
    ]);

    return {
      starship_class: Array.from(
        starship_class
          .map((item) => item.starship_class)
          .filter(Boolean)
          .flatMap((starship_class) => starship_class.split(','))
          .map((p) => p.trim())
          .filter((p) => p !== '')
          .reduce(
            (uniqueStarship_class, p) => uniqueStarship_class.add(p),
            new Set<string>()
          )
      ),
      manufacturer: Array.from(
        manufacturer
          .map((item) => item.manufacturer)
          .filter(Boolean)
          .flatMap((manufacturer) => manufacturer.split(','))
          .map((p) => p.trim())
          .filter((p) => p !== '')
          .reduce(
            (uniqueManufacturer, p) => uniqueManufacturer.add(p),
            new Set<string>()
          )
      ),
    };
  } catch (error) {
    console.error('Error fetching unique filter values', error);
    throw error;
  }
}
