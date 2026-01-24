/**
 * CHARACTER CARD COMPONENT
 * 
 * A reusable card component for displaying character information.
 * 
 * REACT CONCEPTS:
 * - Props: Receives character data from parent
 * - Event Handlers: onClick prop allows parent to handle clicks
 * - Conditional Rendering: Shows different content based on character status
 * 
 * COMPONENT COMPOSITION:
 * This is a "presentational" component - it only displays data and notifies
 * the parent when clicked. The parent handles the business logic.
 * This separation makes components reusable and testable.
 */

import './CharacterCard.css';

/**
 * CharacterCard component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.character - Character object with id, name, status, species, image, etc.
 * @param {Function} props.onClick - Callback function called when card is clicked
 * @returns {JSX.Element} Character card UI
 * 
 * EXAMPLE USAGE:
 * <CharacterCard 
 *   character={characterData} 
 *   onClick={() => navigateToDetail(characterData.id)} 
 * />
 */
function CharacterCard({ character, onClick }) {
  // Get status badge color based on character status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return 'status-alive';
      case 'dead':
        return 'status-dead';
      default:
        return 'status-unknown';
    }
  };

  return (
    <div 
      className="character-card" 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        // Allow keyboard navigation (Enter or Space to activate)
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${character.name}`}
    >
      <div className="character-card-image-container">
        <img 
          src={character.image} 
          alt={character.name}
          className="character-card-image"
          loading="lazy" // Lazy load images for better performance
        />
        <span className={`status-badge ${getStatusColor(character.status)}`}>
          {character.status}
        </span>
      </div>
      
      <div className="character-card-content">
        <h3 className="character-card-name">{character.name}</h3>
        <p className="character-card-species">{character.species}</p>
        {character.type && (
          <p className="character-card-type">{character.type}</p>
        )}
      </div>
    </div>
  );
}

export default CharacterCard;
