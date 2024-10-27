import express from 'express';
import {
  getPlanets,
  getPlanetByIdHandler,
  getFilterValues,
} from '../controllers/planetController';

const router = express.Router();

router.get('/', getPlanets);

router.get('/filter-values', getFilterValues);

router.get('/:id', getPlanetByIdHandler);

export default router;
