import { Request, Response } from 'express';
import { getAllPeople, getPersonById } from '../services/peopleService';

export async function getPeople(req: Request, res: Response) {
  const { offset = 0, limit = 10 } = req.query;

  try {
    const people = await getAllPeople(Number(offset), Number(limit));
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
