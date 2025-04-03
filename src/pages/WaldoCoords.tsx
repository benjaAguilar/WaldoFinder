import { useRef } from "react";

export function GetWaldoCoords() {
  const imageRef = useRef<HTMLImageElement | null>(null);

  function logCoords(e: React.MouseEvent<HTMLImageElement>) {
    if (!imageRef.current) return;

    const imageData = imageRef.current.getBoundingClientRect();
    console.dir(imageData);
    const relativeX = e.clientX - imageData.left;
    const relativeY = e.clientY - imageData.top;

    console.log(
      `Coordenadas originales en la imagen grande: x=${relativeX}, y=${relativeY}`
    );
  }

  return (
    <img
      ref={imageRef}
      src="/waldo1.webp"
      alt="Get Waldo's coordinates"
      onClick={logCoords}
    />
  );
}
