export interface GameDTO {
  id: number;
  name: string;
  image: string | null;
  rating?: number;
  released?: string;
  platforms?: string[];
}

export const mapRawgGame = (game: any): GameDTO => ({
  id: game.id,
  name: game.name,
  image: game.background_image ?? "https://www.shutterstock.com/shutterstock/videos/3792325319/thumb/1.jpg?ip=x480",
  rating: game.rating,
  released: game.released,
  platforms: game.platforms?.map((p: any) => p.platform.name) ?? [],
});

export const mapRawgGames = (games: any[]): GameDTO[] =>
  games.map(mapRawgGame);
