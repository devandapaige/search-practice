import { useState } from 'react';

const SAMPLE_RESULTS = [
  { id: 1, name: 'Metal Watering Can' },
  { id: 2, name: 'Garden Gloves' },
];

/**
 * EmptyStatesExample
 *
 * Demonstrates loading, error, empty, and success states.
 */
export default function EmptyStatesExample() {
  const [status, setStatus] = useState('idle');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const simulateLoad = () => {
    setStatus('loading');
    setError('');
    window.setTimeout(() => {
      setResults(SAMPLE_RESULTS);
      setStatus('success');
    }, 700);
  };

  const showEmpty = () => {
    setResults([]);
    setError('');
    setStatus('success');
  };

  const showError = () => {
    setResults([]);
    setStatus('error');
    setError('We could not load results. Please retry.');
  };

  const reset = () => {
    setResults([]);
    setError('');
    setStatus('idle');
  };

  return (
    <section>
      <h3>Empty States</h3>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button type="button" onClick={simulateLoad}>
          Load Results
        </button>
        <button type="button" onClick={showEmpty}>
          Show Empty
        </button>
        <button type="button" onClick={showError}>
          Show Error
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>

      {/* Clear feedback prevents confusion during search workflows. */}
      {status === 'idle' && <p>Start a search to see results.</p>}
      {status === 'loading' && <p>Loading results...</p>}
      {status === 'error' && <p role="alert">{error}</p>}
      {status === 'success' && results.length === 0 && (
        <p>No results found. Try a different query.</p>
      )}
      {status === 'success' && results.length > 0 && (
        <ul>
          {results.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
