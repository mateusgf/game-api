import { Router } from 'express';
import gamesRouter from './games.route';
import playersRouter from './players.route';
import roundsRouter from './rounds.route';

const router = Router();

router.use('/games', gamesRouter);
router.use('/players', playersRouter);
router.use('/rounds', roundsRouter);

export default router;
