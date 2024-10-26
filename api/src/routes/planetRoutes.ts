import express, { RequestHandler } from 'express';
import { getAllPlanets, getPlanetById } from '../controllers/planetController';

const router = express.Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const planets = await getAllPlanets(offset, limit);

    if (!planets) {
      res.status(404).json({ message: 'No planets found' });
    }

    res.status(200).json(planets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching planets' });
  }
});

const getPlanetByIdHandler: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const planet = await getPlanetById(req.params.id);

  if ('error' in planet && planet.error) {
    res.status(404).json({ message: planet.message });
  } else {
    res.status(200).json(planet);
  }
};

router.get('/:id', getPlanetByIdHandler);
export default router;
