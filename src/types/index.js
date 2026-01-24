/**
 * TYPE DEFINITIONS
 * 
 * This file contains all TypeScript-like type definitions for our application.
 * In JavaScript, we use JSDoc comments to document types and provide IntelliSense.
 * 
 * WHY: Centralizing types makes it easier to maintain and ensures consistency
 * across the application. This follows the DRY (Don't Repeat Yourself) principle.
 */

/**
 * Character type from Rick and Morty API
 * 
 * @typedef {Object} Character
 * @property {number} id - Unique identifier for the character
 * @property {string} name - Character's name
 * @property {string} status - Character status: 'Alive', 'Dead', or 'unknown'
 * @property {string} species - Character's species
 * @property {string} type - Subspecies or type of character
 * @property {string} gender - Character gender: 'Female', 'Male', 'Genderless', or 'unknown'
 * @property {Object} origin - Origin location information
 * @property {string} origin.name - Name of origin location
 * @property {string} origin.url - URL to origin location endpoint
 * @property {Object} location - Current location information
 * @property {string} location.name - Name of current location
 * @property {string} location.url - URL to current location endpoint
 * @property {string} image - URL to character's avatar image (300x300px)
 * @property {string[]} episode - Array of episode URLs where character appears
 * @property {string} url - URL to character's own endpoint
 * @property {string} created - ISO timestamp when character was created in database
 */

/**
 * Location type from Rick and Morty API
 * 
 * @typedef {Object} Location
 * @property {number} id - Unique identifier for the location
 * @property {string} name - Location name
 * @property {string} type - Type of location (e.g., 'Planet', 'Space station')
 * @property {string} dimension - Dimension where location exists
 * @property {string[]} residents - Array of character URLs who are residents
 * @property {string} url - URL to location's own endpoint
 * @property {string} created - ISO timestamp when location was created
 */

/**
 * Episode type from Rick and Morty API
 * 
 * @typedef {Object} Episode
 * @property {number} id - Unique identifier for the episode
 * @property {string} name - Episode name
 * @property {string} air_date - Air date of the episode
 * @property {string} episode - Episode code (e.g., 'S01E01')
 * @property {string[]} characters - Array of character URLs in the episode
 * @property {string} url - URL to episode's own endpoint
 * @property {string} created - ISO timestamp when episode was created
 */

/**
 * API Response wrapper with pagination info
 * 
 * @typedef {Object} ApiResponse
 * @property {Object} info - Pagination information
 * @property {number} info.count - Total number of items
 * @property {number} info.pages - Total number of pages
 * @property {string|null} info.next - URL to next page (null if last page)
 * @property {string|null} info.prev - URL to previous page (null if first page)
 * @property {Array} results - Array of items (Character, Location, or Episode)
 */

/**
 * Filter parameters for character search
 * 
 * @typedef {Object} CharacterFilters
 * @property {string} [name] - Filter by character name
 * @property {string} [status] - Filter by status: 'alive', 'dead', or 'unknown'
 * @property {string} [species] - Filter by species
 * @property {string} [type] - Filter by type/subspecies
 * @property {string} [gender] - Filter by gender: 'female', 'male', 'genderless', or 'unknown'
 * @property {number} [page] - Page number for pagination
 */

export {};
