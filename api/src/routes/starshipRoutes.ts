import express, { RequestHandler } from 'express';
import {
  getAllStarships,
  getStarshipById,
} from '../controllers/starshipController';

const router = express.Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  const starships = await getAllStarships(offset, limit);
  if ('error' in starships && starships.error) {
    res.status(404).json({ message: starships.message });
  } else {
    res.status(200).json(starships);
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
