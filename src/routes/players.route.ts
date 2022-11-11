import { Router } from 'express';
import controller from './../controllers/players.controller';

const router = Router();

router.route('/new').post(controller.createPlayer);
router.route('/:nickname').get(controller.findByNickname);

export default router;
