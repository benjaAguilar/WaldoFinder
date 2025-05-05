import { useCallback, useEffect, useRef, useState } from "react";
interface chronoProp {
  chronoState: string;
}

export function Chrono({ chronoState }: chronoProp) {
  const interval = useRef<number | null>(null);

  const [time, setTime] = useState({
    minleft: 0,
    minRight: 0,
    secLeft: 0,
    secRight: 0,
    milLeft: 0,
    milRight: 0,
  });

  const startChrono = useCallback(() => {
    if (interval.current !== null) return;

    interval.current = window.setInterval(() => {
      setTime((prevTime) => {
        let { minleft, minRight, secLeft, secRight, milLeft, milRight } =
          prevTime;

        milRight++;
        if (milRight > 9) {
          milRight = 0;
          milLeft++;
        }
        if (milLeft > 9) {
          milLeft = 0;
          secRight++;
        }
        if (secRight > 9) {
          secRight = 0;
          secLeft++;
        }
        if (secLeft > 5) {
          secLeft = 0;
          minRight++;
        }
        if (minRight > 9) {
          minRight = 0;
          minleft++;
        }

        return { minleft, minRight, secLeft, secRight, milLeft, milRight };
      });
    }, 10);
  }, []);

  const pauseChrono = useCallback(() => {
    if (interval.current !== null) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, []);

  useEffect(() => {
    if (chronoState === "start") {
      startChrono();
    }

    if (chronoState === "pause") {
      pauseChrono();
    }
  }, [chronoState, startChrono, pauseChrono]);

  return (
    <div>
      <p>
        {time.minleft}
        {time.minRight} : {time.secLeft}
        {time.secRight} : {time.milLeft}
        {time.milRight}
      </p>
    </div>
  );
}
