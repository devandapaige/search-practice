import { useEffect, useState } from 'react';

const CATEGORY_OPTIONS = ['all', 'apparel', 'home', 'electronics'];

/**
 * UrlStateSyncExample
 *
 * Syncs search state with URL query params for shareable links.
 */
export default function UrlStateSyncExample() {
  const [term, setTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('relevance');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    setTerm(params.get('q') ?? '');
    setCategory(params.get('category') ?? 'all');
    setSort(params.get('sort') ?? 'relevance');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const params = new URLSearchParams();
    if (term) params.set('q', term);
    if (category !== 'all') params.set('category', category);
    if (sort !== 'relevance') params.set('sort', sort);

    const queryString = params.toString();
    const nextUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    // Replace state so back button stays useful.
    window.history.replaceState({}, '', nextUrl);
  }, [term, category, sort]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setTerm(params.get('q') ?? '');
      setCategory(params.get('category') ?? 'all');
      setSort(params.get('sort') ?? 'relevance');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <section>
      <h3>URL State Sync</h3>
      <label htmlFor="url-search-input">
        Search term
        <input
          id="url-search-input"
          type="text"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
        />
      </label>
      <label htmlFor="url-category-select">
        Category
        <select
          id="url-category-select"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="url-sort-select">
        Sort
        <select
          id="url-sort-select"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </label>
      <p>
        URL parameters update as you type. Try refreshing or sharing the link.
      </p>
    </section>
  );
}
