import { Router } from 'express';
import controller from './../controllers/rounds.controller';

const router = Router();

router.route('/new').post(controller.createRound);
router.route('/update').put(controller.updateRound);
router.route('/:gameId').get(controller.findAllByGameId);

export default router;
