import express, { Request, Response, RequestHandler } from 'express';
import { getFilms, getFilmByIdHandler } from '../controllers/filmController';

const router = express.Router();

router.get('/', getFilms);

router.get('/:id', getFilmByIdHandler);

export default router;
