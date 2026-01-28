import { useMemo, useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Linen Shirt', category: 'Apparel', price: 48, rating: 4.2 },
  { id: 2, name: 'Ceramic Vase', category: 'Home', price: 65, rating: 4.6 },
  { id: 3, name: 'Bluetooth Speaker', category: 'Electronics', price: 129, rating: 4.4 },
  { id: 4, name: 'Leather Belt', category: 'Apparel', price: 38, rating: 4.1 },
  { id: 5, name: 'LED Desk Lamp', category: 'Home', price: 54, rating: 4.3 },
  { id: 6, name: 'Wireless Charger', category: 'Electronics', price: 49, rating: 4.0 },
];

const CATEGORY_OPTIONS = ['Apparel', 'Home', 'Electronics'];
const MAX_PRICE = Math.max(...PRODUCTS.map((product) => product.price));

/**
 * FacetedFiltersExample
 *
 * Multi-faceted filters: categories + price range + rating.
 */
export default function FacetedFiltersExample() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [minRating, setMinRating] = useState(0);

  // Combine facets so users can narrow results quickly.
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesPrice = product.price <= maxPrice;
      const matchesRating = product.rating >= minRating;

      return matchesCategory && matchesPrice && matchesRating;
    });
  }, [selectedCategories, maxPrice, minRating]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return (
    <section>
      <h3>Multi-Faceted Filters</h3>
      <fieldset>
        <legend>Categories</legend>
        {CATEGORY_OPTIONS.map((category) => (
          <label key={category} style={{ marginRight: '12px' }}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => toggleCategory(category)}
            />
            {category}
          </label>
        ))}
      </fieldset>

      <label htmlFor="price-range-input">
        Max price: ${maxPrice}
        <input
          id="price-range-input"
          type="range"
          min="0"
          max={MAX_PRICE}
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
        />
      </label>

      <label htmlFor="rating-filter-select">
        Minimum rating
        <select
          id="rating-filter-select"
          value={minRating}
          onChange={(event) => setMinRating(Number(event.target.value))}
        >
          <option value={0}>Any</option>
          <option value={3}>3.0+</option>
          <option value={4}>4.0+</option>
          <option value={4.5}>4.5+</option>
        </select>
      </label>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - {product.category} - ${product.price} - {product.rating}
          </li>
        ))}
      </ul>
    </section>
  );
}
