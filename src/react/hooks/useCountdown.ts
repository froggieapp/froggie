import { useEffect, useRef, useState } from "preact/hooks";
import * as dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(updateLocale);
dayjs.extend(relativeTime, {
  thresholds: [
    { l: "s", r: 59, d: "second" },
    { l: "m", r: 1 },
    { l: "mm", r: 59, d: "minute" },
    { l: "h", r: 1 },
    { l: "hh", r: 23, d: "hour" },
    { l: "d", r: 1 },
    { l: "dd", r: 29, d: "day" },
    { l: "M", r: 1 },
    { l: "MM", r: 11, d: "month" },
    { l: "y", r: 1 },
    { l: "yy", d: "year" },
  ],
});

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%d seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

export const useCountdown = (date: string | undefined, onFinish?: () => void) => {
  const onFinishCb = useRef(onFinish);
  useEffect(() => {
    onFinishCb.current = onFinish;
  });
  const [countdown, setCountdown] = useState(() => (date ? dayjs(date).toNow(true) : ""));

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (!date) return;
    const runTimeout = () => {
      const diff = dayjs(date).toNow(true);
      setCountdown(diff);
      if (dayjs(date).isAfter()) {
        timeout = setTimeout(runTimeout, 1000);
      } else {
        onFinishCb.current?.();
      }
    };
    runTimeout();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [setCountdown, date]);

  return countdown;
};
