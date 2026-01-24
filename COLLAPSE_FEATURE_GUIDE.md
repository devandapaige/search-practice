# Collapse/Expand Feature Guide

## 🎯 Overview

This guide explains the **collapsible filter section** feature, focusing on **state management patterns** and when to use **local state** vs **global state** in React applications.

## 📚 Key Learning Objectives

After reading this guide, you'll understand:
1. **Local State vs Global State**: When to use each
2. **State Management Patterns**: UI state, form state, and application state
3. **Conditional Rendering**: Showing/hiding content based on state
4. **State Lifecycle**: How state is created, updated, and destroyed
5. **React Re-renders**: How state changes trigger UI updates

## 🏗️ Architecture: Three Types of State

The `CharacterFilters` component demonstrates **three distinct types of state**, each serving a different purpose:

### 1. Local UI State: `isExpanded`

```javascript
const [isExpanded, setIsExpanded] = useState(false);
```

**Purpose**: Controls whether the filter form is visible or collapsed

**Characteristics**:
- **Scope**: Component-only (no other component needs this)
- **Type**: Boolean (true/false)
- **Default**: `false` (collapsed by default)
- **Lifecycle**: Created on mount, destroyed on unmount
- **Updates**: User clicks toggle button

**Why Local State?**
- ✅ Only affects this component's UI
- ✅ No other component needs to know if filters are expanded
- ✅ Resets naturally when component unmounts
- ✅ Simple boolean - doesn't need complex management

**What Happens When State Changes?**
```
User clicks toggle
    ↓
setIsExpanded(true) called
    ↓
React detects state change
    ↓
Component re-renders
    ↓
Conditional rendering evaluates: {isExpanded && <Form />}
    ↓
Form appears in DOM
    ↓
CSS transitions animate the change
```

### 2. Local Form State: `localFilters`

```javascript
const [localFilters, setLocalFilters] = useState(currentFilters);
```

**Purpose**: Holds form input values before submission

**Characteristics**:
- **Scope**: Component-only (form inputs)
- **Type**: Object with filter values
- **Default**: Synced with Redux filters
- **Lifecycle**: Synced with Redux, but can differ temporarily
- **Updates**: User types in inputs

**Why Local State?**
- ✅ User might change inputs without submitting
- ✅ Allows "draft" state (unsaved changes)
- ✅ Provides instant UI feedback
- ✅ Only affects this form, not the whole app

**State Flow**:
```
User types in input
    ↓
localFilters updates immediately
    ↓
Input shows new value (instant feedback)
    ↓
User clicks "Apply Filters"
    ↓
Redux state updates (filters applied)
    ↓
API call triggered with new filters
```

### 3. Global Redux State: `currentFilters`

```javascript
const currentFilters = useSelector((state) => state.characters.filters);
```

**Purpose**: Stores applied filters that affect API calls

**Characteristics**:
- **Scope**: Application-wide (shared across components)
- **Type**: Object with filter values
- **Default**: Empty filters object
- **Lifecycle**: Persists until explicitly changed
- **Updates**: Form submission or external actions

**Why Global State?**
- ✅ Multiple components need this data (CharacterList, CharacterFilters)
- ✅ Needs to persist across component unmounts
- ✅ Single source of truth for applied filters
- ✅ Triggers side effects (API calls)

## 🔄 State Management Flow

### Complete State Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERACTION                      │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │  1. User clicks toggle button    │
        └─────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │  setIsExpanded(!isExpanded)     │
        │  (Local UI State Updates)       │
        └─────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │   React detects state change    │
        │   Component re-renders           │
        └─────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │  Conditional rendering:         │
        │  {isExpanded && <Form />}      │
        └─────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │   Form appears/disappears       │
        │   CSS transitions animate        │
        └─────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │   User types in filter inputs   │
        └─────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │  setLocalFilters(newValue)      │
        │  (Local Form State Updates)     │
        └─────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │   Input shows new value         │
        │   (Instant UI feedback)         │
        └─────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │   User clicks "Apply Filters"    │
        └─────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │  dispatch(setFilters(local))    │
        │  (Global Redux State Updates)  │
        └─────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │   CharacterList detects change   │
        │   API call triggered             │
        └─────────────────────────────────┘
