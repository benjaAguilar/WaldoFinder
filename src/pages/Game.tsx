import { useEffect, useRef, useState } from "react";
import mockDB from "../mockDB.json";
import { Chrono } from "../components/Chrono";

export function Game() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const crossElement = useRef<HTMLDivElement | null>(null);
  const [waldoGame, setWaldoGame] = useState(mockDB.waldoBeach);
  const [actualCoords, setActualCoords] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  useEffect(() => {
    window.addEventListener("resize", calculateCoords);

    const game = localStorage.getItem("game");
    if (game === "Waldo and warriors") {
      setWaldoGame(mockDB.waldoWarriors);
    } else if (game === "Waldo and dragons") {
      setWaldoGame(mockDB.waldoDragons);
    }

    return () => window.removeEventListener("resize", calculateCoords);
  }, [calculateCoords]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function calculateCoords() {
    if (!imageRef.current) return;

    const imageData = imageRef.current.getBoundingClientRect();
    console.log(imageData);
    setActualCoords({
      x1:
        (waldoGame.coords.x1 * imageData.width) / waldoGame.width +
        imageData.left,
      x2:
        (waldoGame.coords.x2 * imageData.width) / waldoGame.width +
        imageData.left,
      y1:
        (waldoGame.coords.y1 * imageData.height) / waldoGame.height +
        imageData.top,
      y2:
        (waldoGame.coords.y2 * imageData.height) / waldoGame.height +
        imageData.top,
    });
  }

  function getCoords(e: React.MouseEvent<HTMLImageElement>) {
    console.log(actualCoords);
    console.log(`x: ${e.clientX} y: ${e.clientY}`);
    let waldoIsFound = false;

    const adjustedY1 = actualCoords.y1 - window.scrollY;
    const adjustedY2 = actualCoords.y2 - window.scrollY;

    if (
      actualCoords.x1 <= e.clientX &&
      e.clientX <= actualCoords.x2 &&
      adjustedY2 <= e.clientY &&
      e.clientY <= adjustedY1
    ) {
      waldoIsFound = true;
      console.log("You found Waldo!");
      alert("You found Waldo!");
    }

    if (crossElement.current) {
      if (waldoIsFound) {
        crossElement.current.firstChild.textContent = "✔";
        crossElement.current.style.color = "greenyellow";
        crossElement.current.style.borderColor = "greenyellow";
      }

      crossElement.current.style.display = "flex";
      const width = crossElement.current.offsetWidth;
      const height = crossElement.current.offsetHeight;
      crossElement.current.style.top = `${
        e.clientY + window.scrollY - height / 2
      }px`;
      crossElement.current.style.left = `${e.clientX - width / 2}px`;

      setTimeout(() => {
        crossElement.current.style.display = "none";
      }, 2000);
    }
  }

  return (
    <>
      <div className="chrono">
        <Chrono />
      </div>
      <img
        className="waldoImage"
        src={waldoGame.img}
        alt="Waldo's game"
        ref={imageRef}
        onClick={getCoords}
        onLoad={calculateCoords}
      />
      <div className="cross" ref={crossElement}>
        <div>✘</div>
      </div>
    </>
  );
}
