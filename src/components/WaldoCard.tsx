import { useNavigate } from "react-router-dom";
import { waldoCardProps } from "../types/waldoImages";
import { fetchData } from "../utils/fetchData";

export function WaldoCard({ imageData }: waldoCardProps) {
  const navigate = useNavigate();

  async function setGame(leaderboardId: number) {
    const user = await fetchData(
      "/user",
      "POST",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ leaderboardId })
    );

    if (!user.success) {
      return alert(user.message);
    }

    console.log("user created!");
    console.log(user);

    // enviar al usuario a jugar el juego elegido, incluyendo toda la data
    navigate("/game", { state: imageData });
  }

  return (
    <div className="card">
      <img src={imageData.imgRoute} alt={`${name} image`} />
      <div className="data">
        <h3>{imageData.name}</h3>
        <button
          className="playB"
          onClick={() => {
            setGame(imageData.leaderboard.id);
          }}
        >
          Play
        </button>
        <button>Leaderboard</button>
      </div>
    </div>
  );
}
