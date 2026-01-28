import { useMemo, useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Yoga Mat', price: 24 },
  { id: 2, name: 'Kettlebell', price: 59 },
  { id: 3, name: 'Resistance Bands', price: 18 },
  { id: 4, name: 'Foam Roller', price: 32 },
  { id: 5, name: 'Jump Rope', price: 14 },
];

/**
 * DerivedStateExample
 *
 * Derive filtered/sorted results from source data instead of storing them.
 */
export default function DerivedStateExample() {
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Derived results stay in sync with the source of truth.
  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(normalized)
    );

    return filtered.sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );
  }, [query, sortOrder]);

  return (
    <section>
      <h3>Derived State (no extra storage)</h3>
      <label htmlFor="derived-search-input">
        Search products
        <input
          id="derived-search-input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <label htmlFor="derived-sort-select">
        Sort by price
        <select
          id="derived-sort-select"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </label>
      <ul>
        {visibleProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </section>
  );
}
