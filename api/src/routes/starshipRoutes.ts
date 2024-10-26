import express, { RequestHandler } from 'express';
import {
  getStarships,
  getStarshipByIdHandler,
} from '../controllers/starshipController';

const router = express.Router();

router.get('/', getStarships);

router.get('/:id', getStarshipByIdHandler);

export default router;
