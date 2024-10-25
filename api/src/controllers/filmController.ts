import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllFilms() {
  try {
    const films = await prisma.film.findMany({
      include: {
        characters: true,
        planets: true,
        starships: true,
      },
    });

    if (!films) {
      throw new Error('No films found');
    }

    return films;
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
