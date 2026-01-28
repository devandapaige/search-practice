# E-commerce Search Patterns & React Best Practices

This guide is a practical reference for building fast, reliable search
experiences in React. Every pattern below has a **working component** in
`src/study-guide/components` and is easy to import into `App.jsx` to run.

## Quick Start

```jsx
import {
  DebounceHookExample,
  AutocompleteExample,
  ErrorHandlingExample,
} from './study-guide';

export default function App() {
  return (
    <div>
      <DebounceHookExample />
      <AutocompleteExample />
      <ErrorHandlingExample />
    </div>
  );
}
```

All examples use mock data so they run without extra dependencies.

---

## 1. Search Performance Patterns

### Debounce Hook (300ms)

**Files**
- `src/study-guide/hooks/useDebounce.js`
- `src/study-guide/components/DebounceHookExample.jsx`

**Props/Parameters**
- Hook:
  - `value` (string): raw input value
  - `delay` (number): debounce delay in ms (default 300)
- Component:
  - `delay` (number): overrides debounce delay

**Why**
- Prevents firing a request for every keystroke.
- Improves UX by waiting until the user pauses typing.

**Usage**
```jsx
const debouncedQuery = useDebounce(query, 300);
```

**Common pitfalls**
- Using debounce for every interaction (not always desirable).
- Forgetting to clear timeouts on unmount.

**Performance considerations**
- 250-400ms typically feels responsive for search.
- Avoid too-long delays on mobile where typing is slower.

---

### Throttle Hook

**Files**
- `src/study-guide/hooks/useThrottle.js`
- `src/study-guide/components/ThrottleHookExample.jsx`

**Props/Parameters**
- Hook:
  - `value` (string): raw input value
  - `delay` (number): throttle interval in ms (default 300)
- Component:
  - `delay` (number): overrides throttle interval

**Why**
- Allows periodic updates while typing, but caps frequency.
- Useful for analytics or non-critical search previews.

**Usage**
```jsx
const throttledQuery = useThrottle(query, 500);
```

**Common pitfalls**
- Throttling too aggressively can feel laggy.
- Forgetting to handle trailing updates after typing stops.

**Performance considerations**
- 400-800ms intervals are common for throttled calls.

---

### Search with Character Threshold (N chars or Enter)

**File**
- `src/study-guide/components/SearchThresholdExample.jsx`

**Props/Parameters**
- `minChars` (number): minimum characters to auto-trigger search

**Why**
- Reduces noise from short or accidental input.
- Allows power users to press Enter for immediate search.

**Usage**
```jsx
<SearchThresholdExample minChars={3} />
```

**Common pitfalls**
- Blocking Enter searches when the input is short.
- Not giving users feedback about the threshold.

**Performance considerations**
- Combine with debounce to avoid spikes on long pastes.

---

### Request Cancellation (AbortController)

**File**
- `src/study-guide/components/RequestCancellationExample.jsx`

**Props/Parameters**
- No props; uses internal `AbortController`

**Why**
- Prevents older requests from overwriting newer results.
- Saves bandwidth by cancelling in-flight calls.

**Usage**
```jsx
// New query -> abort previous request in useEffect cleanup.
```

**Common pitfalls**
- Treating abort errors as real failures.
- Forgetting to wire `signal` to `fetch` or your client.

**Performance considerations**
- Always abort on unmount to avoid stale updates.

---

## 2. State Management Patterns

### Local vs Lifted State

**File**
- `src/study-guide/components/LocalVsLiftedExample.jsx`

**Props/Parameters**
- No props; demonstrates both patterns in one component.

**Why**
- Keep state local when only one component needs it.
- Lift state when multiple siblings need the same query/results.

**Usage**
```jsx
<LocalVsLiftedExample />
```

**Common pitfalls**
- Lifting too early and over-complicating props.
- Keeping duplicated states that can go out of sync.

**Performance considerations**
- Lifted state can trigger more renders; use memoization.

---

### useReducer for Complex Search

**File**
- `src/study-guide/components/UseReducerSearchExample.jsx`

**Props/Parameters**
- No props; reducer handles term, filters, sort, and pagination.

**Why**
- Centralizes complex state transitions in one predictable place.
- Easier to test and debug than many `useState` calls.

**Usage**
```jsx
dispatch({ type: 'toggle_category', payload: 'Decor' });
```

