/**
 * HOME PAGE
 *
 * Keeps the existing character browser layout isolated from routing logic.
 */
import TopBar from '../components/TopBar';
import CharacterFilters from '../components/CharacterFilters';
import CharacterList from '../components/CharacterList';

export default function HomePage() {
  return (
    <>
      <TopBar />
      <div className="app-content">
        <aside className="app-sidebar">
          <CharacterFilters />
        </aside>
        <div className="app-results">
          <CharacterList />
        </div>
      </div>
    </>
  );
}
