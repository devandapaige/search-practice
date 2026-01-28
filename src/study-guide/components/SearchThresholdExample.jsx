import { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Travel Backpack' },
  { id: 2, name: 'Travel Mug' },
  { id: 3, name: 'Trail Running Shoes' },
  { id: 4, name: 'Trekking Poles' },
  { id: 5, name: 'Thermal Base Layer' },
];

function filterProducts(term) {
  const normalized = term.trim().toLowerCase();
  return PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(normalized)
  );
}

/**
 * SearchThresholdExample
 *
 * Props:
 * - minChars (number): minimum characters to auto-trigger search
 */
export default function SearchThresholdExample({ minChars = 3 }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [triggerSource, setTriggerSource] = useState('none');
  const [message, setMessage] = useState('');

  const triggerSearch = (term, source) => {
    const trimmed = term.trim();

    if (!trimmed) {
      setResults([]);
      setMessage('Type something or press Enter to search.');
      setTriggerSource('none');
      return;
    }

    setResults(filterProducts(trimmed));
    setTriggerSource(source);
    setMessage('');
  };

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setQuery(nextValue);

    // Keep short inputs from triggering noisy searches.
    if (nextValue.trim().length >= minChars) {
      triggerSearch(nextValue, 'auto');
    } else {
      setResults([]);
      setTriggerSource('none');
      setMessage(`Keep typing... (${minChars} characters required)`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      triggerSearch(query, 'enter');
    }
  };

  return (
    <section>
      <h3>Search Threshold (min {minChars} chars or Enter)</h3>
      <label htmlFor="threshold-search-input">
        Search products
        <input
          id="threshold-search-input"
          type="text"
          value={query}
          placeholder={`Type ${minChars}+ characters or press Enter`}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </label>
      <p>Trigger: {triggerSource}</p>
      {message && <p>{message}</p>}
      <ul>
        {results.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
}
