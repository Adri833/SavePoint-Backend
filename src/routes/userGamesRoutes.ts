import { Router } from 'express';
import { getUserGames, addUserGame, updateUserGame, deleteUserGame } from '../controllers/userGamesController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getUserGames);
router.post('/', addUserGame);
router.patch('/:id', updateUserGame);
router.delete('/:id', deleteUserGame);

export default router;
