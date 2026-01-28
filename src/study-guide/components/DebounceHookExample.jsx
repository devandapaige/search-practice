import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

const PRODUCTS = [
  { id: 1, name: 'Cotton T-Shirt' },
  { id: 2, name: 'Canvas Sneakers' },
  { id: 3, name: 'Wool Scarf' },
  { id: 4, name: 'Leather Wallet' },
  { id: 5, name: 'Denim Jacket' },
  { id: 6, name: 'Running Shorts' },
];

function filterProducts(term) {
  const normalized = term.trim().toLowerCase();
  return PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(normalized)
  );
}

/**
 * DebounceHookExample
 *
 * Props:
 * - delay (number): debounce delay in ms, default 300
 */
export default function DebounceHookExample({ delay = 300 }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('idle');

  const debouncedQuery = useDebounce(query, delay);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (!trimmed) {
      setResults([]);
      setStatus('idle');
      return;
    }

    setStatus('loading');

    // Simulate a network request to show how debounce reduces calls.
    const timeoutId = window.setTimeout(() => {
      setResults(filterProducts(trimmed));
      setStatus('success');
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [debouncedQuery]);

  return (
    <section>
      <h3>Debounced Search (300ms)</h3>
      <label htmlFor="debounce-search-input">
        Search products
        <input
          id="debounce-search-input"
          type="text"
          value={query}
          placeholder="Try typing quickly..."
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <p>Status: {status}</p>
      <ul>
        {results.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
}
