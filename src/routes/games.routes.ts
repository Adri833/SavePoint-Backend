import { Router } from 'express';
import { searchGamesController, getGameByIdController, getTrendingGamesController } from '../controllers/games.controllers';

const router = Router();

router.get('/search', searchGamesController);
router.get('/trending', getTrendingGamesController);
router.get('/:id', getGameByIdController);

export default router;