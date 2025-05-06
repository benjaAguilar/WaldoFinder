export interface user {
  id: number;
  username: string | null;
  startDate: Date | null;
  endDate: Date | null;
  timeInMs: number | null;
  time: string | null;
  leaderboardId: number;
}

export interface definedUser {
  id: number;
  username: string;
  startDate: Date;
  endDate: Date;
  timeInMs: number;
  time: string;
  leaderboardId: number;
}
