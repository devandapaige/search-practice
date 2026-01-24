/**
 * CHARACTER FILTERS COMPONENT
 * 
 * This component allows users to filter characters by various criteria.
 * 
 * REACT CONCEPTS:
 * - useState Hook: Manages local form state AND UI state (collapsed/expanded)
 * - useEffect Hook: Syncs local state with Redux when filters change
 * - Controlled Inputs: Form inputs controlled by React state
 * - Event Handlers: onChange handlers update state
 * - Conditional Rendering: Show/hide content based on state
 * 
 * REDUX INTEGRATION:
 * - useSelector: Reads current filters from Redux store
 * - useDispatch: Gets dispatch function to update Redux store
 * - Actions: Dispatches setFilters action to update global state
 * 
 * STATE MANAGEMENT PATTERNS DEMONSTRATED:
 * 
 * 1. LOCAL UI STATE (isExpanded)
 *    - Purpose: Controls whether filter form is visible
 *    - Scope: Only affects this component's UI
 *    - Why Local: No other component needs to know if filters are expanded
 *    - Lifecycle: Resets when component unmounts
 * 
 * 2. LOCAL FORM STATE (localFilters)
 *    - Purpose: Holds form input values before submission
 *    - Scope: Only affects this component's form
 *    - Why Local: User might change inputs without submitting
 *    - Lifecycle: Synced with Redux, but can differ temporarily
 * 
 * 3. GLOBAL STATE (Redux filters)
 *    - Purpose: Stores applied filters that affect API calls
 *    - Scope: Shared across entire application
 *    - Why Global: CharacterList needs filters to fetch data
 *    - Lifecycle: Persists until explicitly changed
 * 
 * WHEN TO USE LOCAL VS GLOBAL STATE:
 * - Local State: UI-only concerns (collapsed/expanded, form drafts, temporary values)
 * - Global State: Data that multiple components need (filters, search, results)
 */

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/slices/charactersSlice';
import './CharacterFilters.css';

/**
 * CharacterFilters component
 * 
 * @returns {JSX.Element} Filter form UI
 */
