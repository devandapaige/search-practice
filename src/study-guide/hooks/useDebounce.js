import { useEffect, useState } from 'react';

/**
 * useDebounce
 * Waits for the user to stop typing before updating a value.
 * This avoids extra API calls while the user is still typing.
 *
 * @param {string} value - Raw input value
 * @param {number} delay - Debounce delay in ms
 * @returns {string} Debounced value
 */
export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Delay the update until the user pauses typing.
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}
