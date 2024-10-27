import { Request, Response } from 'express';
import {
  getAllStarships,
  getStarshipById,
  getUniqueFilterValues,
} from '../services/starshipService';

export async function getStarships(req: Request, res: Response) {
  const { offset = 0, limit = 10 } = req.query;
  const { starship_class, manufacturer } = req.query;
  try {
    const filters: Record<string, string> = {};
    if (starship_class) {
      filters.starship_class = starship_class as string;
    }
    if (manufacturer) {
      filters.manufacturer = manufacturer as string;
    }

    const { results, count } = await getAllStarships(
      Number(offset),
      Number(limit),
      filters
    );
    res.status(200).json({ results, count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching starships' });
  }
}

export async function getStarshipByIdHandler(req: Request, res: Response) {
  const starship = await getStarshipById(req.params.id);

  if ('error' in starship && starship.error) {
    res.status(404).json({ message: starship.message });
  } else {
    res.status(200).json(starship);
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
