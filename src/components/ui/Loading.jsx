/**
 * LOADING COMPONENT
 * 
 * A reusable loading spinner component.
 * 
 * REACT CONCEPTS DEMONSTRATED:
 * - Functional Components: This is a simple function that returns JSX
 * - JSX: JavaScript XML - allows us to write HTML-like syntax in JavaScript
 * - Props: Components can receive data from parent components (though this one doesn't need any)
 * 
 * REUSABILITY:
 * This component can be used anywhere we need to show a loading state.
 * Following DRY (Don't Repeat Yourself) principle.
 */

import './Loading.css';

/**
 * Loading component that displays a spinner
 * 
 * @returns {JSX.Element} Loading spinner UI
 */
function Loading() {
  return (
    <div className="loading-container" role="status" aria-label="Loading">
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default Loading;