```

## 💡 Key Concepts Explained

### 1. Conditional Rendering

**What is it?**
Showing or hiding content based on a condition.

**Pattern Used**:
```javascript
{isExpanded && <form>...</form>}
```

**How it works**:
- If `isExpanded` is `true` → form is rendered
- If `isExpanded` is `false` → nothing is rendered (null)

**Why this pattern?**
- ✅ Completely removes from DOM when hidden
- ✅ Better performance (no hidden elements)
- ✅ Better accessibility (can't focus hidden elements)
- ✅ Cleaner DOM structure

**Alternative (CSS-only)**:
```javascript
// Always render, hide with CSS
<form style={{ display: isExpanded ? 'block' : 'none' }}>
```
- ❌ Elements still in DOM
- ❌ Can be focused with keyboard
- ✅ Smoother animations possible

### 2. Functional State Updates

**Pattern Used**:
```javascript
setIsExpanded((prev) => !prev);
```

**Why use a function?**
- ✅ Always uses latest state value
- ✅ Prevents stale closure issues
- ✅ Works correctly with batched updates
- ✅ Best practice when new state depends on previous state

**Alternative (direct update)**:
```javascript
setIsExpanded(!isExpanded);
```
- ⚠️ Can have issues with batched updates
- ⚠️ Might use stale value in some cases
- ✅ Simpler syntax

### 3. Auto-Expand on Active Filters

**Feature**: Filters section automatically expands when filters become active.

**Implementation**:
```javascript
useEffect(() => {
  if (hasActiveFilters && !isExpanded) {
    setIsExpanded(true);
  }
}, [hasActiveFilters]);
```

**Why this is useful**:
- ✅ Users can see what filters are applied
- ✅ Transparency: know why results are filtered
- ✅ Discoverability: easy to modify filters

**Why only expand, not collapse?**
- Respects user's choice to keep section open
- User might want to see filters even when cleared
- Better UX: don't hide information user might want

### 4. State Lifecycle

**Component Mount**:
```
Component created
    ↓
useState hooks initialize
    ↓
isExpanded = false (default)
localFilters = currentFilters (from Redux)
    ↓
Component renders (collapsed)
```

**User Interaction**:
```
User clicks toggle
    ↓
setIsExpanded(true)
    ↓
Component re-renders
    ↓
Form appears
```

**Component Unmount**:
```
Component removed from DOM
    ↓
All local state is lost
    ↓
isExpanded, localFilters destroyed
    ↓
(Redux state persists)
```

## 🎓 Decision Tree: Local vs Global State

Use this decision tree to decide where to put state:

```
Is this state needed by multiple components?
│
├─ YES → Use Redux (Global State)
│   │
│   └─ Examples:
│       - Applied filters
│       - Search query
│       - Character list
│       - Current page
│
└─ NO → Is this state needed after component unmounts?
    │
    ├─ YES → Use Redux (Global State)
    │   │
    │   └─ Examples:
    │       - User preferences
    │       - Saved filters
    │       - Application settings
    │
    └─ NO → Use Local State (useState)
        │
        └─ Examples:
            - isExpanded (UI state)
            - localFilters (form draft)
            - Modal open/closed
            - Dropdown expanded/collapsed
```

## 🧪 Learning Exercises

### Exercise 1: Understand State Updates
1. Add `console.log` in the component:
   ```javascript
   console.log('isExpanded:', isExpanded);
   ```
2. Click the toggle button
3. Observe when the log appears
4. Notice component re-renders on state change

### Exercise 2: Test Auto-Expand
1. Start with filters collapsed
2. Apply a filter (e.g., status = "alive")
3. Notice filters section auto-expands
4. Clear filters
5. Notice section stays expanded (respects user choice)

### Exercise 3: Compare State Types
1. Add logs for all three states:
   ```javascript
   console.log('isExpanded (local UI):', isExpanded);
   console.log('localFilters (local form):', localFilters);
   console.log('currentFilters (global):', currentFilters);
   ```
2. Type in a filter input (don't submit)
3. Notice `localFilters` changes, but `currentFilters` doesn't
4. Submit the form
5. Notice `currentFilters` updates

### Exercise 4: Conditional Rendering
1. Change the condition:
   ```javascript
   {isExpanded ? <Form /> : <p>Filters are hidden</p>}
   ```
2. Notice ternary operator pattern
3. Compare with `&&` pattern
4. Understand when to use each

## 🐛 Common Issues and Solutions

### Issue: State doesn't update
**Cause**: Not using setter function correctly
**Solution**: Always use the setter: `setIsExpanded(true)`, not `isExpanded = true`

### Issue: Component doesn't re-render
**Cause**: Mutating state directly
**Solution**: Always use setter functions, never mutate state directly

### Issue: State resets unexpectedly
**Cause**: Component unmounting/remounting
**Solution**: This is expected for local state. Use Redux if you need persistence.

### Issue: Stale state in callbacks
**Cause**: Closure capturing old state value
**Solution**: Use functional updates: `setState((prev) => !prev)`

## 📖 Related Files

- `src/components/CharacterFilters.jsx` - Main component with collapse logic
- `src/components/CharacterFilters.css` - Styling for collapse/expand
- `src/store/slices/charactersSlice.js` - Redux state management

## 🎯 Key Takeaways

1. **Not all state needs Redux** - UI-only state should be local
2. **State type determines location** - UI state → local, shared data → Redux
3. **Conditional rendering** - Use `&&` or ternary for show/hide
4. **Functional updates** - Use when new state depends on previous
5. **State lifecycle** - Understand when state is created/destroyed
6. **Auto-expand** - Better UX when filters are active

## 🚀 Next Steps

1. Read the code comments in `CharacterFilters.jsx`
2. Experiment with different state management patterns
3. Try adding collapse to other components
4. Implement state persistence (localStorage)
5. Add animations for smoother transitions

---

**Happy Learning! 🎉**
