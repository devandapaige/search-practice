/**
 * CHARACTERS REDUX SLICE
 * 
 * This file manages all state related to characters using Redux Toolkit.
 * 
 * WHAT IS A SLICE?
 * A "slice" is a collection of Redux reducer logic and actions for a single feature.
 * It's called a "slice" because it manages one "slice" of the overall Redux state.
 * 
 * REDUX TOOLKIT SLICE STRUCTURE:
 * 1. Initial State: What the state looks like when the app starts
 * 2. Reducers: Functions that update state (synchronous)
 * 3. Async Thunks: Functions that handle async operations (API calls)
 * 
 * SOLID PRINCIPLES APPLIED:
 * - Single Responsibility: This slice ONLY handles character state
 * - Open/Closed: Easy to extend with new actions without modifying existing ones
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCharacters, getCharacter } from '../../services/api';

/**
 * ASYNC THUNKS
 * 
 * Thunks are functions that return other functions. They allow us to:
 * - Make async API calls
 * - Dispatch multiple actions (pending, fulfilled, rejected)
 * - Handle loading and error states automatically
 * 
 * createAsyncThunk automatically generates three action types:
 * - fetchCharacters.pending: When the request starts
 * - fetchCharacters.fulfilled: When the request succeeds
 * - fetchCharacters.rejected: When the request fails
 */

/**
 * Fetch characters from API
 * 
 * @param {Object} filters - Filter parameters (name, status, species, etc.)
 * @returns {Promise} - Resolves with API response
 * 
 * USAGE in component:
 * dispatch(fetchCharacters({ status: 'alive', page: 1 }))
 */
export const fetchCharacters = createAsyncThunk(
  // Action type prefix (will generate: characters/fetchCharacters/pending, etc.)
  'characters/fetchCharacters',
  
  // Async function that performs the API call
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await getCharacters(filters);
      return response; // This becomes the payload of the fulfilled action
    } catch (error) {
      // If API call fails, reject with error message
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Fetch a single character by ID
 * 
 * @param {number} id - Character ID
 * @returns {Promise} - Resolves with character data
 */
export const fetchCharacter = createAsyncThunk(
  'characters/fetchCharacter',
  async (id, { rejectWithValue }) => {
    try {
      const character = await getCharacter(id);
      return character;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * INITIAL STATE
 * 
 * This defines what the state looks like when the app first loads.
 * Each slice manages its own initial state.
 */
const initialState = {
  // Array of character objects
  items: [],
  
  // Currently selected character (for detail view)
  selectedCharacter: null,
  
  // Pagination info from API
  pagination: {
    count: 0,    // Total number of characters
    pages: 0,    // Total number of pages
    next: null,  // URL to next page
    prev: null,  // URL to previous page
    currentPage: 1, // Current page number
  },
  
  // Current filter values
  filters: {
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
  },
  
  // Search query (separate from filters)
  // WHY SEPARATE?
  // - Search is for quick text-based lookup (updates as you type)
  // - Filters are for structured filtering (applied on submit)
  // - They can work together: search for "rick" + filter by "alive"
  searchQuery: '',
  
  // Loading states
  isLoading: false,      // True when fetching list
  isLoadingDetail: false, // True when fetching single character
  
  // Error states
  error: null,           // Error message for list fetch
  detailError: null,     // Error message for detail fetch
};

/**
 * CREATE SLICE
 * 
 * createSlice automatically generates:
 * - Action creators (functions to dispatch actions)
 * - Reducer function (handles state updates)
 * 
 * It uses Immer under the hood, so we can write "mutating" logic that's actually
 * immutable (Redux requires immutable updates).
 */
const charactersSlice = createSlice({
  // Slice name (used in action types)
  name: 'characters',
  
  // Initial state
  initialState,
  
  /**
   * REDUCERS (Synchronous state updates)
   * 
   * Reducers are pure functions that take current state and an action,
   * and return the new state. They should NOT have side effects.
   * 
   * In Redux Toolkit, we can write "mutating" code because Immer converts
   * it to immutable updates automatically.
   */
  reducers: {
    /**
     * Update filter values
     * 
     * @param {Object} state - Current state
     * @param {Object} action - Action with payload containing new filters
     * 
     * USAGE: dispatch(setFilters({ status: 'alive', name: 'rick' }))
     */
    setFilters: (state, action) => {
      // action.payload contains the data passed when dispatching
      state.filters = { ...state.filters, ...action.payload };
      // Reset to page 1 when filters change
      state.pagination.currentPage = 1;
    },
    
    /**
     * Clear all filters
     */
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.currentPage = 1;
    },
    
    /**
     * Set current page
     */
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    
    /**
     * Clear selected character (useful when navigating away from detail view)
     */
    clearSelectedCharacter: (state) => {
      state.selectedCharacter = null;
      state.detailError = null;
    },
    
    /**
     * Set search query
     * 
     * SEARCH VS FILTERS:
     * - Search: Updates in real-time as user types (debounced)
     * - Filters: Applied when user submits the form
     * - Both can be used together for powerful filtering
     * 
     * @param {Object} state - Current state
     * @param {Object} action - Action with payload containing search query string
     * 
     * USAGE: dispatch(setSearchQuery('rick'))
     */
    setSearchQuery: (state, action) => {
      // Update search query
      state.searchQuery = action.payload;
      // Reset to page 1 when search changes (new search = new results)
      state.pagination.currentPage = 1;
    },
    
    /**
     * Clear search query
     */
    clearSearchQuery: (state) => {
      state.searchQuery = '';
      state.pagination.currentPage = 1;
    },
  },
  
  /**
   * EXTRA REDUCERS
   * 
   * Handle actions from async thunks (fetchCharacters, fetchCharacter).
   * These are automatically called when thunks dispatch their actions.
   */
  extraReducers: (builder) => {
    builder
      // Handle fetchCharacters async thunk
      .addCase(fetchCharacters.pending, (state) => {
        // Request started - set loading to true, clear any previous errors
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        // Request succeeded - update state with data
        state.isLoading = false;
        state.items = action.payload.results; // Array of characters
        state.pagination = {
          ...action.payload.info, // Copy pagination info from API
          currentPage: state.pagination.currentPage, // Keep current page
        };
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        // Request failed - set error message
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch characters';
        // Clear items on error (optional - you might want to keep previous data)
        state.items = [];
      })
      
      // Handle fetchCharacter async thunk (for single character detail)
      .addCase(fetchCharacter.pending, (state) => {
        state.isLoadingDetail = true;
        state.detailError = null;
      })
      .addCase(fetchCharacter.fulfilled, (state, action) => {
        state.isLoadingDetail = false;
        state.selectedCharacter = action.payload;
      })
      .addCase(fetchCharacter.rejected, (state, action) => {
        state.isLoadingDetail = false;
        state.detailError = action.payload || 'Failed to fetch character';
      });
  },
});

/**
 * EXPORT ACTIONS
 * 
 * These are the functions components use to update state.
 * Redux Toolkit automatically generates these from the reducers.
 */
export const { 
  setFilters, 
  clearFilters, 
  setCurrentPage, 
  clearSelectedCharacter,
  setSearchQuery,
  clearSearchQuery,
} = charactersSlice.actions;

/**
 * EXPORT REDUCER
 * 
 * This is what gets added to the store configuration.
 */
export default charactersSlice.reducer;
