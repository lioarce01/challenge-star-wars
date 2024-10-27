import express, { Request, Response, RequestHandler } from 'express';
import {
  getFilms,
  getFilmByIdHandler,
  getFilterValues,
} from '../controllers/filmController';

const router = express.Router();

router.get('/', getFilms);

router.get('/filter-values', getFilterValues);

router.get('/:id', getFilmByIdHandler);

export default router;
