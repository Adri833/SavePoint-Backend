import { Request, Response } from 'express';
import { searchGames, getGameById, getTrendingGames } from '../api/gameAPI';
import { getUpcomingGames2026 } from '../api/gameAPI';

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
      return res.status(400).json({
        success: false,
        error: 'Query requerida',
      });
    }

    const games = await searchGames(query);

    const rankedGames = games.sort(
      (a: any, b: any) => scoreGame(b, query) - scoreGame(a, query)
    );

    res.json({
      success: true,
      games: rankedGames,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al buscar juegos',
    });
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

export const getTrendingGamesController = async (req: Request, res: Response) => {
    try {
        const games = await getTrendingGames();

        const mappedGames = games.map((game: any) => ({
            id: game.id,
            name: game.name,
            image: game.background_image,
            rating: game.rating,
            released: game.released,
        }));

        res.json(mappedGames);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al obtener juegos de tendencia' });
    }
};

export const getUpcomingGames2026Controller = async (req: Request, res: Response) => {
  try {
    const games = await getUpcomingGames2026();

    const sortedGames = games.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));

    const mappedGames = sortedGames.map((game: any) => ({
      id: game.id,
      name: game.name,
      image: game.background_image,
      rating: game.rating,
      released: game.released,
    }));

    res.json(mappedGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error al obtener juegos más esperados 2026' });
  }
};