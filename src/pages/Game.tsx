import { useEffect, useRef, useState } from "react";
import { Chrono } from "../components/Chrono";
import { useLocation } from "react-router-dom";
import { ImageData } from "../types/waldoImages";
import { fetchData } from "../utils/fetchData";
import { VictoryModal } from "../components/VictoryModal";

export function Game() {
  const location = useLocation();
  const dbImageData: ImageData | null = location.state || null;

  const imageRef = useRef<HTMLImageElement | null>(null);
  const crossElement = useRef<HTMLDivElement | null>(null);
  const [actualCoords, setActualCoords] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });
  const [chronoState, setChronoState] = useState("pause");
  const [userTime, setUserTime] = useState("00:00.00");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", calculateCoords);

    return () => window.removeEventListener("resize", calculateCoords);
  }, [calculateCoords]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function calculateCoords() {
    if (!imageRef.current) return;
    if (!dbImageData) return;

    const currentImageData = imageRef.current.getBoundingClientRect();

    setActualCoords({
      x1:
        (dbImageData.x1 * currentImageData.width) / dbImageData.width +
        currentImageData.left,
      x2:
        (dbImageData.x2 * currentImageData.width) / dbImageData.width +
        currentImageData.left,
      y1:
        (dbImageData.y1 * currentImageData.height) / dbImageData.height +
        currentImageData.top,
      y2:
        (dbImageData.y2 * currentImageData.height) / dbImageData.height +
        currentImageData.top,
    });
  }

  async function addStartDate() {
    const userWithStartDate = await fetchData(
      "/user/startDate",
      "PUT",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ dateISO: new Date().toISOString() })
    );

    if (!userWithStartDate.success) {
      return alert(userWithStartDate.message);
    }
  }

  async function addEndDate() {
    const userWithEndDate = await fetchData(
      "/user/endDate",
      "PUT",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({ dateISO: new Date().toISOString() })
    );

    if (!userWithEndDate.success) {
      return alert(userWithEndDate.message);
    }

    setUserTime(userWithEndDate.userWithEndDateAndTime.time);
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
      setChronoState("pause");
      addEndDate();
      setShowModal(true);
      console.log("You found Waldo!");
      alert("You found Waldo!");
    }

    if (crossElement.current) {
      if (waldoIsFound) {
        if (crossElement.current.firstChild)
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
        if (crossElement.current) crossElement.current.style.display = "none";
      }, 2000);
    }
  }

  return (
    <>
      {showModal ? <VictoryModal time={userTime} /> : null}
      <div className="chrono">
        <Chrono chronoState={chronoState} />
      </div>
      {dbImageData ? (
        <img
          className="waldoImage"
          src={dbImageData.imgRoute}
          alt={`${dbImageData.name} game`}
          ref={imageRef}
          onClick={getCoords}
          onLoad={() => {
            addStartDate();
            setChronoState("start");
            calculateCoords();
          }}
        />
      ) : (
        <p>error loading db data</p>
      )}
      <div className="cross" ref={crossElement}>
        <div>✘</div>
      </div>
    </>
  );
}
