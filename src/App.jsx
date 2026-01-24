/**
 * MAIN APP COMPONENT
 * 
 * This is the root component of our application.
 * 
 * REACT CONCEPTS:
 * - Component Composition: App is composed of smaller components
 * - JSX: Returns HTML-like structure
 * - Fragment: <>...</> allows returning multiple elements without a wrapper
 * 
 * REDUX PROVIDER:
 * The Provider component (in main.jsx) makes the Redux store available to all
 * child components. Without it, components can't access Redux.
 * 
 * COMPONENT HIERARCHY:
 * App
 *   ├── Header
 *   ├── CharacterSearch (connects to Redux - real-time search with debouncing)
 *   ├── CharacterFilters (connects to Redux - structured filtering)
 *   └── CharacterList (connects to Redux - displays results)
 * 
 * SEARCH VS FILTERS:
 * - Search: Quick text lookup, updates as you type (debounced)
 * - Filters: Structured filtering, applied on form submit
 * - Both work together: Search for "rick" + filter by "alive" = alive Ricks
 */

import CharacterSearch from './components/CharacterSearch';
import CharacterFilters from './components/CharacterFilters';
import CharacterList from './components/CharacterList';
import './App.css';

/**
 * App component - Root component of the application
 * 
 * @returns {JSX.Element} Main app UI
 */
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Rick and Morty Character Browser</h1>
        <p className="app-subtitle">
          Explore characters from the Rick and Morty universe
        </p>
      </header>
      
      <main className="app-main">
        {/* 
          SEARCH COMPONENT
          Provides real-time search with debouncing.
          Updates Redux every 2+ characters typed (after 500ms delay).
        */}
        <CharacterSearch />
        
        {/* 
          FILTER COMPONENT
          Provides structured filtering (status, species, type, gender).
          Applied when user submits the form.
          Works together with search for powerful filtering.
        */}
        <CharacterFilters />
        
        {/* 
          LIST COMPONENT
          Displays characters based on both search and filters.
          Automatically fetches new data when search or filters change.
        */}
        <CharacterList />
      </main>
      
      <footer className="app-footer">
        <p>
          Data provided by{' '}
          <a 
            href="https://rickandmortyapi.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            The Rick and Morty API
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
