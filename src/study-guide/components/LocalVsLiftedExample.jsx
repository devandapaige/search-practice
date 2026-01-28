import { useMemo, useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Standing Desk' },
  { id: 2, name: 'Desk Lamp' },
  { id: 3, name: 'Ergonomic Chair' },
  { id: 4, name: 'Keyboard Tray' },
  { id: 5, name: 'Monitor Arm' },
];

function filterProducts(term) {
  const normalized = term.trim().toLowerCase();
  return PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(normalized)
  );
}

/**
 * LocalVsLiftedExample
 *
 * Shows when to keep search state local and when to lift it up.
 */
export default function LocalVsLiftedExample() {
  const [liftedQuery, setLiftedQuery] = useState('');

  // Lifted state lets multiple children reuse the same results.
  const liftedResults = useMemo(
    () => filterProducts(liftedQuery),
    [liftedQuery]
  );

  return (
    <section>
      <h3>Local vs Lifted Search State</h3>
      <div style={{ display: 'grid', gap: '16px' }}>
        <LocalSearchPanel />
        <LiftedSearchPanel
          query={liftedQuery}
          onQueryChange={setLiftedQuery}
          results={liftedResults}
        />
      </div>
    </section>
  );
}

function LocalSearchPanel() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => filterProducts(query), [query]);

  return (
    <div>
      <h4>Local State (single widget)</h4>
      <p>
        Keep search state local when the input and results live together.
      </p>
      <label htmlFor="local-search-input">
        Search
        <input
          id="local-search-input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <ul>
        {results.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

function LiftedSearchPanel({ query, onQueryChange, results }) {
  return (
    <div>
      <h4>Lifted State (shared across siblings)</h4>
      <p>
        Lift search state when multiple components need the same query or
        results.
      </p>
      <label htmlFor="lifted-search-input">
        Search
        <input
          id="lifted-search-input"
          type="text"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </label>
      <SearchSummary results={results} />
      <SearchResults results={results} />
    </div>
  );
}

function SearchSummary({ results }) {
  return <p>Results found: {results.length}</p>;
}

function SearchResults({ results }) {
  return (
    <ul>
      {results.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
