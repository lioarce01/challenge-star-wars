import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllPeople(
  offset: number,
  limit: number,
  filters: Record<string, string | { name: string }>
) {
  try {
    const [people, totalCount] = await Promise.all([
      prisma.people.findMany({
        skip: offset,
        take: limit,
        where: filters,
        include: {
          homeworld: true,
          starships: true,
          films: true,
        },
      }),
      prisma.people.count({ where: filters }),
    ]);

    return { results: people, count: totalCount };
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

export async function getUniqueFilterValues() {
  try {
    const [genders, hairColors, skinColors, homeworlds] = await Promise.all([
      prisma.people.findMany({
        select: { gender: true },
        distinct: ['gender'],
      }),
      prisma.people.findMany({
        select: { hair_color: true },
        distinct: ['hair_color'],
      }),
      prisma.people.findMany({
        select: { skin_color: true },
        distinct: ['skin_color'],
      }),
      prisma.people.findMany({
        select: { homeworld: { select: { name: true } } },
        distinct: ['homeworldId'],
      }),
    ]);

    return {
      genders: genders.map((item) => item.gender).filter(Boolean),
      hairColors: hairColors.map((item) => item.hair_color).filter(Boolean),
      skinColors: skinColors.map((item) => item.skin_color).filter(Boolean),
      homeworlds: homeworlds
        .map((item) => item.homeworld?.name)
        .filter(Boolean),
    };
  } catch (error) {
    console.error('Error fetching unique filter values:', error);
    throw error;
  }
}
