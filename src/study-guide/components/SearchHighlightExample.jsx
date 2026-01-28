import { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Reusable Water Bottle' },
  { id: 2, name: 'Waterproof Jacket' },
  { id: 3, name: 'Outdoor Lantern' },
  { id: 4, name: 'Camping Tent' },
  { id: 5, name: 'Portable Stove' },
];

// Escaping keeps special characters safe for regex highlighting.
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function HighlightText({ text, query }) {
  if (!query) {
    return text;
  }

  const safeQuery = escapeRegExp(query);
  const regex = new RegExp(`(${safeQuery})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const isMatch = part.toLowerCase() === query.toLowerCase();
    return isMatch ? <mark key={index}>{part}</mark> : <span key={index}>{part}</span>;
  });
}

/**
 * SearchHighlightExample
 *
 * Highlights matching search terms in results.
 */
export default function SearchHighlightExample() {
  const [query, setQuery] = useState('');

  return (
    <section>
      <h3>Search Result Highlighting</h3>
      <label htmlFor="highlight-search-input">
        Search
        <input
          id="highlight-search-input"
          type="text"
          value={query}
          placeholder="Try special characters like + or *"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <HighlightText text={product.name} query={query} />
          </li>
        ))}
      </ul>
    </section>
  );
}
