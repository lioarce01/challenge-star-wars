import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const API_URL = process.env.API_URL || 'https://swapi.dev/api';

async function fetchAndStoreData() {
  try {
    // Fetch Films
    const filmsResponse = await axios.get(`${API_URL}/films/`);
    const films = filmsResponse.data.results;

    for (const film of films) {
      // Check if the film already exists
      const existingFilm = await prisma.film.findUnique({
        where: { id: film.id },
      });

      let filmData;
      if (existingFilm) {
        filmData = existingFilm;
      } else {
        // Create new film if it doesn't exist
        filmData = await prisma.film.create({
          data: {
            title: film.title,
            episode_id: film.episode_id,
            opening_crawl: film.opening_crawl,
            director: film.director,
            producer: film.producer,
            release_date: new Date(film.release_date),
            url: film.url,
          },
        });
      }

      // Store character IDs
      const characterIds: string[] = [];
      // Store planet IDs
      const planetIds: string[] = [];
      // Store starship IDs
      const starshipIds: string[] = [];

      // Fetch and store characters
      for (const characterUrl of film.characters) {
        const characterResponse = await axios.get(characterUrl);
        const character = characterResponse.data;

        const characterData = await prisma.people.upsert({
          where: { url: character.url },
          update: {},
          create: {
            name: character.name,
            height: character.height,
            mass: character.mass,
            hair_color: character.hair_color,
            skin_color: character.skin_color,
            eye_color: character.eye_color,
            birth_year: character.birth_year,
            gender: character.gender,
            homeworldId: await fetchAndStorePlanet(character.homeworld),
            filmIds: [], // Initialize empty array for film IDs
            starshipIds: [], // Initialize empty array for starship IDs
            url: character.url,
          },
        });

        characterIds.push(characterData.id);

        // Add film ID to character's filmIds
        await prisma.people.update({
          where: { id: characterData.id },
          data: {
            filmIds: { push: filmData.id },
          },
        });
      }

      // Fetch and store planets
      for (const planetUrl of film.planets) {
        const planetResponse = await axios.get(planetUrl);
        const planet = planetResponse.data;

        const planetData = await prisma.planet.upsert({
          where: { url: planet.url },
          update: {},
          create: {
            name: planet.name,
            rotation_period: planet.rotation_period,
            orbital_period: planet.orbital_period,
            diameter: planet.diameter,
            climate: planet.climate,
            gravity: planet.gravity,
            terrain: planet.terrain,
            surface_water: planet.surface_water,
            population: planet.population,
            filmIds: [], // Initialize empty array for film IDs
            residentIds: [], // Initialize empty array for resident IDs
            url: planet.url,
          },
        });

        planetIds.push(planetData.id);

        // Add film ID to planet's filmIds
        await prisma.planet.update({
          where: { id: planetData.id },
          data: {
            filmIds: { push: filmData.id },
          },
        });

        // Add residents
        for (const residentUrl of planet.residents) {
          const residentResponse = await axios.get(residentUrl);
          const resident = residentResponse.data;

          const residentData = await prisma.people.upsert({
            where: { url: resident.url },
            update: {},
            create: {
              name: resident.name,
              height: resident.height,
              mass: resident.mass,
              hair_color: resident.hair_color,
              skin_color: resident.skin_color,
              eye_color: resident.eye_color,
              birth_year: resident.birth_year,
              gender: resident.gender,
              homeworldId: planetData.id, // Set homeworld to the current planet
              filmIds: [], // Initialize empty array for film IDs
              starshipIds: [], // Initialize empty array for starship IDs
              url: resident.url,
            },
          });

          // Update planet with resident ID
          await prisma.planet.update({
            where: { id: planetData.id },
            data: {
              residentIds: { push: residentData.id },
            },
          });

          // Add film ID to resident's filmIds
          await prisma.people.update({
            where: { id: residentData.id },
            data: {
              filmIds: { push: filmData.id },
            },
          });
        }
      }

      // Fetch and store starships
      for (const starshipUrl of film.starships) {
        const starshipResponse = await axios.get(starshipUrl);
        const starship = starshipResponse.data;

        const starshipData = await prisma.starship.upsert({
          where: { url: starship.url },
          update: {},
          create: {
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
            pilotIds: [], // Initialize empty array for pilot IDs
            filmIds: [], // Initialize empty array for film IDs
            url: starship.url,
          },
        });

        starshipIds.push(starshipData.id);

        // Update film with starship ID
        await prisma.film.update({
          where: { id: filmData.id },
          data: {
            starshipIds: { push: starshipData.id },
          },
        });

        // Add film ID to starship's filmIds
        await prisma.starship.update({
          where: { id: starshipData.id },
          data: {
            filmIds: { push: filmData.id },
          },
        });

        // Fetch and store pilots
        for (const pilotUrl of starship.pilots) {
          const pilotResponse = await axios.get(pilotUrl);
          const pilot = pilotResponse.data;

          const pilotData = await prisma.people.upsert({
            where: { url: pilot.url },
            update: {},
            create: {
              name: pilot.name,
              height: pilot.height,
              mass: pilot.mass,
              hair_color: pilot.hair_color,
              skin_color: pilot.skin_color,
              eye_color: pilot.eye_color,
              birth_year: pilot.birth_year,
              gender: pilot.gender,
              homeworldId: await fetchAndStorePlanet(pilot.homeworld),
              filmIds: [], // Initialize empty array for film IDs
              starshipIds: [], // Initialize empty array for starship IDs
              url: pilot.url,
            },
          });

          // Update starship with pilot ID
          await prisma.starship.update({
            where: { id: starshipData.id },
            data: {
              pilotIds: { push: pilotData.id },
            },
          });

          // Add starship ID to pilot's starshipIds
          await prisma.people.update({
            where: { id: pilotData.id },
            data: {
              starshipIds: { push: starshipData.id },
            },
          });
        }
      }

      // Update film with character IDs
      await prisma.film.update({
        where: { id: filmData.id },
        data: {
          characterIds: { push: characterIds },
        },
      });

      // Update film with planet IDs
      await prisma.film.update({
        where: { id: filmData.id },
        data: {
          planetIds: { push: planetIds },
        },
      });

      // Update film with starship IDs
      await prisma.film.update({
        where: { id: filmData.id },
        data: {
          starshipIds: { push: starshipIds },
        },
      });
    }
  } catch (error) {
    console.error('Error in fetchAndStoreData:', error);
  }
}

// Helper function to fetch and store a planet
async function fetchAndStorePlanet(planetUrl: string): Promise<string> {
  const planetResponse = await axios.get(planetUrl);
  const planet = planetResponse.data;

  const planetData = await prisma.planet.upsert({
    where: { url: planet.url },
    update: {},
    create: {
      name: planet.name,
      rotation_period: planet.rotation_period,
      orbital_period: planet.orbital_period,
      diameter: planet.diameter,
      climate: planet.climate,
      gravity: planet.gravity,
      terrain: planet.terrain,
      surface_water: planet.surface_water,
      population: planet.population,
      filmIds: [], // Initialize empty array for film IDs
      residentIds: [], // Initialize empty array for resident IDs
      url: planet.url,
    },
  });

  return planetData.id;
}

async function main() {
  console.log('Fetching data from api...');
  await fetchAndStoreData();
  console.log('Data fetched and stored successfully');
}

main()
  .then(() => {
    console.log('Data fetching and storing completed.');
  })
  .catch((error) => {
    console.error('Error in main execution:', error);
  });
