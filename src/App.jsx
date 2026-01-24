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
 *   ├── TopBar (quick filters, search, item count, sort)
 *   ├── Main Content Area
 *   │   ├── Sidebar (CharacterFilters - left side)
 *   │   └── Results (CharacterList - right side, takes most space)
 *   └── Footer
 * 
 * E-COMMERCE LAYOUT:
 * - Top bar with quick filters and search (like Crate & Barrel)
 * - Left sidebar for detailed filters
 * - Right side for results (takes up most of the page)
 * - Pagination at top and bottom of results
 */

import TopBar from './components/TopBar';
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
          TOP BAR
          E-commerce style top bar with:
          - Quick filter buttons (Dead Aliens, Ricks, Mortys, etc.)
          - Search bar (compact version)
          - Item count
          - Sort dropdown
        */}
        <TopBar />
        
        {/* 
          MAIN CONTENT AREA
          Two-column layout: sidebar (filters) + main content (results)
        */}
        <div className="app-content">
          {/* 
            SIDEBAR - FILTERS
            Left-hand side with detailed filter options.
            Collapsible for better UX.
          */}
          <aside className="app-sidebar">
            <CharacterFilters />
          </aside>
          
          {/* 
            MAIN CONTENT - RESULTS
            Right-hand side taking up most of the page.
            Displays character cards in a grid.
            Includes pagination at top and bottom.
          */}
          <div className="app-results">
            <CharacterList />
          </div>
        </div>
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
