import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllFilms(
  offset: number,
  limit: number,
  filters: Record<string, string | { contains: string }>
) {
  try {
    const [films, totalCount] = await Promise.all([
      prisma.film.findMany({
        skip: offset,
        take: limit,
        where: filters,
        include: {
          characters: true,
          planets: true,
          starships: true,
        },
      }),
      prisma.film.count({ where: filters }),
    ]);

    return { results: films, count: totalCount };
  } catch (error) {
    console.error('Error fetching films:', error);
    throw error;
  }
}

export async function getFilmById(id: string) {
  try {
    const film = await prisma.film.findUnique({
      where: { id },
      include: {
        characters: {
          include: {
            person: true,
          },
        },
        planets: {
          include: {
            planet: true,
          },
        },
        starships: {
          include: {
            starship: true,
          },
        },
      },
    });

    if (!film) {
      console.log('Film not found');
      return { error: true, message: 'Film not found' };
    }

    return film;
  } catch (error) {
    const e = error as Error;
    console.error('Error fetching film:', error);
    return { error: true, message: 'Error fetching film', details: e.message };
  }
}

export async function getUniqueFilterValues() {
  try {
    const [director, producer] = await Promise.all([
      prisma.film.findMany({
        select: { director: true },
        distinct: ['director'],
      }),
      prisma.film.findMany({
        select: { producer: true },
        distinct: ['producer'],
      }),
    ]);

    return {
      director: Array.from(
        director
          .map((item) => item.director)
          .filter(Boolean)
          .flatMap((director) => director.split(','))
          .map((p) => p.trim())
          .filter((p) => p !== '')
          .reduce(
            (uniqueDirectors, p) => uniqueDirectors.add(p),
            new Set<string>()
          )
      ),
      producer: Array.from(
        producer
          .map((item) => item.producer)
          .filter(Boolean)
          .flatMap((producer) => producer.split(','))
          .map((p) => p.trim())
          .filter((p) => p !== '')
          .reduce(
            (uniqueProducers, p) => uniqueProducers.add(p),
            new Set<string>()
          )
      ),
    };
  } catch (error) {
    console.error('Error fetching unique filter values', error);
    throw error;
  }
}
