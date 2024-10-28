import { Film, People, Planet, PrismaClient, Starship } from '@prisma/client';
import axios from 'axios';
import { ApiFilm, ApiPeople, ApiStarship } from '../../types/ApiTypes';

const prisma = new PrismaClient();
const API_URL = process.env.API_URL || 'https://swapi.dev/api';

async function fetchAllPages<T>(endpoint: string): Promise<T[]> {
  let results: T[] = [];
  let nextUrl = `${API_URL}/${endpoint}`;

  while (nextUrl) {
    const response = await axios.get(nextUrl);
    results = [...results, ...response.data.results];
    nextUrl = response.data.next;
  }
  return results;
}

const importData = async () => {
  try {
    const [people, planets, films, starships] = await Promise.all([
      fetchAllPages<ApiPeople>('people'),
      fetchAllPages<Planet>('planets'),
      fetchAllPages<ApiFilm>('films'),
      fetchAllPages<ApiStarship>('starships'),
    ]);

    const planetMap = new Map();
    const peopleMap = new Map();
    const filmMap = new Map();
    const starshipMap = new Map();

    for (const planet of planets) {
      const existingPlanet = await prisma.planet.findUnique({
        where: { url: planet.url },
      });

      if (!existingPlanet) {
        const created = await prisma.planet.create({
          data: {
            url: planet.url,
            name: planet.name,
            rotation_period: planet.rotation_period,
            orbital_period: planet.orbital_period,
            diameter: planet.diameter,
            climate: planet.climate,
            gravity: planet.gravity,
            terrain: planet.terrain,
            surface_water: planet.surface_water,
            population: planet.population,
          },
        });
        planetMap.set(planet.url, created.id);
      } else {
        planetMap.set(planet.url, existingPlanet.id);
      }
    }

    for (const person of people) {
      const existingPerson = await prisma.people.findUnique({
        where: { url: person.url },
      });

      if (!existingPerson) {
        const created = await prisma.people.create({
          data: {
            url: person.url,
            name: person.name,
            height: person.height,
            mass: person.mass,
            hair_color: person.hair_color,
            skin_color: person.skin_color,
            eye_color: person.eye_color,
            birth_year: person.birth_year,
            gender: person.gender,
            homeworldId: person.homeworld
              ? planetMap.get(person.homeworld)
              : null,
          },
        });
        peopleMap.set(person.url, created.id);
      } else {
        peopleMap.set(person.url, existingPerson.id);
      }
    }

    for (const starship of starships) {
      const existingStarship = await prisma.starship.findUnique({
        where: { url: starship.url },
      });

      if (!existingStarship) {
        const created = await prisma.starship.create({
          data: {
            url: starship.url,
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            cost_in_credits: starship.cost_in_credits,
            length: starship.length,
            max_atmosphering_speed: starship.max_atmosphering_speed,
            crew: starship.crew,
            passengers: starship.passengers,
            cargo_capacity: starship.cargo_capacity,
            consumables: starship.consumables,
            hyperdrive_rating: starship.hyperdrive_rating,
            MGLT: starship.MGLT,
            starship_class: starship.starship_class,
          },
        });
        starshipMap.set(starship.url, created.id);
      } else {
        starshipMap.set(starship.url, existingStarship.id);
      }
    }

    for (const film of films) {
      const existingFilm = await prisma.film.findUnique({
        where: { url: film.url },
      });

      if (!existingFilm) {
        const created = await prisma.film.create({
          data: {
            url: film.url,
            title: film.title,
            episode_id: film.episode_id,
            opening_crawl: film.opening_crawl,
            director: film.director,
            producer: film.producer,
            release_date: film.release_date,
          },
        });
        filmMap.set(film.url, created.id);
      } else {
        filmMap.set(film.url, existingFilm.id);
      }
    }

    for (const film of films) {
      const filmId = filmMap.get(film.url);

      for (const characterUrl of film.characters) {
        const personId = peopleMap.get(characterUrl);
        if (personId) {
          const existingRelation = await prisma.filmOnCharacter.findFirst({
            where: { filmId, personId },
          });

          if (!existingRelation) {
            await prisma.filmOnCharacter.create({
              data: {
                filmId,
                personId,
              },
            });
          }
        }
      }

      for (const planetUrl of film.planets) {
        const planetId = planetMap.get(planetUrl);
        if (planetId) {
          const existingRelation = await prisma.filmOnPlanet.findFirst({
            where: { filmId, planetId },
          });

          if (!existingRelation) {
            await prisma.filmOnPlanet.create({
              data: {
                filmId,
                planetId,
              },
            });
          }
        }
      }

      for (const starshipUrl of film.starships) {
        const starshipId = starshipMap.get(starshipUrl);
        if (starshipId) {
          const existingRelation = await prisma.filmOnStarship.findFirst({
            where: { filmId, starshipId },
          });

          if (!existingRelation) {
            await prisma.filmOnStarship.create({
              data: {
                filmId,
                starshipId,
              },
            });
          }
        }
      }
    }

    for (const starship of starships) {
      const starshipId = starshipMap.get(starship.url);

      for (const pilotUrl of starship.pilots) {
        const pilotId = peopleMap.get(pilotUrl);
        if (pilotId) {
          const existingRelation = await prisma.starshipOnPilot.findFirst({
            where: { starshipId, pilotId },
          });

          if (!existingRelation) {
            await prisma.starshipOnPilot.create({
              data: {
                starshipId,
                pilotId,
              },
            });
          }
        }
      }
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

export default importData;
