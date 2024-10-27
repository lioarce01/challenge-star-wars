import express from 'express';
import {
  getPeople,
  getPersonByIdHandler,
  getFilterValues,
} from '../controllers/peopleController';

const router = express.Router();

router.get('/', getPeople);

router.get('/filter-values', getFilterValues);

router.get('/:id', getPersonByIdHandler);

export default router;
