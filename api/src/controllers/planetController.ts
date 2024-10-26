import { Request, Response } from 'express';
import {
  getAllPlanets,
  getPlanetById,
  getUniqueFilterValues,
} from '../services/planetService';

export async function getPlanets(req: Request, res: Response) {
  const { offset = 0, limit = 10 } = req.query;
  const { climate, terrain } = req.query;

  try {
    const filters: Record<string, string | { contains: string }> = {};
    if (climate) {
      filters.climate = { contains: climate as string };
    }
    if (terrain) {
      filters.terrain = { contains: (terrain as string).split(',')[0] };
    }

    const { results, count } = await getAllPlanets(
      Number(offset),
      Number(limit),
      filters
    );
    res.status(200).json({ results, count });
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

export async function getFilterValues(req: Request, res: Response) {
  try {
    const filterValues = await getUniqueFilterValues();
    res.status(200).json(filterValues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching filter values' });
  }
}
