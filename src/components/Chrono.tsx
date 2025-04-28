import { useEffect, useState } from "react";

export function Chrono() {
  const [time, setTime] = useState({
    minleft: 0,
    minRight: 0,
    secLeft: 0,
    secRight: 0,
    milLeft: 0,
    milRight: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
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

    return () => clearInterval(interval);
  }, []);

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
