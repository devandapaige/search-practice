import { useEffect, useState } from 'react';
import useThrottle from '../hooks/useThrottle';

const PRODUCTS = [
  { id: 1, name: 'Wireless Earbuds' },
  { id: 2, name: 'Noise Cancelling Headphones' },
  { id: 3, name: 'Portable Speaker' },
  { id: 4, name: 'Smart Watch' },
  { id: 5, name: 'Charging Cable' },
  { id: 6, name: 'Laptop Stand' },
];

function mockSearchApi(term) {
  return new Promise((resolve) => {
    const normalized = term.trim().toLowerCase();
    const results = PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(normalized)
    );
    window.setTimeout(() => resolve(results), 300);
  });
}

/**
 * ThrottleHookExample
 *
 * Props:
 * - delay (number): throttle interval in ms, default 500
 */
export default function ThrottleHookExample({ delay = 500 }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('idle');
  const [apiCalls, setApiCalls] = useState(0);

  const throttledQuery = useThrottle(query, delay);

  useEffect(() => {
    const trimmed = throttledQuery.trim();

    if (!trimmed) {
      setResults([]);
      setStatus('idle');
      return;
    }

    // Throttling protects APIs from rapid-fire keystrokes.
    setStatus('loading');
    setApiCalls((count) => count + 1);

    mockSearchApi(trimmed).then((data) => {
      setResults(data);
      setStatus('success');
    });
  }, [throttledQuery]);

  return (
    <section>
      <h3>Throttled Search (max every {delay}ms)</h3>
      <label htmlFor="throttle-search-input">
        Search products
        <input
          id="throttle-search-input"
          type="text"
          value={query}
          placeholder="Typing still triggers updates..."
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <p>Status: {status}</p>
      <p>API calls: {apiCalls}</p>
      <ul>
        {results.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
}
