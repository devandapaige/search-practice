import { useMemo, useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Glass Food Container', price: 22 },
  { id: 2, name: 'Stainless Steel Straw', price: 9 },
  { id: 3, name: 'Bamboo Cutting Board', price: 28 },
  { id: 4, name: 'Silicone Spatula', price: 12 },
  { id: 5, name: 'Cast Iron Skillet', price: 48 },
];

function slowFilter(items, query) {
  // Simulate expensive work to justify memoization.
  let checksum = 0;
  for (let i = 0; i < 20000; i += 1) {
    checksum += i % 7;
  }

  const normalized = query.trim().toLowerCase();
  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(normalized)
  );

  // Use checksum so linting doesn't treat it as unused.
  return checksum > -1 ? filtered : [];
}

/**
 * MemoizationExample
 *
 * useMemo prevents expensive filtering on unrelated renders.
 */
export default function MemoizationExample() {
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('light');

  const results = useMemo(() => {
    return slowFilter(PRODUCTS, query);
  }, [query]);

  return (
    <section>
      <h3>Memoization with useMemo</h3>
      <label htmlFor="memo-search-input">
        Search
        <input
          id="memo-search-input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <button
        type="button"
        onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
      >
        Toggle theme ({theme})
      </button>
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </section>
  );
}