**Common pitfalls**
- Allowing reducer actions to be too generic.
- Forgetting to reset pagination when filters change.

**Performance considerations**
- Keep derived data outside the reducer (useMemo).

---

### Derived State (no extra storage)

**File**
- `src/study-guide/components/DerivedStateExample.jsx`

**Props/Parameters**
- No props; derives results from inputs.

**Why**
- Avoids stale or duplicated data in state.
- Ensures derived values are always consistent.

**Usage**
```jsx
const visibleProducts = useMemo(() => filter(...), [query, sort]);
```

**Common pitfalls**
- Storing derived arrays in state and forgetting to update them.

**Performance considerations**
- Memoize derived data for large lists.

---

### URL State Sync (URLSearchParams)

**File**
- `src/study-guide/components/UrlStateSyncExample.jsx`

**Props/Parameters**
- No props; syncs `q`, `category`, and `sort` query params.

**Why**
- Search URLs are shareable and bookmarkable.
- Refreshing the page restores the same state.

**Usage**
```jsx
const params = new URLSearchParams(window.location.search);
```

**Common pitfalls**
- Updating history on every keystroke without debounce.
- Not handling back/forward navigation (`popstate`).

**Performance considerations**
- Prefer `replaceState` to keep the back button useful.

---

## 3. Search-Specific Features

### Autocomplete / Typeahead

**File**
- `src/study-guide/components/AutocompleteExample.jsx`

**Props/Parameters**
- No props; handles keyboard navigation and selection.

**Why**
- Helps users discover products faster.
- Reduces spelling errors by suggesting known items.

**Usage**
```jsx
<AutocompleteExample />
```

**Common pitfalls**
- Not handling arrow keys or Enter.
- Losing focus when clicking suggestions (use onMouseDown).

**Performance considerations**
- Debounce suggestions or prefetch popular items.

---

### Multi-Faceted Filters

**File**
- `src/study-guide/components/FacetedFiltersExample.jsx`

**Props/Parameters**
- No props; demonstrates categories, price range, and rating.

**Why**
- Lets users slice results quickly (category, price, rating).

**Usage**
```jsx
<FacetedFiltersExample />
```

**Common pitfalls**
- Failing to reset filters on new searches.
- Combining filters without showing active selections.

**Performance considerations**
- Cache filtered subsets if the dataset is large.

---

### Search Result Highlighting

**File**
- `src/study-guide/components/SearchHighlightExample.jsx`

**Props/Parameters**
- No props; uses `HighlightText` helper.

**Why**
- Helps users scan results faster.
- Improves confidence that results match intent.

**Usage**
```jsx
<HighlightText text="Reusable Water Bottle" query={query} />
```

**Common pitfalls**
- Forgetting to escape special characters in the query.
- Highlighting partial matches in unintended places.

**Performance considerations**
- Avoid regex work when query is empty.

---

### Empty States (loading, error, no results)

**File**
- `src/study-guide/components/EmptyStatesExample.jsx`

**Props/Parameters**
- No props; simulates different empty states.

**Why**
- Users need clarity when results are loading or empty.

**Usage**
```jsx
<EmptyStatesExample />
```

**Common pitfalls**
- Showing "no results" while still loading.
- Missing a retry option on errors.

**Performance considerations**
- Keep empty-state UI light to render quickly.

---

## 4. Performance Optimizations

### Memoization (useMemo)

**File**
- `src/study-guide/components/MemoizationExample.jsx`

**Props/Parameters**
- No props; shows expensive filtering.

**Why**
- Prevents costly recalculation on unrelated renders.

**Usage**
```jsx
const results = useMemo(() => slowFilter(items, query), [query]);
```

**Common pitfalls**
- Memoizing too much and making code harder to read.

**Performance considerations**
- Only memoize expensive operations.

---

### Result Caching

**File**
- `src/study-guide/components/ResultCachingExample.jsx`

**Props/Parameters**
- No props; caches results in a `Map`.

**Why**
- Saves repeated API calls for the same query.
- Improves perceived speed for returning users.

**Usage**
```jsx
if (cacheRef.current.has(term)) { ... }
```

**Common pitfalls**
- Forgetting cache eviction strategy for large datasets.

**Performance considerations**
- Use a small LRU cache in production to cap memory.

---

### Pagination (Load More)

**File**
- `src/study-guide/components/PaginationExample.jsx`

