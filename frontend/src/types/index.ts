export type User = {
  email: string;
  username?: string;
  token: string;
};

export type Question = {
  id: string;
  text: string;
  options: string[];
};

export type LeaderboardItem = {
  rank: number;
  name: string;
  score: number;
  college: string;
};
