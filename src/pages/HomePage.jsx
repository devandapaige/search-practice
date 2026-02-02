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
      <section className="app-secondary-hero">
        <div>
          <h2>Rick and Morty Character Browser</h2>
          <p>
            A secondary playground for practicing filters, search, and
            pagination with live API data.
          </p>
        </div>
      </section>
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
