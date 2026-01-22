import axios from "axios";
import {
  getLastYearRange,
  getCurrentWeekRange,
  getFromTodayToNextYear,
} from "../utils/dateUtils";

const rawgAPI = axios.create({
  baseURL: process.env.RAWG_BASE_URL,
  params: {
    key: process.env.RAWG_API_KEY,
  },
});

export const searchGames = async (query: string) => {
  const response = await rawgAPI.get("/games", {
    params: { search: query },
  });

  return response.data.results;
};

export const getGameById = async (id: string) => {
  const response = await rawgAPI.get(`/games/${id}`);
  return response.data;
};

export const getTrendingGames = async () => {
  const response = await rawgAPI.get("/games", {
    params: {
      ordering: "-added",
      page_size: 15,
      dates: getLastYearRange(),
    },
  });

  return response.data.results;
};

export const getUpcomingGames = async () => {
  const response = await rawgAPI.get("/games", {
    params: {
      ordering: "-added",
      page_size: 15,
      dates: getFromTodayToNextYear(),
    },
  });

  return response.data.results;
};

export const getGamesThisWeek = async () => {
  const weekRange = getCurrentWeekRange();

  const response = await rawgAPI.get("/games", {
    params: {
      ordering: "-added",
      page_size: 15,
      dates: getCurrentWeekRange(),
    },
  });

  return response.data.results;
};