**Props/Parameters**
- No props; loads results in fixed-size pages.

**Why**
- Avoids rendering long lists at once.
- Works well with "load more" UX patterns.

**Usage**
```jsx
<PaginationExample />
```

**Common pitfalls**
- Not disabling "load more" while loading.
- Forgetting to stop when no more results remain.

**Performance considerations**
- Page size should balance latency and scroll length.

---

### Infinite Scroll

**File**
- `src/study-guide/components/InfiniteScrollExample.jsx`

**Props/Parameters**
- No props; uses `IntersectionObserver` with a sentinel.

**Why**
- Reduces friction for users who want to browse more.

**Usage**
```jsx
<InfiniteScrollExample />
```

**Common pitfalls**
- Triggering multiple loads while a request is in flight.
- Not handling the end-of-results state.

**Performance considerations**
- Pause loading when users reach the end.

---

### Virtualization (Windowing)

**File**
- `src/study-guide/components/VirtualizationExample.jsx`

**Props/Parameters**
- No props; demonstrates manual windowing.

**Why**
- Large result lists can be expensive to render.
- Only render visible rows to keep scrolling smooth.

**Usage**
```jsx
<VirtualizationExample />
```

**Common pitfalls**
- Incorrect row heights causing jumpy scroll.
- Forgetting overscan for smoother scrolling.

**Performance considerations**
- Prefer `react-window` for production lists.

---

## 5. Common Edge Cases & Error Handling

**File**
- `src/study-guide/components/ErrorHandlingExample.jsx`

**What it covers**
- Empty search input (shows a friendly prompt).
- Special characters (encoded for safe URLs).
- API failures with retry + exponential backoff.
- Race conditions (older responses ignored via request IDs).
- Loading states during async operations.

**Props/Parameters**
- No props; configurable constants at top of file:
  - `MAX_RETRIES`
  - `BASE_DELAY_MS`

**Common pitfalls**
- Retrying forever without a cap.
- Updating state from stale responses.

**Performance considerations**
- Backoff delay avoids hammering the backend.

---

## 6. Testing Patterns (Examples)

These examples assume `vitest` and `@testing-library/react`. They are not
installed in this project but show how to test the patterns.

### Test debounced input

```js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import DebounceHookExample from '../src/study-guide/components/DebounceHookExample';

test('debounces input before searching', async () => {
  vi.useFakeTimers();
  render(<DebounceHookExample delay={300} />);

  const input = screen.getByLabelText(/search products/i);
  await userEvent.type(input, 'shirt');
  expect(screen.queryByText(/cotton t-shirt/i)).toBeNull();

  vi.advanceTimersByTime(300);
  expect(await screen.findByText(/cotton t-shirt/i)).toBeInTheDocument();
});
```

### Test async search behavior

```js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RequestCancellationExample from '../src/study-guide/components/RequestCancellationExample';

test('cancels stale requests', async () => {
  render(<RequestCancellationExample />);
  const input = screen.getByLabelText(/search products/i);

  await userEvent.type(input, 'coffee');
  await userEvent.clear(input);
  await userEvent.type(input, 'mug');

  expect(await screen.findByText(/ceramic mug/i)).toBeInTheDocument();
});
```

### Test filter combinations

```js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FacetedFiltersExample from '../src/study-guide/components/FacetedFiltersExample';

test('applies category and rating filters together', async () => {
  render(<FacetedFiltersExample />);

  await userEvent.click(screen.getByLabelText(/electronics/i));
  await userEvent.selectOptions(screen.getByLabelText(/minimum rating/i), '4');

  expect(screen.getByText(/bluetooth speaker/i)).toBeInTheDocument();
  expect(screen.queryByText(/linen shirt/i)).toBeNull();
});
```

### Test keyboard interactions (Enter + arrows)

```js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AutocompleteExample from '../src/study-guide/components/AutocompleteExample';

test('selects suggestion with arrow keys and Enter', async () => {
  render(<AutocompleteExample />);

  const input = screen.getByLabelText(/search/i);
  await userEvent.type(input, 'wire');
  await userEvent.keyboard('{ArrowDown}{Enter}');

  expect(input).toHaveValue('Wireless Mouse');
});
```

---

## Notes

- Each component includes inline comments that explain **why** the pattern
  exists, not just what it does.
- All examples are safe to copy into production code as a starting point.
- Use `src/study-guide/index.js` to import examples quickly.
