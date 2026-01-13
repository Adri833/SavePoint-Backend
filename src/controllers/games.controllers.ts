import { Request, Response } from 'express';
import { searchGames, getGameById } from '../api/gameAPI';

/* Calcula un puntaje de relevancia para un juego según query */
const scoreGame = (game: any, query: string) => {
    const name = game.name.toLowerCase();
    const q = query.toLowerCase();
    let score = 0;

    // Coincidencia exacta o parcial en el nombre
    if (name === q) score += 100;
    else if (name.startsWith(q)) score += 80;
    else if (name.includes(q)) score += 40;

    // Popularidad
    if (game.added) score += Math.min(game.added / 10, 50);

    // Calidad
    if (game.metacritic) score += game.metacritic;
    if (game.rating) score += game.rating * 10;

    return score;
};

export const searchGamesController = async (req: Request, res: Response) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== 'string') {
            return res.status(400).json({ success: false, error: 'Query requerida' });
        }

        const games = await searchGames(query);

        // Ordenar por relevancia
        const rankedGames = games.sort((a: any, b: any) => scoreGame(b, query) - scoreGame(a, query));

        res.json(rankedGames);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al buscar juegos' });
    }
};

export const getGameByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const game = await getGameById(String(id));
        res.json(game);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al obtener el juego' });
    }
};
