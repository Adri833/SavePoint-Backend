const formatDate = (date: Date): string => date.toISOString().split("T")[0];

const getNow = (): Date => new Date();

const getYear = (): number => getNow().getFullYear();

export const getToday = (): string => formatDate(getNow());

export const getStartOfCurrentWeek = (): string => {
  const today = getNow();
  const day = today.getDay();

  const diffToMonday = day === 0 ? -6 : 1 - day;

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() + diffToMonday);

  return formatDate(startOfWeek);
};

export const getEndOfCurrentWeek = (): string => {
  const today = getNow();
  const day = today.getDay();

  const diffToSunday = day === 0 ? 0 : 7 - day;

  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + diffToSunday);

  return formatDate(endOfWeek);
};

export const getCurrentWeekRange = (): string => {
  const start = getStartOfCurrentWeek();
  const end = getEndOfCurrentWeek();
  return `${start},${end}`;
};

export const getOneYearLater = (): string => {
  const date = getNow();
  date.setFullYear(date.getFullYear() + 1);
  return formatDate(date);
};

export const getCurrentYearRange = (): string => {
  const year = getYear();
  return `${year}-01-01,${year}-12-31`;
};

export const getLastYearRange = (): string => {
  const year = getYear() - 1;
  return `${year}-01-01,${year}-12-31`;
};

export const getFromTodayToNextYear = (): string =>
  `${getToday()},${getOneYearLater()}`;