function CharacterFilters() {
  // Get Redux hooks
  const dispatch = useDispatch();
  
  // Read current filters from Redux store
  // useSelector is a hook that subscribes to Redux store updates
  const currentFilters = useSelector((state) => state.characters.filters);
  
  /**
   * LOCAL UI STATE: isExpanded
   * 
   * This state controls whether the filter form is visible or collapsed.
   * 
   * WHY LOCAL STATE?
   * - Only this component needs to know if it's expanded
   * - No other component needs this information
   * - It's a UI-only concern, not business logic
   * - Resets when component unmounts (user navigates away)
   * 
   * DEFAULT VALUE: false (collapsed by default)
   * - Better UX: Less visual clutter initially
   * - Users can expand when they need filters
   * 
   * STATE LIFECYCLE:
   * - Component mounts → isExpanded = false (collapsed)
   * - User clicks expand → isExpanded = true (expanded)
   * - User clicks collapse → isExpanded = false (collapsed)
   * - Component unmounts → state is lost (expected behavior)
   * 
   * RE-RENDERS:
   * - When isExpanded changes, component re-renders
   * - React updates the DOM to show/hide filter form
   * - CSS transitions handle smooth animations
   */
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Local state for form inputs (we'll sync this with Redux)
  // useState returns [value, setterFunction]
  const [localFilters, setLocalFilters] = useState(currentFilters);
  
  /**
   * Sync local state with Redux when Redux filters change
   * 
   * useEffect runs after every render. The dependency array [currentFilters]
   * means it only runs when currentFilters changes.
   */
  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);
  
  /**
   * Handle input change
   * 
   * @param {Event} e - Change event from input
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update local state immediately (for responsive UI)
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  /**
   * Handle form submission
   * 
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    
    // Dispatch action to update Redux store
    // This will trigger a re-render and API call
    dispatch(setFilters(localFilters));
  };
  
  /**
   * Handle clear filters button
   */
  const handleClear = () => {
    // Reset local state
    setLocalFilters({
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
    });
    
    // Clear filters in Redux (this will trigger API call with no filters)
    dispatch(setFilters({
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
    }));
  };
  
  /**
   * TOGGLE FUNCTION: handleToggleExpand
   * 
   * This function toggles the isExpanded state between true and false.
   * 
   * HOW IT WORKS:
   * - When called, it updates isExpanded to the opposite of its current value
   * - React detects the state change and re-renders the component
   * - The conditional rendering shows/hides the filter form
   * 
   * FUNCTIONAL UPDATE PATTERN:
   * We use a function: (prev) => !prev
   * - This ensures we always use the latest state value
   * - Prevents issues with stale closures
   * - Best practice when new state depends on previous state
   * 
   * ALTERNATIVE (less recommended):
   * setIsExpanded(!isExpanded)
   * - Works, but can have issues if state updates are batched
   * - Function form is more reliable
   * 
   * @example
   * // Current state: isExpanded = false
   * handleToggleExpand() // → isExpanded = true
   * handleToggleExpand() // → isExpanded = false
   */
  const handleToggleExpand = () => {
    // Functional update: use previous value to calculate new value
    setIsExpanded((prev) => !prev);
    
    // WHAT HAPPENS NEXT:
    // 1. State updates (isExpanded changes)
    // 2. React schedules a re-render
    // 3. Component function runs again with new state
    // 4. Conditional rendering evaluates with new isExpanded value
    // 5. DOM updates (filter form shows/hides)
    // 6. CSS transitions animate the change
  };
  
  /**
   * CHECK IF FILTERS ARE ACTIVE
   * 
   * This helper determines if any filters are currently applied.
   * We use this to:
   * - Show a visual indicator when filters are active
   * - Auto-expand if filters are active (better UX)
   * 
   * WHY CHECK REDUX STATE, NOT LOCAL STATE?
   * - Redux state = filters that are actually applied
   * - Local state = filters user is typing (might not be applied yet)
   * - We want to show if filters are ACTIVE, not if user is typing
   */
  const hasActiveFilters = Object.values(currentFilters).some(
    (value) => value && value.toString().trim().length > 0
  );
  
  /**
   * AUTO-EXPAND WHEN FILTERS ARE ACTIVE
   * 
   * If filters become active (e.g., from another component or page load),
   * automatically expand the filter section so users can see what's applied.
   * 
   * WHY?
   * - Better UX: Users can see active filters
   * - Transparency: Users know why results are filtered
   * - Discoverability: Users can modify filters easily
   * 
   * useEffect DEPENDENCY:
   * - Runs when hasActiveFilters changes
   * - Only expands (doesn't collapse) - respects user's choice to collapse
   */
  useEffect(() => {
    // If filters become active and section is collapsed, expand it
    if (hasActiveFilters && !isExpanded) {
      setIsExpanded(true);
    }
    // Note: We don't auto-collapse when filters are cleared
    // This respects user's choice to keep section open
  }, [hasActiveFilters]); // Only run when active filters change
  
  return (
    <div className="character-filters-container">
      {/* 
        HEADER SECTION (Always Visible)
        
        This section is always shown, even when filters are collapsed.
        It provides:
        - Title and context
        - Toggle button to expand/collapse
        - Visual indicator if filters are active
      */}
      <div className="filters-header">
        <div className="filters-header-content">
          <h2 className="filters-title">Filter Characters</h2>
          
          {/* 
            ACTIVE FILTERS INDICATOR
            
            Shows a badge when filters are active.
            This provides visual feedback that filters are applied.
            
            CONDITIONAL RENDERING:
            - Only shows when hasActiveFilters is true
            - Uses && operator for conditional rendering
            - If false, nothing is rendered (null)
          */}
          {hasActiveFilters && (
            <span className="filters-active-badge" aria-label="Filters are active">
              Active
            </span>
          )}
        </div>
        
        {/* 
          TOGGLE BUTTON
          
          This button controls the expanded/collapsed state.
          
          ARIA ATTRIBUTES:
          - aria-expanded: Tells screen readers if section is expanded
          - aria-controls: Links button to the content it controls
          - aria-label: Descriptive label for screen readers
          
          CONDITIONAL CLASS:
          - Adds "expanded" class when isExpanded is true
          - Used for CSS styling (rotate icon, etc.)
        */}
        <button
          type="button"
          className={`filters-toggle-button ${isExpanded ? 'expanded' : ''}`}
          onClick={handleToggleExpand}
          aria-expanded={isExpanded}
          aria-controls="filters-content"
          aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
        >
          <span className="filters-toggle-icon" aria-hidden="true">
            {isExpanded ? '▼' : '▶'}
          </span>
          <span className="filters-toggle-text">
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
          </span>
        </button>
      </div>
      
      {/* 
        FILTER FORM (Conditionally Rendered)
        
        CONDITIONAL RENDERING PATTERN:
        - {condition && <Component />}
        - If condition is true, render Component
        - If condition is false, render nothing (null)
        
        WHY CONDITIONAL RENDERING?
        - Completely removes from DOM when collapsed (better performance)
        - Prevents form inputs from being focusable when hidden
        - Cleaner DOM structure
        
        ALTERNATIVE APPROACH (CSS-only):
        - Always render, but use CSS to hide (display: none)
        - Pros: Smoother animations possible
        - Cons: Elements still in DOM, can be focused with keyboard
        - We use conditional rendering for better accessibility
      */}
      {isExpanded && (
        <form 
          id="filters-content"
          className="character-filters" 
          onSubmit={handleSubmit}
          aria-hidden={!isExpanded}
        >
          <div className="filters-grid">
        <div className="filter-group">
          <label htmlFor="filter-name" className="filter-label">
            Name
          </label>
          <input
            id="filter-name"
            type="text"
            name="name"
            value={localFilters.name}
            onChange={handleInputChange}
            placeholder="Search by name..."
            className="filter-input"
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="filter-status" className="filter-label">
            Status
          </label>
          <select
            id="filter-status"
            name="status"
            value={localFilters.status}
            onChange={handleInputChange}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="filter-species" className="filter-label">
            Species
          </label>
          <input
            id="filter-species"
            type="text"
            name="species"
            value={localFilters.species}
            onChange={handleInputChange}
            placeholder="e.g., Human, Alien"
            className="filter-input"
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="filter-type" className="filter-label">
            Type
          </label>
          <input
            id="filter-type"
            type="text"
            name="type"
            value={localFilters.type}
            onChange={handleInputChange}
            placeholder="Subspecies or type"
            className="filter-input"
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="filter-gender" className="filter-label">
            Gender
          </label>
          <select
            id="filter-gender"
            name="gender"
            value={localFilters.gender}
            onChange={handleInputChange}
            className="filter-select"
          >
            <option value="">All Genders</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>
      
          <div className="filters-actions">
            <button type="submit" className="filter-button filter-button-primary">
              Apply Filters
            </button>
            <button 
              type="button" 
              onClick={handleClear}
              className="filter-button filter-button-secondary"
            >
              Clear All
            </button>
          </div>
        </form>
      )}
      
      {/* 
        STATE MANAGEMENT SUMMARY (for learning):
        
        This component demonstrates THREE types of state:
        
        1. isExpanded (Local UI State)
           - Type: boolean
           - Purpose: Control visibility
           - Scope: Component-only
           - Updates: User clicks toggle button
           - Lifecycle: Resets on unmount
        
        2. localFilters (Local Form State)
           - Type: object
           - Purpose: Hold form input values
           - Scope: Component-only
           - Updates: User types in inputs
           - Lifecycle: Synced with Redux
        
        3. currentFilters (Global Redux State)
           - Type: object
           - Purpose: Applied filters that affect API
           - Scope: Application-wide
           - Updates: Form submission or external actions
           - Lifecycle: Persists until changed
        
        KEY TAKEAWAY:
        Not all state needs to be in Redux!
        - UI-only state → Local state (isExpanded)
        - Temporary values → Local state (localFilters)
        - Shared data → Redux state (currentFilters)
      */}
    </div>
  );
}

export default CharacterFilters;
