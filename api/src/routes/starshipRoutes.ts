import express from 'express';
import {
  getStarships,
  getStarshipByIdHandler,
  getFilterValues,
} from '../controllers/starshipController';

const router = express.Router();

router.get('/', getStarships);

router.get('/filter-values', getFilterValues);

router.get('/:id', getStarshipByIdHandler);

export default router;
