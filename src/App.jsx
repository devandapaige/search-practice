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
 *   ├── Header (practice hub branding + primary navigation)
 *   ├── Routes
 *   │   ├── PracticePage (search patterns + algorithm catalog)
 *   │   └── HomePage (character browser layout)
 *   └── Footer
 *
 * ROUTING:
 * - "/" redirects to "/practice"
 * - "/practice" shows the study tool for algorithms and search patterns
 * - "/characters" shows the Rick and Morty character browser
 */

import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PracticePage from './pages/PracticePage';
import './App.css';

/**
 * App component - Root component of the application
 * 
 * @returns {JSX.Element} Main app UI
 */
function App() {
  const getNavLinkClass = ({ isActive }) =>
    `app-nav-link${isActive ? ' app-nav-link-active' : ''}`;

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-header-text">
            <h1 className="app-title">Algorithm Practice Studio</h1>
            <p className="app-subtitle">
              Search patterns, core algorithms, and guided code examples
            </p>
          </div>
          <nav className="app-nav" aria-label="Primary">
            <NavLink to="/practice" className={getNavLinkClass}>
              Practice Hub
            </NavLink>
            <NavLink to="/characters" className={getNavLinkClass}>
              Character Browser
            </NavLink>
          </nav>
        </div>
      </header>
      
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/practice" replace />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/characters" element={<HomePage />} />
        </Routes>
      </main>
      
      <footer className="app-footer">
        <p>
          Character browser data provided by{' '}
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
