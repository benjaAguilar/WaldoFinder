import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Game } from "./pages/Game";

import { ErrorPage } from "./pages/ErrorPage";
import { Leaderboard } from "./pages/Leaderboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
]);
