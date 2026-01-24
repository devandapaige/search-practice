/**
 * PAGINATION COMPONENT
 * 
 * A reusable pagination control component.
 * 
 * REACT CONCEPTS:
 * - Props: Receives pagination data and callbacks
 * - Event Handlers: onPageChange callback for parent to handle page changes
 * - Conditional Rendering: Shows/hides prev/next buttons based on availability
 * 
 * CONTROLLED COMPONENT:
 * This is a "controlled" component - it doesn't manage its own state.
 * The parent component controls the current page, and this component
 * just displays it and notifies the parent when the user wants to change pages.
 */

import './Pagination.css';

/**
 * Pagination component
 * 
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current page number (1-indexed)
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Callback when page changes (receives new page number)
 * @param {boolean} [props.hasNext] - Whether there's a next page
 * @param {boolean} [props.hasPrev] - Whether there's a previous page
 * @returns {JSX.Element} Pagination controls UI
 */
function Pagination({ currentPage, totalPages, onPageChange, hasNext, hasPrev }) {
  /**
   * Handle page change
   * 
   * @param {number} newPage - The page number to navigate to
   */
  const handlePageChange = (newPage) => {
    // Validate page number is within bounds
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="pagination" role="navigation" aria-label="Pagination">
      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrev || currentPage === 1}
        aria-label="Previous page"
      >
        ← Previous
      </button>
      
      <div className="pagination-info">
        <span className="pagination-text">
          Page {currentPage} of {totalPages}
        </span>
      </div>
      
      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNext || currentPage === totalPages}
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  );
}

Pagination.defaultProps = {
  hasNext: false,
  hasPrev: false,
};

export default Pagination;
