import { leaderboard } from "./leaderboard";

export interface ImageData {
  id: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  width: number;
  height: number;
  imgRoute: string;
  name: string;
  leaderboard: leaderboard;
}

export interface ImagesDataArr {
  images: ImageData[];
}

export interface waldoCardProps {
  imageData: ImageData;
}
