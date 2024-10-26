import { Request, Response } from 'express';
import { getAllPeople, getPersonById } from '../services/peopleService';

export async function getPeople(req: Request, res: Response) {
  const { offset = 0, limit = 10 } = req.query;
  const { gender, homeworld, hair_color, skin_color } = req.query;

  try {
    const filters: Record<string, string | { name: string }> = {};
    if (gender) {
      filters.gender = gender as string;
    }
    if (homeworld) {
      filters.homeworld = { name: homeworld as string };
    }
    if (hair_color) {
      filters.hair_color = hair_color as string;
    }
    if (skin_color) {
      filters.skin_color = skin_color as string;
    }

    const people = await getAllPeople(Number(offset), Number(limit), filters);
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching people' });
  }
}

export async function getPersonByIdHandler(req: Request, res: Response) {
  const person = await getPersonById(req.params.id);

  if ('error' in person && person.error) {
    res.status(404).json({ message: person.message });
  } else {
    res.status(200).json(person);
  }
}
