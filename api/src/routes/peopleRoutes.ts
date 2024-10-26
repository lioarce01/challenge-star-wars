import express, { RequestHandler } from 'express';
import { getAllPeople, getPersonById } from '../controllers/peopleController';
import { PrismaClient } from '@prisma/client';

const router = express.Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const people = await getAllPeople(offset, limit);

    if (!people) {
      res.status(404).json({ message: 'No people found' });
    }

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching people' });
  }
});

const getPersonByIdHandler: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const person = await getPersonById(req.params.id);

  if ('error' in person && person.error) {
    res.status(404).json({ message: person.message });
  } else {
    res.status(200).json(person);
  }
};

router.get('/:id', getPersonByIdHandler);

export default router;
