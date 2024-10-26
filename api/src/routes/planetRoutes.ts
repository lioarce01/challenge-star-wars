import express from 'express';
import {
  getPlanets,
  getPlanetByIdHandler,
} from '../controllers/planetController';

const router = express.Router();

router.get('/', getPlanets);

router.get('/:id', getPlanetByIdHandler);

export default router;
