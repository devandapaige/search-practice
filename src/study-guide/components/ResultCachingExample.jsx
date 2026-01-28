import { useEffect, useRef, useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Mesh Office Chair' },
  { id: 2, name: 'Task Chair Mat' },
  { id: 3, name: 'Standing Desk Converter' },
  { id: 4, name: 'Monitor Light Bar' },
  { id: 5, name: 'Cable Organizer' },
];

function mockSearchApi(term) {
  return new Promise((resolve) => {
    const normalized = term.trim().toLowerCase();
    const results = PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(normalized)
    );
    window.setTimeout(() => resolve(results), 400);
  });
}

/**
 * ResultCachingExample
 *
 * Caches search results to avoid redundant API calls.
 */
export default function ResultCachingExample() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('idle');
  const [source, setSource] = useState('network');
  const cacheRef = useRef(new Map());

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      setStatus('idle');
      setSource('network');
      return;
    }

    // Cache hits return instantly to keep the UI snappy.
    if (cacheRef.current.has(trimmed)) {
      setResults(cacheRef.current.get(trimmed));
      setStatus('success');
      setSource('cache');
      return;
    }

    setStatus('loading');
    setSource('network');

    mockSearchApi(trimmed).then((data) => {
      cacheRef.current.set(trimmed, data);
      setResults(data);
      setStatus('success');
    });
  }, [query]);

  return (
    <section>
      <h3>Result Caching</h3>
      <label htmlFor="cache-search-input">
        Search
        <input
          id="cache-search-input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <p>Status: {status}</p>
      {status === 'success' && <p>Source: {source}</p>}
      <ul>
        {results.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
}
