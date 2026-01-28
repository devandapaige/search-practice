import { useMemo, useState } from 'react';

const ITEMS = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `Bulk Item ${index + 1}`,
}));

const ITEM_HEIGHT = 32;
const VIEWPORT_HEIGHT = 240;
const OVERSCAN = 4;

/**
 * VirtualizationExample
 *
 * Renders only visible items to keep large lists fast.
 */
export default function VirtualizationExample() {
  const [scrollTop, setScrollTop] = useState(0);

  const { visibleItems, paddingTop, paddingBottom } = useMemo(() => {
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN
    );
    const endIndex = Math.min(
      ITEMS.length,
      Math.ceil((scrollTop + VIEWPORT_HEIGHT) / ITEM_HEIGHT) + OVERSCAN
    );

    return {
      visibleItems: ITEMS.slice(startIndex, endIndex),
      paddingTop: startIndex * ITEM_HEIGHT,
      paddingBottom: (ITEMS.length - endIndex) * ITEM_HEIGHT,
    };
  }, [scrollTop]);

  return (
    <section>
      <h3>Virtualization (Windowing)</h3>
      <p>
        This manual windowing mimics libraries like react-window for large
        result sets.
      </p>
      <div
        style={{
          height: VIEWPORT_HEIGHT,
          overflowY: 'auto',
          border: '1px solid #ddd',
        }}
        onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      >
        <div style={{ paddingTop, paddingBottom }}>
          {visibleItems.map((item) => (
            <div
              key={item.id}
              style={{
                height: ITEM_HEIGHT,
                display: 'flex',
                alignItems: 'center',
                padding: '0 8px',
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
