import { Router } from 'express';
import { searchGamesController, getGameByIdController } from '../controllers/games.controllers';

const router = Router();

router.get('/search', searchGamesController);
router.get('/:id', getGameByIdController);

export default router;