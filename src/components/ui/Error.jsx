/**
 * ERROR COMPONENT
 * 
 * A reusable error message component.
 * 
 * REACT PROPS EXPLAINED:
 * Props (short for "properties") are how we pass data from parent to child components.
 * 
 * In this component:
 * - message: The error message to display (required)
 * - onRetry: Optional callback function to retry the failed operation
 * 
 * PROPS ARE IMMUTABLE:
 * Props are read-only. A component cannot modify its own props.
 * This is a fundamental React rule that ensures predictable behavior.
 * 
 * PROPS VS STATE:
 * - Props: Data passed FROM parent TO child (one-way data flow)
 * - State: Data managed WITHIN a component (can change over time)
 */

import './Error.css';

/**
 * Error component that displays an error message
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @param {Function} [props.onRetry] - Optional retry callback function
 * @returns {JSX.Element} Error message UI
 * 
 * EXAMPLE USAGE:
 * <Error message="Failed to load characters" onRetry={() => refetch()} />
 */
function Error({ message, onRetry }) {
  return (
    <div className="error-container" role="alert">
      <div className="error-icon">⚠️</div>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button 
          className="error-retry-button" 
          onClick={onRetry}
          aria-label="Retry"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// Default props (fallback values if props aren't provided)
Error.defaultProps = {
  message: 'An error occurred',
  onRetry: null,
};

export default Error;
