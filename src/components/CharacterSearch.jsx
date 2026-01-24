/**
 * CHARACTER SEARCH COMPONENT
 * 
 * This component provides real-time search functionality with intelligent triggering.
 * 
 * KEY CONCEPTS DEMONSTRATED:
 * 
 * 1. HYBRID SEARCH TRIGGERING
 *    - Triggers search every 2 NEW characters typed
 *    - OR immediately when user presses Enter
 *    - Still uses debouncing for the delay
 *    - Balances responsiveness with performance
 * 
 * 2. CHARACTER COUNT TRACKING
 *    - Tracks the last character count that triggered a search
 *    - Calculates difference to determine if 2 new characters added
 *    - Resets when search is cleared
 * 
 * 3. KEYBOARD EVENT HANDLING
 *    - Listens for Enter key press
 *    - Triggers immediate search (bypasses character count)
 *    - Provides user control over when to search
 * 
 * 4. DEBOUNCING WITH CONDITIONS
 *    - Still uses debouncing for the delay
 *    - But only triggers when conditions are met:
 *      - Every 2 new characters, OR
 *      - Enter key pressed
 *    - Prevents excessive API calls while staying responsive
 * 
 * 5. CONTROLLED INPUT
 *    - Input value is controlled by React state
 *    - Every change updates state immediately (for responsive UI)
 *    - Conditional updates to Redux (triggers API call)
 * 
 * REACT HOOKS USED:
 * - useState: Manages local input value and last triggered length
 * - useEffect: Handles debouncing and character count logic
 * - useRef: Stores timeout ID for cleanup
 * - useDispatch: Updates Redux store
 * - useSelector: Reads current search from Redux
 */

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, clearSearchQuery } from '../store/slices/charactersSlice';
import './CharacterSearch.css';

/**
 * CharacterSearch component
 * 
 * HOW IT WORKS (NEW PATTERN):
 * 1. User types in input → local state updates immediately
 * 2. useEffect checks character count → has 2 new characters been added?
 * 3. If yes → starts debounce timer (500ms delay)
 * 4. If no → waits for more characters
 * 5. User presses Enter → immediately triggers search (bypasses count)
 * 6. After debounce delay → update Redux
 * 7. Redux update → triggers API call in CharacterList
 * 
 * EXAMPLE FLOW:
 * - User types "r" (1 char) → no search (need 2 chars minimum)
 * - User types "ri" (2 chars) → search triggers (2 new chars)
 * - User types "ric" (3 chars) → no search (only 1 new char since last search)
 * - User types "rick" (4 chars) → search triggers (2 new chars since last search)
 * - User types "ricks" (5 chars) → no search (only 1 new char)
 * - User presses Enter → search triggers immediately (regardless of count)
 * 
 * @returns {JSX.Element} Search input UI
 */
