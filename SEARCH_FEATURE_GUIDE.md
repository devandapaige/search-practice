# Search Feature Guide

## 🎯 Overview

This guide explains the **Search** feature that was added to complement the existing **Filter** functionality. Understanding how these two features work together is key to mastering this codebase.

## 🔍 Search vs Filters: What's the Difference?

### Search Component (`CharacterSearch.jsx`)
- **Purpose**: Quick text-based lookup
- **Behavior**: Updates in real-time as you type (with debouncing)
- **Use Case**: "I want to find characters with 'rick' in their name"
- **Updates**: Every 2+ characters, after 500ms of no typing

### Filter Component (`CharacterFilters.jsx`)
- **Purpose**: Structured filtering by specific criteria
- **Behavior**: Applied when user submits the form
- **Use Case**: "I want all alive Human characters"
- **Updates**: On form submission

### Working Together
- **Combined Use**: Search for "rick" + Filter by status "alive" = All alive Ricks
- **Priority**: Search query takes precedence over the name filter
- **Flexibility**: You can use search alone, filters alone, or both together

## 🏗️ Architecture

### Data Flow

```
User Types in Search
    ↓
CharacterSearch Component (local state updates immediately)
    ↓
Debounce Timer (500ms)
    ↓
User Stops Typing → Timer Fires
    ↓
Redux Action: setSearchQuery
    ↓
Redux Store Updated
    ↓
CharacterList Component Detects Change (useSelector)
    ↓
useEffect Triggers
    ↓
API Call with Search + Filters Combined
    ↓
Results Displayed
```

## 📚 Key Concepts Explained

### 1. Debouncing

**What is Debouncing?**
Debouncing is a technique that delays executing a function until after a certain amount of time has passed since the last time it was invoked.

**Why Do We Need It?**
Without debouncing, every keystroke would trigger an API call:
- User types "rick" → 4 API calls (r, ri, ric, rick)
- This is inefficient and can overwhelm the server
- With debouncing: Only 1 API call after user stops typing

**How It Works:**
```javascript
// User types "r" → Start 500ms timer
// User types "i" (before 500ms) → Cancel previous timer, start new 500ms timer
// User types "c" (before 500ms) → Cancel previous timer, start new 500ms timer
// User stops typing → After 500ms, timer fires → Update Redux
```

**Code Example:**
```javascript
useEffect(() => {
  // Clear previous timeout
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
  
  // Set new timeout
  timeoutRef.current = setTimeout(() => {
    // This runs after user stops typing for 500ms
    dispatch(setSearchQuery(localSearchValue));
  }, 500);
  
  // Cleanup: Clear timeout if component unmounts or value changes
  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
}, [localSearchValue]);
```

### 2. Minimum Character Threshold

**Why 2 Characters?**
- Single character searches return too many results (not useful)
- Reduces unnecessary API calls
- Better user experience (waits for meaningful input)

**Implementation:**
```javascript
const MIN_SEARCH_LENGTH = 2;

if (localSearchValue.trim().length < MIN_SEARCH_LENGTH) {
  // Don't search yet - wait for more characters
  return;
}
```

### 3. Local State vs Redux State

**Why Two States?**

1. **Local State (`localSearchValue`)**
   - Updates immediately on every keystroke
   - Provides instant visual feedback
   - Makes the input feel responsive

2. **Redux State (`searchQuery`)**
   - Updates after debounce delay
   - Triggers API calls
   - Shared across components

**The Pattern:**
```javascript
// Local state for UI responsiveness
const [localSearchValue, setLocalSearchValue] = useState('');

// Update local state immediately
const handleInputChange = (e) => {
  setLocalSearchValue(e.target.value); // Instant UI update
};

// Update Redux after debounce (triggers API)
useEffect(() => {
  // ... debounce logic ...
  dispatch(setSearchQuery(localSearchValue)); // Delayed API trigger
}, [localSearchValue]);
```

### 4. useRef Hook

**What is useRef?**
`useRef` returns a mutable ref object that persists across renders but doesn't trigger re-renders when updated.

**Why Use It for Timeouts?**
- Need to store timeout ID between renders
- Don't want to trigger re-render when updating
- Need to access it in cleanup function

**Example:**
```javascript
const timeoutRef = useRef(null);

// Store timeout ID
timeoutRef.current = setTimeout(() => {
  // ...
}, 500);

// Access in cleanup
return () => {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
};
```

### 5. Combining Search and Filters

**How They Work Together:**

In `CharacterList.jsx`, we combine search and filters:

```javascript
const queryParams = {
  ...filters,  // status, species, type, gender
  page: pagination.currentPage,
};

// If search is active, use it as name filter
if (searchQuery && searchQuery.trim().length > 0) {
  queryParams.name = searchQuery.trim();
}
```

**Priority:**
- If `searchQuery` exists → use it as `name` filter
- If `searchQuery` is empty → use `filters.name` (from filter form)
- Other filters (status, species, etc.) always apply

## 🎓 Learning Exercises

### Exercise 1: Understand Debouncing
1. Open `CharacterSearch.jsx`
2. Find the `useEffect` with debouncing logic
3. Add `console.log` statements to see when:
   - User types (local state updates)
   - Debounce timer starts
   - Redux updates (API call triggers)

### Exercise 2: Adjust Debounce Delay
1. Change `DEBOUNCE_DELAY` from 500ms to 1000ms
2. Notice how it feels slower
3. Change it to 200ms
4. Notice how it feels faster but makes more API calls

### Exercise 3: Change Minimum Characters
1. Change `MIN_SEARCH_LENGTH` from 2 to 3
2. Notice you need to type more before search activates
3. Change it to 1
4. Notice it searches immediately (but returns many results)

### Exercise 4: Test Search + Filters
1. Search for "rick"
2. Apply filter: status = "alive"
3. Notice how results show only alive Ricks
4. Clear search
5. Notice filters still apply

## 🐛 Common Issues and Solutions

### Issue: Search doesn't update immediately
**Cause**: You're looking at Redux state, not local state
**Solution**: Local state updates immediately for UI; Redux updates after debounce

### Issue: Too many API calls
**Cause**: Debounce not working properly
**Solution**: Check that cleanup function is clearing timeouts

### Issue: Search and filters conflict
**Cause**: Not understanding priority
**Solution**: Search takes precedence over name filter; other filters always apply

## 📖 Related Files

- `src/components/CharacterSearch.jsx` - Search component with debouncing
- `src/components/CharacterFilters.jsx` - Filter component
- `src/components/CharacterList.jsx` - Combines search and filters
- `src/store/slices/charactersSlice.js` - Redux state management

## 🎯 Key Takeaways

1. **Debouncing** prevents excessive API calls
2. **Local state** provides instant UI feedback
3. **Redux state** triggers API calls and shares data
4. **useRef** stores values without causing re-renders
5. **Search and filters** work together for powerful filtering

## 🚀 Next Steps

1. Read the code comments in `CharacterSearch.jsx`
2. Experiment with different debounce delays
3. Try combining search with different filters
4. Add a feature to save recent searches
5. Implement search history

---

**Happy Learning! 🎉**
