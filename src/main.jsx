/**
 * APPLICATION ENTRY POINT
 * 
 * This is the first file that runs when the application loads.
 * 
 * REACT CONCEPTS:
 * - ReactDOM: Library for rendering React components to the DOM
 * - createRoot: Modern React 18 way to create a root and render
 * - StrictMode: Development tool that helps find problems
 * 
 * REDUX SETUP:
 * - Provider: Makes Redux store available to all components
 * - store: The Redux store we created in store/store.js
 * 
 * RENDERING:
 * ReactDOM.render() takes our App component and renders it into
 * the HTML element with id="root" (defined in index.html).
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App.jsx';
import './index.css';

/**
 * Create React root and render application
 * 
 * React 18 uses createRoot instead of the old ReactDOM.render()
 * This enables concurrent features and better performance.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode helps catch problems during development
  // It renders components twice in development to find side effects
  <React.StrictMode>
    {/* 
      Provider makes Redux store available to all child components
      Any component can now use useSelector and useDispatch hooks
    */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
