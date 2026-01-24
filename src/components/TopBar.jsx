/**
 * TOP BAR COMPONENT
 * 
 * E-commerce style top bar with:
 * - Quick filter buttons (pre-created filters)
 * - Search bar
 * - Item count
 * 
 * This component provides quick access to common filters and search,
 * similar to e-commerce sites like Crate & Barrel.
 * 
 * REACT CONCEPTS:
 * - Component composition
 * - Event handlers
 * - Conditional rendering
 * - Redux integration
 */

import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '../store/slices/charactersSlice';
import CharacterSearch from './CharacterSearch';
import './TopBar.css';

/**
 * QUICK FILTERS
 * 
 * Pre-defined filter combinations for common searches.
 * These are shortcuts that users can click to quickly filter characters.
 * 
 * Each filter object contains:
 * - label: Display text on button
 * - filters: Filter values to apply when clicked
 */
const QUICK_FILTERS = [
  {
    label: 'View All',
    filters: {}, // Empty = show all
  },
  {
    label: 'Dead Aliens',
    filters: { status: 'dead', species: 'Alien' },
  },
  {
    label: 'Mythologs',
    filters: { species: 'Mytholog' },
  },
  {
    label: 'Ricks',
    filters: { name: 'rick' },
  },
  {
    label: 'Summers',
    filters: { name: 'summer' },
  },
  {
    label: 'Mortys',
    filters: { name: 'morty' },
  },
  {
    label: 'Alive Humans',
    filters: { status: 'alive', species: 'Human' },
  },
];

/**
 * TopBar component
 * 
 * @returns {JSX.Element} Top bar UI with quick filters, search, and count
 */
function TopBar() {
  const dispatch = useDispatch();
  
  // Read state from Redux
  const {
    items: characters,
    pagination,
    isLoading,
  } = useSelector((state) => state.characters);
  
  /**
   * Handle quick filter click
   * 
   * When a quick filter button is clicked, apply those filters immediately.
   * 
   * @param {Object} filters - Filter values to apply
   */
  const handleQuickFilter = (filters) => {
    // Clear existing filters first
    dispatch(clearFilters());
    
    // Apply new filters
    // If filters object is empty, this effectively shows all characters
    if (Object.keys(filters).length > 0) {
      dispatch(setFilters(filters));
    }
  };
  
  // Get current filters for active state checking
  const currentFilters = useSelector((state) => state.characters.filters);
  
  /**
   * Check if a quick filter is currently active
   * 
   * This compares current filters with the quick filter to highlight
   * the active button.
   * 
   * @param {Object} quickFilter - The quick filter to check
   * @returns {boolean} True if this quick filter is active
   */
  const isQuickFilterActive = (quickFilter) => {
    // If quick filter is empty (View All), check if all filters are empty
    if (Object.keys(quickFilter.filters).length === 0) {
      return Object.values(currentFilters).every(value => !value || value === '');
    }
    
    // Check if all quick filter values match current filters
    return Object.entries(quickFilter.filters).every(
      ([key, value]) => currentFilters[key]?.toLowerCase() === value.toLowerCase()
    );
  };
  
  // Get item count for display
  const itemCount = pagination.count || characters.length;
  
  return (
    <div className="top-bar">
      {/* Quick Filters Section */}
      <div className="top-bar-section quick-filters-section">
        <div className="quick-filters">
          {QUICK_FILTERS.map((filter, index) => {
            const isActive = isQuickFilterActive(filter);
            
            return (
              <button
                key={index}
                className={`quick-filter-button ${isActive ? 'active' : ''}`}
                onClick={() => handleQuickFilter(filter.filters)}
                aria-pressed={isActive}
                aria-label={`Filter by ${filter.label}`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Search and Info Section */}
      <div className="top-bar-section search-info-section">
        {/* Search Bar - Compact version for top bar */}
        <div className="top-bar-search">
          <CharacterSearch />
        </div>
        
        {/* Item Count */}
        <div className="top-bar-info">
          <span className="item-count">
            {isLoading ? 'Loading...' : `${itemCount} ${itemCount === 1 ? 'Character' : 'Characters'}`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
