import { WaldoCard } from "../components/WaldoCard";

export function Home() {
  return (
    <div className="home">
      <h1>Waldo finder</h1>
      <p>Lets find waldo</p>
      <div className="grid">
        <WaldoCard img="/waldoBeach.webp" title="Waldo on the beach" />
        <WaldoCard img="/WaldoAndWarriors.webp" title="Waldo and warriors" />
        <WaldoCard img="/waldodragons.webp" title="Waldo and dragons" />
      </div>
      <a href="/game">Play</a>
    </div>
  );
}
