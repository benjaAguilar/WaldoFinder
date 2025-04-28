interface props {
  img: string;
  title: string;
}

export function WaldoCard({ img, title }: props) {
  function setGame() {
    localStorage.setItem("game", title);
  }

  return (
    <div className="card">
      <img src={img} alt="waldo image" />
      <div className="data">
        <h3>{title}</h3>
        <a className="playB" href="/game" onClick={setGame}>
          Play
        </a>
        <button>Leaderboard</button>
      </div>
    </div>
  );
}
