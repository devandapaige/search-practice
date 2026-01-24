/**
 * CHARACTER LIST COMPONENT
 * 
 * This is the main component that displays a list of characters.
 * 
 * REACT CONCEPTS:
 * - useEffect Hook: Fetches data when component mounts or dependencies change
 * - useSelector Hook: Reads data from Redux store
 * - useDispatch Hook: Dispatches actions to Redux store
 * - Conditional Rendering: Shows different UI based on loading/error states
 * 
 * REDUX PATTERNS:
 * - Container Component: This component connects to Redux (smart component)
 * - Presentational Components: CharacterCard, Loading, Error (dumb components)
 * - Async Actions: Uses fetchCharacters thunk for API calls
 * 
 * LIFECYCLE:
 * 1. Component mounts → useEffect runs → dispatch fetchCharacters
 * 2. Redux updates state → Component re-renders with new data
 * 3. User changes filters → dispatch setFilters → useEffect detects change → fetchCharacters
 * 4. User types in search → debounced update → Redux updates → useEffect detects change → fetchCharacters
 * 
 * SEARCH + FILTERS:
 * Search and filters work together:
 * - Search: Quick text lookup (updates as you type, debounced)
 * - Filters: Structured filtering (applied on submit)
 * - Combined: Search for "rick" + filter by status "alive" = alive Ricks
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, setCurrentPage } from '../store/slices/charactersSlice';
import CharacterCard from './ui/CharacterCard';
import Loading from './ui/Loading';
import Error from './ui/Error';
import Pagination from './ui/Pagination';
import './CharacterList.css';

/**
 * CharacterList component
 * 
 * @returns {JSX.Element} Character list UI
 */
function CharacterList() {
  // Get Redux hooks
  const dispatch = useDispatch();
  
  // Read state from Redux store
  // useSelector automatically re-renders component when these values change
  const {
    items: characters,        // Array of character objects
    isLoading,                // Loading state
    error,                    // Error message
    pagination,               // Pagination info
    filters,                  // Current filter values
    searchQuery,              // Current search query (from CharacterSearch component)
  } = useSelector((state) => state.characters);
  
  /**
   * Fetch characters when component mounts or filters/search/page change
   * 
   * useEffect is a hook that runs side effects (like API calls) after render.
   * 
   * Dependency array [filters, searchQuery, pagination.currentPage] means:
   * - Run on component mount
   * - Run whenever filters, searchQuery, or currentPage changes
   * 
   * HOW SEARCH + FILTERS WORK TOGETHER:
   * - If searchQuery exists, it's added to the name filter
   * - Other filters (status, species, etc.) are still applied
   * - Example: searchQuery="rick" + filters.status="alive" = alive Ricks
   * 
   * WHY COMBINE THEM?
   * - Search is for quick text lookup (user-friendly)
   * - Filters are for structured filtering (precise)
   * - Together they provide powerful filtering capabilities
   */
  useEffect(() => {
    // Build query parameters from filters, search, and pagination
    const queryParams = {
      ...filters,
      page: pagination.currentPage,
    };
    
    /**
     * COMBINE SEARCH WITH FILTERS
     * 
     * If user has entered a search query, use it as the name filter.
     * This allows search and filters to work together seamlessly.
     * 
     * PRIORITY:
     * - If searchQuery exists, it takes precedence over filters.name
     * - This makes sense: if user is actively searching, use that value
     * - If searchQuery is empty, use filters.name (from filter form)
     */
    if (searchQuery && searchQuery.trim().length > 0) {
      // Search is active - use search query as name filter
      queryParams.name = searchQuery.trim();
    }
    // If searchQuery is empty, filters.name will be used (or empty string)
    
    // Dispatch async thunk to fetch characters
    // This will automatically handle loading/error states in Redux
    dispatch(fetchCharacters(queryParams));
  }, [dispatch, filters, searchQuery, pagination.currentPage]);
  
  /**
   * Handle page change
   * 
   * @param {number} newPage - The page number to navigate to
   */
  const handlePageChange = (newPage) => {
    // Update current page in Redux
    // This will trigger the useEffect above to fetch new data
    dispatch(setCurrentPage(newPage));
    
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  /**
   * Handle character card click
   * 
   * @param {Object} character - The clicked character object
   */
  const handleCharacterClick = (character) => {
    // For now, just log the character
    // In a full app, you'd navigate to a detail page
    console.log('Character clicked:', character);
    alert(`You clicked on ${character.name}! (Detail view coming soon)`);
  };
  
  // Conditional rendering based on state
  // This is a common React pattern: show different UI based on app state
  
  if (isLoading && characters.length === 0) {
    // Show loading spinner on initial load
    return <Loading />;
  }
  
  if (error) {
    // Show error message with retry button
    return (
      <Error 
        message={error} 
        onRetry={() => {
          // Retry by dispatching fetchCharacters again
          // Include both filters and search query
          const queryParams = {
            ...filters,
            page: pagination.currentPage,
          };
          
          // Add search query if it exists
          if (searchQuery && searchQuery.trim().length > 0) {
            queryParams.name = searchQuery.trim();
          }
          
          dispatch(fetchCharacters(queryParams));
        }} 
      />
    );
  }
  
  if (characters.length === 0) {
    // Show message when no characters found
    // Provide helpful message based on whether search or filters are active
    const hasActiveSearch = searchQuery && searchQuery.trim().length > 0;
    const hasActiveFilters = Object.values(filters).some(value => value && value.trim().length > 0);
    
    let message = 'No characters found.';
    if (hasActiveSearch && hasActiveFilters) {
      message += ' Try adjusting your search or filters.';
    } else if (hasActiveSearch) {
      message += ' Try a different search term.';
    } else if (hasActiveFilters) {
      message += ' Try adjusting your filters.';
    } else {
      message += ' Start by searching or applying filters.';
    }
    
    return (
      <div className="no-results">
        <p>{message}</p>
      </div>
    );
  }
  
  // Render character list
  return (
    <div className="character-list-container">
      {/* 
        PAGINATION AT TOP
        Shows pagination controls at the top of results so users
        don't have to scroll to the bottom to change pages.
        Common pattern in e-commerce sites.
      */}
      {pagination.pages > 1 && (
        <div className="pagination-top">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.pages}
            hasNext={pagination.next !== null}
            hasPrev={pagination.prev !== null}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      
      {/* Character Grid */}
      <div className="character-list-grid">
        {characters.map((character) => (
          <CharacterCard
            key={character.id} // React requires unique keys for list items
            character={character}
            onClick={() => handleCharacterClick(character)}
          />
        ))}
      </div>
      
      {/* 
        PAGINATION AT BOTTOM
        Also shows pagination at the bottom for convenience.
        Users can navigate pages from either location.
      */}
      {pagination.pages > 1 && (
        <div className="pagination-bottom">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.pages}
            hasNext={pagination.next !== null}
            hasPrev={pagination.prev !== null}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      
      {/* Show loading overlay when fetching new page */}
      {isLoading && characters.length > 0 && (
        <div className="loading-overlay">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default CharacterList;
