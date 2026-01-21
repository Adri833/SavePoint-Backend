import { Router } from 'express';
import { searchGamesController, getGameByIdController, getTrendingGamesController } from '../controllers/games.controllers';
import { getUpcomingGames2026Controller } from '../controllers/games.controllers';

const router = Router();

router.get('/search', searchGamesController);
router.get('/trending', getTrendingGamesController);
router.get('/upcoming-2026', getUpcomingGames2026Controller);
router.get('/:id', getGameByIdController);

export default router;