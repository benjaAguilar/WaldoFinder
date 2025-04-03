import { useEffect, useRef, useState } from "react";

const originalImage = {
  coords: {
    x1: 458,
    y1: 1563,
    x2: 487,
    y2: 1527,
  },
  width: 2828,
  height: 1828,
};

export function Game() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [actualCoords, setActualCoords] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  useEffect(() => {
    window.addEventListener("resize", calculateCoords);
    return () => window.removeEventListener("resize", calculateCoords);
  }, []);

  function calculateCoords() {
    if (!imageRef.current) return;

    const imageData = imageRef.current.getBoundingClientRect();
    console.log(imageData);
    setActualCoords({
      x1:
        (originalImage.coords.x1 * imageData.width) / originalImage.width +
        imageData.left,
      x2:
        (originalImage.coords.x2 * imageData.width) / originalImage.width +
        imageData.left,
      y1:
        (originalImage.coords.y1 * imageData.height) / originalImage.height +
        imageData.top,
      y2:
        (originalImage.coords.y2 * imageData.height) / originalImage.height +
        imageData.top,
    });
  }

  function getCoords(e: React.MouseEvent<HTMLImageElement>) {
    console.log(actualCoords);
    console.log(`x: ${e.clientX} y: ${e.clientY}`);

    const adjustedY1 = actualCoords.y1 - window.scrollY;
    const adjustedY2 = actualCoords.y2 - window.scrollY;

    if (
      actualCoords.x1 <= e.clientX &&
      e.clientX <= actualCoords.x2 &&
      adjustedY2 <= e.clientY &&
      e.clientY <= adjustedY1
    ) {
      console.log("You found Waldo!");
      alert("You found Waldo!");
    }
  }

  return (
    <>
      <img
        className="waldoImage"
        src="/WaldoAndWarriors.webp"
        alt="Waldo's game"
        ref={imageRef}
        onClick={getCoords}
        onLoad={calculateCoords}
      />
    </>
  );
}
