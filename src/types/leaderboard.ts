import { definedUser } from "./users";

export interface leaderboard {
  id: number;
  name: string;
  imageDataId: string;
}

export interface leaderboardUsersData {
  leaderboard: leaderboard;
  users: definedUser[];
}
