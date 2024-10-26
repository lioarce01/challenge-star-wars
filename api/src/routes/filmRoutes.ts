import express, { Request, Response, RequestHandler } from 'express';
import { getAllFilms, getFilmById } from '../controllers/filmController';

const router = express.Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const films = await getAllFilms(offset, limit);

    if (films.length === 0) {
      res.status(404).json({ message: 'No films found' });
    }

    res.status(200).json(films);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching films' });
  }
});

const getFilmByIdHandler: RequestHandler<{ id: string }> = async (req, res) => {
  const film = await getFilmById(req.params.id);

  if ('error' in film && film.error) {
    res.status(404).json({ message: film.message });
  } else {
    res.status(200).json(film);
  }
};

router.get('/:id', getFilmByIdHandler);

export default router;
