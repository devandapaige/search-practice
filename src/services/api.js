/**
 * API SERVICE LAYER
 * 
 * SINGLE RESPONSIBILITY PRINCIPLE (SOLID):
 * This module has ONE job: handle all API communication with the Rick and Morty API.
 * It doesn't know about React, Redux, or UI - it just makes HTTP requests.
 * 
 * WHY SEPARATE: 
 * - Easy to test API calls independently
 * - Can swap out the API implementation without changing other code
 * - Centralized error handling for API calls
 * - Reusable across different parts of the app
 */

const BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * Generic fetch wrapper with error handling
 * 
 * @param {string} url - The full URL to fetch
 * @returns {Promise<any>} - The JSON response data
 * @throws {Error} - If the request fails
 * 
 * WHY: This wrapper handles common fetch logic (error checking, JSON parsing)
 * so we don't repeat it in every API call.
 */
async function fetchData(url) {
  try {
    const response = await fetch(url);
    
    // Check if the response is ok (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    // Re-throw with more context
    throw new Error(`API request failed: ${error.message}`);
  }
}

/**
 * CHARACTER API METHODS
 * 
 * These methods handle all character-related API calls.
 * Following Single Responsibility: each function does ONE thing.
 */

/**
 * Get all characters with optional pagination and filters
 * 
 * @param {Object} params - Query parameters
 * @param {number} [params.page=1] - Page number
 * @param {string} [params.name] - Filter by name
 * @param {string} [params.status] - Filter by status
 * @param {string} [params.species] - Filter by species
 * @param {string} [params.type] - Filter by type
 * @param {string} [params.gender] - Filter by gender
 * @returns {Promise<ApiResponse>} - Response with info and results array
 * 
 * EXAMPLE USAGE:
 * getCharacters({ page: 1, status: 'alive', name: 'rick' })
 */
export async function getCharacters(params = {}) {
  // Build query string from parameters
  const queryParams = new URLSearchParams();
  
  // Only add parameters that are defined (not null/undefined)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value);
    }
  });
  
  const queryString = queryParams.toString();
  const url = `${BASE_URL}/character${queryString ? `?${queryString}` : ''}`;
  
  return fetchData(url);
}

/**
 * Get a single character by ID
 * 
 * @param {number} id - Character ID
 * @returns {Promise<Character>} - Character object
 */
export async function getCharacter(id) {
  const url = `${BASE_URL}/character/${id}`;
  return fetchData(url);
}

/**
 * Get multiple characters by IDs
 * 
 * @param {number[]} ids - Array of character IDs
 * @returns {Promise<Character[]>} - Array of character objects
 * 
 * NOTE: API accepts comma-separated IDs: /character/1,2,3
 */
export async function getCharactersByIds(ids) {
  const idsString = ids.join(',');
  const url = `${BASE_URL}/character/${idsString}`;
  return fetchData(url);
}

/**
 * LOCATION API METHODS
 */

/**
 * Get all locations with optional pagination and filters
 * 
 * @param {Object} params - Query parameters
 * @param {number} [params.page=1] - Page number
 * @param {string} [params.name] - Filter by name
 * @param {string} [params.type] - Filter by type
 * @param {string} [params.dimension] - Filter by dimension
 * @returns {Promise<ApiResponse>} - Response with info and results array
 */
export async function getLocations(params = {}) {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value);
    }
  });
  
  const queryString = queryParams.toString();
  const url = `${BASE_URL}/location${queryString ? `?${queryString}` : ''}`;
  
  return fetchData(url);
}

/**
 * Get a single location by ID
 * 
 * @param {number} id - Location ID
 * @returns {Promise<Location>} - Location object
 */
export async function getLocation(id) {
  const url = `${BASE_URL}/location/${id}`;
  return fetchData(url);
}

/**
 * EPISODE API METHODS
 */

/**
 * Get all episodes with optional pagination and filters
 * 
 * @param {Object} params - Query parameters
 * @param {number} [params.page=1] - Page number
 * @param {string} [params.name] - Filter by name
 * @param {string} [params.episode] - Filter by episode code (e.g., 'S01E01')
 * @returns {Promise<ApiResponse>} - Response with info and results array
 */
export async function getEpisodes(params = {}) {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value);
    }
  });
  
  const queryString = queryParams.toString();
  const url = `${BASE_URL}/episode${queryString ? `?${queryString}` : ''}`;
  
  return fetchData(url);
}

/**
 * Get a single episode by ID
 * 
 * @param {number} id - Episode ID
 * @returns {Promise<Episode>} - Episode object
 */
export async function getEpisode(id) {
  const url = `${BASE_URL}/episode/${id}`;
  return fetchData(url);
}