function CharacterSearch() {
  // Get Redux hooks
  const dispatch = useDispatch();
  
  // Read current search query from Redux store
  const searchQuery = useSelector((state) => state.characters.searchQuery);
  
  // Local state for input value (updates immediately for responsive UI)
  // This is separate from Redux to allow instant visual feedback
  const [localSearchValue, setLocalSearchValue] = useState(searchQuery);
  
  /**
   * TRACK LAST TRIGGERED LENGTH
   * 
   * This state tracks the character count that last triggered a search.
   * We use this to calculate if 2 NEW characters have been added.
   * 
   * WHY TRACK THIS?
   * - Need to know when we've added 2 new characters since last search
   * - Example: If last search was at 4 chars, we need 6 chars for next search
   * - Resets when search is cleared
   * 
   * INITIAL VALUE: 0
   * - Means no search has been triggered yet
   * - First search will trigger at 2 characters
   */
  const [lastTriggeredLength, setLastTriggeredLength] = useState(0);
  
  // useRef to store the timeout ID
  // WHY useRef?
  // - Refs persist across renders but don't trigger re-renders
  // - Perfect for storing values we need to access in cleanup
  // - Unlike state, updating a ref doesn't cause re-render
  const debounceTimeoutRef = useRef(null);
  
  /**
   * MINIMUM CHARACTERS FOR SEARCH
   * 
   * We only search when user has typed at least 2 characters.
   * This prevents:
   * - Searching with single characters (too many results)
   * - Unnecessary API calls
   * - Poor user experience
   */
  const MIN_SEARCH_LENGTH = 2;
  
  /**
   * CHARACTERS PER SEARCH TRIGGER
   * 
   * How many NEW characters must be added before triggering a search.
   * 
   * WHY 2?
   * - Balances responsiveness with performance
   * - Not too frequent (every keystroke would be excessive)
   * - Not too infrequent (user wants to see results as they type)
   * - Good middle ground for most use cases
   */
  const CHARS_PER_TRIGGER = 2;
  
  /**
   * DEBOUNCE DELAY
   * 
   * How long to wait (in milliseconds) after condition is met
   * before updating Redux and triggering API call.
   * 
   * 500ms is a good balance:
   * - Fast enough to feel responsive
   * - Long enough to avoid excessive API calls
   * - Gives user time to continue typing
   * 
   * NOTE: This delay applies even when Enter is pressed,
   * but Enter bypasses the character count requirement.
   */
  const DEBOUNCE_DELAY = 500;
  
  /**
   * SYNC LOCAL STATE WITH REDUX
   * 
   * When Redux searchQuery changes (e.g., from clearing filters),
   * update local state to match.
   * 
   * This ensures the input field always reflects the actual search state.
   * 
   * Also resets lastTriggeredLength when search is cleared.
   */
  useEffect(() => {
    setLocalSearchValue(searchQuery);
    
    // If search is cleared, reset the last triggered length
    // This ensures next search starts fresh
    if (!searchQuery || searchQuery.trim() === '') {
      setLastTriggeredLength(0);
    }
  }, [searchQuery]);
  
  /**
   * TRIGGER SEARCH FUNCTION
   * 
   * This function actually triggers the search by updating Redux.
   * It's separated so it can be called from multiple places:
   * - Character count logic (every 2 new chars)
   * - Enter key handler (immediate)
   * 
   * @param {string} value - The search value to set
   */
  const triggerSearch = (value) => {
    const trimmedValue = value.trim();
    
    // Clear any existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    // Set timeout to update Redux after debounce delay
    // This gives user time to continue typing
    debounceTimeoutRef.current = setTimeout(() => {
      if (trimmedValue.length >= MIN_SEARCH_LENGTH) {
        // Update Redux store with the search query
        // This will trigger CharacterList to fetch new data
        dispatch(setSearchQuery(trimmedValue));
        
        // Update last triggered length
        // This tracks where we last triggered a search
        setLastTriggeredLength(trimmedValue.length);
      } else {
        // If value is too short, clear search
        dispatch(clearSearchQuery());
        setLastTriggeredLength(0);
      }
    }, DEBOUNCE_DELAY);
  };
  
  /**
   * CHARACTER COUNT AND DEBOUNCING LOGIC
   * 
   * This useEffect runs whenever localSearchValue changes.
   * 
   * NEW PATTERN: Every 2 New Characters OR Enter Key
   * 
   * HOW IT WORKS:
   * 1. Calculate current length and difference from last triggered length
   * 2. Check if 2 new characters have been added since last search
   * 3. If yes → trigger search (with debounce delay)
   * 4. If no → wait for more characters
   * 
   * EXAMPLE:
   * - Start: lastTriggeredLength = 0, user types "r" (1 char) → no search
   * - User types "ri" (2 chars) → 2 new chars → search triggers
   * - lastTriggeredLength = 2, user types "ric" (3 chars) → 1 new char → no search
   * - User types "rick" (4 chars) → 2 new chars → search triggers
   * - lastTriggeredLength = 4, user types "ricks" (5 chars) → 1 new char → no search
   * - User types "ricksa" (6 chars) → 2 new chars → search triggers
   * 
   * CLEANUP FUNCTION:
   * - Runs before next effect or when component unmounts
   * - Clears the timeout to prevent memory leaks
   */
  useEffect(() => {
    const trimmedValue = localSearchValue.trim();
    const currentLength = trimmedValue.length;
    
    // If search is empty, clear Redux immediately (no debounce needed)
    if (currentLength === 0) {
      // Clear any pending timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      dispatch(clearSearchQuery());
      setLastTriggeredLength(0);
      return;
    }
    
    // If search is less than minimum length, don't search yet
    if (currentLength < MIN_SEARCH_LENGTH) {
      // Don't update Redux yet - wait for more characters
      return;
    }
    
    /**
     * CALCULATE NEW CHARACTERS ADDED
     * 
     * How many characters have been added since the last search was triggered?
     * 
     * Example:
     * - lastTriggeredLength = 4 (last search was at "rick")
     * - currentLength = 6 (user typed "ricksa")
     * - newChars = 6 - 4 = 2 → trigger search!
     */
    const newChars = currentLength - lastTriggeredLength;
    
    /**
     * CHECK IF WE SHOULD TRIGGER SEARCH
     * 
     * Conditions:
     * 1. At least 2 new characters have been added since last search
     *    OR
     * 2. This is the first search (lastTriggeredLength === 0 and we have 2+ chars)
     * 
     * WHY THIS PATTERN?
     * - Prevents searching on every keystroke
     * - Still feels responsive (searches every 2 chars)
     * - Reduces API calls while maintaining good UX
     */
    const shouldTrigger = 
      newChars >= CHARS_PER_TRIGGER || 
      (lastTriggeredLength === 0 && currentLength >= MIN_SEARCH_LENGTH);
    
    if (shouldTrigger) {
      // Trigger search with debounce delay
      triggerSearch(trimmedValue);
    }
    
    // CLEANUP FUNCTION
    // This runs:
    // - Before the effect runs again (if localSearchValue changes)
    // - When component unmounts
    // 
    // WHY IT'S IMPORTANT:
    // - Prevents memory leaks (clears timeout)
    // - Prevents updating Redux with stale values
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [localSearchValue, lastTriggeredLength, dispatch]); // Dependencies
  
  /**
   * Handle input change
   * 
   * This updates local state immediately (for instant UI feedback).
   * The useEffect above handles checking character count and updating Redux.
   * 
   * @param {Event} e - Change event from input
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Update local state immediately
    // This makes the input feel responsive (no delay)
    setLocalSearchValue(value);
    
    // Note: The useEffect will check if 2 new characters have been added
    // and trigger search accordingly
  };
  
  /**
   * Handle Enter key press
   * 
   * When user presses Enter, trigger search immediately.
   * This bypasses the character count requirement and gives user control.
   * 
   * KEYBOARD EVENT HANDLING:
   * - onKeyDown: Fires when key is pressed down
   * - e.key === 'Enter': Check if Enter key was pressed
   * - e.preventDefault(): Prevent form submission (if in a form)
   * 
   * WHY IMMEDIATE SEARCH ON ENTER?
   * - User explicitly wants to search NOW
   * - Provides user control over when to search
   * - Common UX pattern users expect
   * - Still uses debounce delay, but bypasses character count
   * 
   * @param {KeyboardEvent} e - Keyboard event from input
   */
  const handleKeyDown = (e) => {
    // Check if Enter key was pressed
    if (e.key === 'Enter') {
      // Prevent default behavior (form submission, etc.)
      e.preventDefault();
      
      const trimmedValue = localSearchValue.trim();
      
      // Only trigger if we have minimum characters
      if (trimmedValue.length >= MIN_SEARCH_LENGTH) {
        // Trigger search immediately (bypasses character count)
        // Still uses debounce delay, but user explicitly requested search
        triggerSearch(trimmedValue);
        
        // Update last triggered length to current length
        // This prevents immediate re-trigger from character count logic
        setLastTriggeredLength(trimmedValue.length);
      }
    }
  };
  
  /**
   * Handle clear button click
   */
  const handleClear = () => {
    // Clear local state
    setLocalSearchValue('');
    
    // Clear Redux immediately (no debounce needed for clearing)
    dispatch(clearSearchQuery());
    
    // Reset last triggered length
    setLastTriggeredLength(0);
    
    // Clear any pending timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  };
  
  return (
    <div className="character-search">
      <div className="search-header">
        <h2 className="search-title">Search Characters</h2>
        <p className="search-description">
          Type at least {MIN_SEARCH_LENGTH} characters to search. Results update every {CHARS_PER_TRIGGER} new characters or press Enter.
        </p>
      </div>
      
      <div className="search-input-container">
        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name (e.g., Rick, Morty)..."
            value={localSearchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            aria-label="Search characters by name. Press Enter to search immediately."
          />
          {localSearchValue && (
            <button
              type="button"
              className="search-clear-button"
              onClick={handleClear}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        
        {/* Show helpful message when typing */}
        {localSearchValue.trim().length > 0 && 
         localSearchValue.trim().length < MIN_SEARCH_LENGTH && (
          <p className="search-hint">
            Type {MIN_SEARCH_LENGTH - localSearchValue.trim().length} more character
            {MIN_SEARCH_LENGTH - localSearchValue.trim().length > 1 ? 's' : ''} to search...
          </p>
        )}
        
        {/* Show active search indicator */}
        {searchQuery && (
          <p className="search-active">
            Searching for: <strong>"{searchQuery}"</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default CharacterSearch;
