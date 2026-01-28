import { useEffect, useState } from 'react';

const PAGE_SIZE = 6;
const PRODUCTS = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  name: `Outdoor Product ${index + 1}`,
}));

function mockFetchPage(page) {
  return new Promise((resolve) => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const data = PRODUCTS.slice(start, end);
    const hasMore = end < PRODUCTS.length;

    window.setTimeout(() => resolve({ data, hasMore }), 400);
  });
}

/**
 * PaginationExample
 *
 * Load results in chunks with a "Load More" button.
 */
export default function PaginationExample() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let isMounted = true;
    setStatus('loading');

    mockFetchPage(page).then(({ data, hasMore: nextHasMore }) => {
      if (!isMounted) {
        return;
      }
      setItems((prev) => [...prev, ...data]);
      setHasMore(nextHasMore);
      setStatus('success');
    });

    return () => {
      isMounted = false;
    };
  }, [page]);

  const loadMore = () => {
    if (status === 'loading' || !hasMore) {
      return;
    }
    // Increment the page to fetch the next chunk.
    setPage((prev) => prev + 1);
  };

  return (
    <section>
      <h3>Pagination (Load More)</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {status === 'loading' && <p>Loading...</p>}
      {!hasMore && <p>End of results.</p>}
      {hasMore && (
        <button type="button" onClick={loadMore}>
          Load More
        </button>
      )}
    </section>
  );
}
