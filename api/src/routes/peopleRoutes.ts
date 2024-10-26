import express from 'express';
import {
  getPeople,
  getPersonByIdHandler,
} from '../controllers/peopleController';

const router = express.Router();

router.get('/', getPeople);

router.get('/:id', getPersonByIdHandler);

export default router;
