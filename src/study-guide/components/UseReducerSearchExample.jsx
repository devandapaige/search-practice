import { useMemo, useReducer } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Classic Sofa', category: 'Furniture', price: 899, rating: 4.6 },
  { id: 2, name: 'Modern Sofa', category: 'Furniture', price: 1099, rating: 4.3 },
  { id: 3, name: 'Accent Pillow', category: 'Decor', price: 35, rating: 4.1 },
  { id: 4, name: 'Area Rug', category: 'Decor', price: 249, rating: 4.8 },
  { id: 5, name: 'Floor Lamp', category: 'Lighting', price: 129, rating: 4.2 },
  { id: 6, name: 'Pendant Light', category: 'Lighting', price: 199, rating: 4.7 },
  { id: 7, name: 'Coffee Table', category: 'Furniture', price: 399, rating: 4.4 },
  { id: 8, name: 'Wall Art Set', category: 'Decor', price: 89, rating: 4.0 },
];

const CATEGORY_OPTIONS = ['Furniture', 'Decor', 'Lighting'];

const initialState = {
  term: '',
  filters: {
    categories: [],
  },
  sort: 'relevance',
  page: 1,
  pageSize: 4,
};

function searchReducer(state, action) {
  switch (action.type) {
    case 'set_term':
      return { ...state, term: action.payload, page: 1 };
    case 'toggle_category': {
      const exists = state.filters.categories.includes(action.payload);
      const categories = exists
        ? state.filters.categories.filter((category) => category !== action.payload)
        : [...state.filters.categories, action.payload];
      return {
        ...state,
        filters: { ...state.filters, categories },
        page: 1,
      };
    }
    case 'set_sort':
      return { ...state, sort: action.payload };
    case 'load_more':
      return { ...state, page: state.page + 1 };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function applySorting(items, sort) {
  const sorted = [...items];

  if (sort === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating-desc') {
    sorted.sort((a, b) => b.rating - a.rating);
  }

  return sorted;
}

/**
 * UseReducerSearchExample
 *
 * Demonstrates a reducer for complex search state:
 * term + filters + sorting + pagination.
 */
export default function UseReducerSearchExample() {
  // Reducer keeps complex search updates in one predictable place.
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const filteredResults = useMemo(() => {
    const normalizedTerm = state.term.trim().toLowerCase();

    const termFiltered = PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(normalizedTerm)
    );

    const categoryFiltered =
      state.filters.categories.length === 0
        ? termFiltered
        : termFiltered.filter((product) =>
            state.filters.categories.includes(product.category)
          );

    return applySorting(categoryFiltered, state.sort);
  }, [state.term, state.filters.categories, state.sort]);

  const pagedResults = useMemo(() => {
    return filteredResults.slice(0, state.page * state.pageSize);
  }, [filteredResults, state.page, state.pageSize]);

  return (
    <section>
      <h3>useReducer for Complex Search State</h3>
      <label htmlFor="reducer-search-input">
        Search catalog
        <input
          id="reducer-search-input"
          type="text"
          value={state.term}
          onChange={(event) =>
            dispatch({ type: 'set_term', payload: event.target.value })
          }
        />
      </label>

      <fieldset>
        <legend>Categories</legend>
        {CATEGORY_OPTIONS.map((category) => (
          <label key={category} style={{ marginRight: '12px' }}>
            <input
              type="checkbox"
              checked={state.filters.categories.includes(category)}
              onChange={() =>
                dispatch({ type: 'toggle_category', payload: category })
              }
            />
            {category}
          </label>
        ))}
      </fieldset>

      <label htmlFor="reducer-sort-select">
        Sort
        <select
          id="reducer-sort-select"
          value={state.sort}
          onChange={(event) =>
            dispatch({ type: 'set_sort', payload: event.target.value })
          }
        >
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating</option>
        </select>
      </label>

      <div>
        <button type="button" onClick={() => dispatch({ type: 'reset' })}>
          Reset Filters
        </button>
      </div>

      <ul>
        {pagedResults.map((product) => (
          <li key={product.id}>
            {product.name} - {product.category} - ${product.price} - {product.rating}
          </li>
        ))}
      </ul>

      {pagedResults.length < filteredResults.length && (
        <button type="button" onClick={() => dispatch({ type: 'load_more' })}>
          Load more
        </button>
      )}
    </section>
  );
}
