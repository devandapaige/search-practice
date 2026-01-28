import { useEffect, useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Espresso Machine' },
  { id: 2, name: 'Coffee Grinder' },
  { id: 3, name: 'Ceramic Mug' },
  { id: 4, name: 'Cold Brew Pitcher' },
  { id: 5, name: 'Milk Frother' },
];

function mockSearchRequest(term, signal) {
  return new Promise((resolve, reject) => {
    const normalized = term.trim().toLowerCase();
    const timeoutId = window.setTimeout(() => {
      const results = PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(normalized)
      );
      resolve(results);
    }, 600);

    signal.addEventListener('abort', () => {
      window.clearTimeout(timeoutId);
      reject(new DOMException('Request cancelled', 'AbortError'));
    });
  });
}

/**
 * RequestCancellationExample
 *
 * Demonstrates AbortController to cancel in-flight requests.
 */
export default function RequestCancellationExample() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      setStatus('idle');
      setError('');
      return;
    }

    // Abort previous request so stale results never win.
    const controller = new AbortController();

    setStatus('loading');
    setError('');

    mockSearchRequest(trimmed, controller.signal)
      .then((data) => {
        setResults(data);
        setStatus('success');
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message);
        setStatus('error');
      });

    return () => controller.abort();
  }, [query]);

  return (
    <section>
      <h3>AbortController Request Cancellation</h3>
      <label htmlFor="abort-search-input">
        Search products
        <input
          id="abort-search-input"
          type="text"
          value={query}
          placeholder="New query cancels prior request"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <p>Status: {status}</p>
      {error && <p role="alert">Error: {error}</p>}
      <ul>
        {results.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
}
