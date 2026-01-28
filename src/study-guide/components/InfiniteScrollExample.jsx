import { useEffect, useRef, useState } from 'react';

const PAGE_SIZE = 8;
const PRODUCTS = Array.from({ length: 40 }, (_, index) => ({
  id: index + 1,
  name: `Skin Care Item ${index + 1}`,
}));

function mockFetchPage(page) {
  return new Promise((resolve) => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const data = PRODUCTS.slice(start, end);
    const hasMore = end < PRODUCTS.length;

    window.setTimeout(() => resolve({ data, hasMore }), 500);
  });
}

/**
 * InfiniteScrollExample
 *
 * Automatically loads more results when the user scrolls near the bottom.
 */
export default function InfiniteScrollExample() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    mockFetchPage(page).then(({ data, hasMore: nextHasMore }) => {
      if (!isMounted) {
        return;
      }
      setItems((prev) => [...prev, ...data]);
      setHasMore(nextHasMore);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [page]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    // When the sentinel enters view, load the next page.
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [isLoading, hasMore]);

  return (
    <section>
      <h3>Infinite Scroll</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {isLoading && <p>Loading more...</p>}
      {!hasMore && <p>End of results.</p>}
      <div ref={sentinelRef} style={{ height: '1px' }} />
    </section>
  );
}
