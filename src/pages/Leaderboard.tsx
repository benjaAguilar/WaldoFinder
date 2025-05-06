import { useLocation } from "react-router-dom";
import { leaderboardUsersData } from "../types/leaderboard";

export function Leaderboard() {
  const location = useLocation();
  const leaderboard: leaderboardUsersData | null = location.state || null;

  return (
    <>
      <div className="leaderboard-box">
        <h1>{leaderboard?.leaderboard.name} Leaderboard</h1>
        <div className="grd">
          <div>
            <h3>Username</h3>
          </div>
          <div>
            <h3>Time</h3>
          </div>
        </div>
        {leaderboard
          ? leaderboard.users.map((user) => {
              return (
                <div key={user.id} className="grd">
                  <div>
                    <p>{user.username}</p>
                  </div>
                  <div>
                    <p>{user.time}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
