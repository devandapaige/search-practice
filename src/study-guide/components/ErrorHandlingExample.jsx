import { useRef, useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Stainless Steel Pan' },
  { id: 2, name: 'Nonstick Pan' },
  { id: 3, name: 'Sauce Pot' },
  { id: 4, name: 'Stock Pot' },
  { id: 5, name: 'Measuring Cups' },
];

const MAX_RETRIES = 2;
const BASE_DELAY_MS = 300;

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function mockUnstableSearch(encodedTerm) {
  const term = decodeURIComponent(encodedTerm).trim().toLowerCase();
  const shouldFail = Math.random() < 0.35;
  const latency = 300 + Math.random() * 400;

  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Temporary network issue. Retrying...'));
        return;
      }

      const results = PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(term)
      );
      resolve(results);
    }, latency);
  });
}

async function fetchWithRetry(encodedTerm, maxRetries) {
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      return await mockUnstableSearch(encodedTerm);
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      await wait(BASE_DELAY_MS * 2 ** attempt);
      attempt += 1;
    }
  }

  return [];
}

/**
 * ErrorHandlingExample
 *
 * Covers empty input, special characters, retry logic, and race conditions.
 */
export default function ErrorHandlingExample() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  // Track the latest request so older responses are ignored.
  const requestIdRef = useRef(0);

  const handleSearch = async () => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      setStatus('idle');
      setError('Please enter a search term.');
      return;
    }

    const encodedTerm = encodeURIComponent(trimmed);
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setStatus('loading');
    setError('');

    try {
      const data = await fetchWithRetry(encodedTerm, MAX_RETRIES);

      if (requestId !== requestIdRef.current) {
        return;
      }

      setResults(data);
      setStatus('success');
    } catch (err) {
      if (requestId !== requestIdRef.current) {
        return;
      }
      setError(err.message);
      setStatus('error');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setStatus('idle');
    setError('');
  };

  return (
    <section>
      <h3>Edge Cases & Error Handling</h3>
      <label htmlFor="error-search-input">
        Search
        <input
          id="error-search-input"
          type="text"
          value={query}
          placeholder="Try special characters like / or ?"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
        />
      </label>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </div>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p role="alert">{error}</p>}
      {status === 'success' && results.length === 0 && (
        <p>No results for "{query}".</p>
      )}
      {status === 'success' && results.length > 0 && (
        <ul>
          {results.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
