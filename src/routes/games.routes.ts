import { Router } from 'express';
import { searchGamesController, getGameByIdController, getTrendingGamesController, getUpcomingGamesController, getGamesThisWeekController } from '../controllers/games.controllers';

const router = Router();

router.get('/search', searchGamesController);
router.get('/trending', getTrendingGamesController);
router.get('/upcoming-next-year', getUpcomingGamesController);
router.get('/this-week', getGamesThisWeekController);
router.get('/:id', getGameByIdController);

export default router;