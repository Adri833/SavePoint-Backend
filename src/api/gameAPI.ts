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
