
import { useEffect, useRef } from 'react';

function releaseInterval(savedTimer: React.MutableRefObject<NodeJS.Timer | null>) {
  if (savedTimer.current) {
    console.log('销毁定时器');
    clearInterval(savedTimer.current);
    savedTimer.current = null;
  }
}

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  const savedTimer = useRef<NodeJS.Timer | null>(null);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    releaseInterval(savedTimer);
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const timer = setInterval(() => savedCallback.current(), delay);
    savedTimer.current = timer;
    console.log('注册定时器');
    return () => releaseInterval(savedTimer);
  }, [delay]);
}

export default useInterval;
