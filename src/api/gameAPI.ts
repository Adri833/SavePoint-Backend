import axios from 'axios';

const rawgAPI = axios.create({
  baseURL: process.env.RAWG_BASE_URL,
  params: {
    key: process.env.RAWG_API_KEY,
  },
});

export const searchGames = async (query: string) => {
  const response = await rawgAPI.get('/games', {
    params: { search: query },
  });

  return response.data.results;
};

export const getGameById = async (id: string) => {
  const response = await rawgAPI.get(`/games/${id}`);
  return response.data;
};

export const getTrendingGames = async () => {
  const response = await rawgAPI.get('/games', {
    params: { ordering: '-added', page_size: 15, dates: '2025-01-01,2025-12-31' },
  });
  return response.data.results;
};

export const getUpcomingGames2026 = async () => {
  const response = await rawgAPI.get('/games', {
    params: {
      ordering: '-added', 
      page_size: 15,
      dates: '2026-01-01,2026-12-31'
    },
  });

  return response.data.results;
};