import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { getAllPlanets, getPlanetById } from '../services/planetService';

const prisma = new PrismaClient();

export async function getPlanets(req: Request, res: Response) {
  const { offset = 0, limit = 10 } = req.query;

  try {
    const planets = await getAllPlanets(Number(offset), Number(limit));
    res.status(200).json(planets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching planets' });
  }
}

export async function getPlanetByIdHandler(req: Request, res: Response) {
  const planet = await getPlanetById(req.params.id);

  if ('error' in planet && planet.error) {
    res.status(404).json({ message: planet.message });
  } else {
    res.status(200).json(planet);
  }
}
