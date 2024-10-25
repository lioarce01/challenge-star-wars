import express from 'express';
import peopleRoutes from './peopleRoutes';
import planetsRoutes from './planetRoutes';
import filmsRoutes from './filmRoutes';
import starshipsRoutes from './starshipRoutes';
const router = express.Router();

router.use('/people', peopleRoutes);
router.use('/planets', planetsRoutes);
router.use('/films', filmsRoutes);
router.use('/starships', starshipsRoutes);

export default router;
