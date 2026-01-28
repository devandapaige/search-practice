import { useEffect, useRef, useState } from 'react';

/**
 * useThrottle
 * Limits updates to at most once per interval.
 * Useful when you want periodic updates while typing.
 *
 * @param {string} value - Raw input value
 * @param {number} delay - Throttle interval in ms
 * @returns {string} Throttled value
 */
export default function useThrottle(value, delay = 300) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRanRef = useRef(0);

  useEffect(() => {
    const now = Date.now();
    const remaining = delay - (now - lastRanRef.current);

    if (remaining <= 0) {
      lastRanRef.current = now;
      setThrottledValue(value);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      lastRanRef.current = Date.now();
      setThrottledValue(value);
    }, remaining);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return throttledValue;
}
