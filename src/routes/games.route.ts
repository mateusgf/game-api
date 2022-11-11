import { Router } from 'express';
import controller from './../controllers/games.controller';

const router = Router();

router.route('/').get(controller.findAll);
router.route('/new').post(controller.createGame);
router.route('/join-game').post(controller.joinGame);
router.route('/:id').get(controller.findById);

export default router;
