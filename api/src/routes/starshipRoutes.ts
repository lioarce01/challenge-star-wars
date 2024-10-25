import express, { RequestHandler } from 'express';
import {
  getAllStarships,
  getStarshipById,
} from '../controllers/starshipController';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const starships = await getAllStarships();
    res.status(200).json(starships);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching starships' });
  }
});

const getStarshipByIdHandler: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const starship = await getStarshipById(req.params.id);

  if ('error' in starship && starship.error) {
    res.status(404).json({ message: starship.message });
  } else {
    res.status(200).json(starship);
  }
};

router.get('/:id', getStarshipByIdHandler);

export default router;
