import { useEffect, useMemo, useState } from 'react';

const SUGGESTIONS = [
  'Wireless Mouse',
  'Wireless Keyboard',
  'Wool Blanket',
  'Wall Clock',
  'Water Bottle',
  'Yoga Block',
  'Yoga Pants',
  'Yellow Throw Pillow',
];

/**
 * AutocompleteExample
 *
 * Dropdown suggestions update as the user types.
 */
export default function AutocompleteExample() {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const filteredSuggestions = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return [];
    }

    return SUGGESTIONS.filter((item) =>
      item.toLowerCase().includes(normalized)
    ).slice(0, 6);
  }, [query]);

  useEffect(() => {
    // Reset selection when suggestions change so focus stays predictable.
    setActiveIndex(-1);
    setIsOpen(filteredSuggestions.length > 0);
  }, [filteredSuggestions]);

  const handleSelect = (value) => {
    setQuery(value);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event) => {
    if (!isOpen) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) =>
        index < filteredSuggestions.length - 1 ? index + 1 : 0
      );
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) =>
        index > 0 ? index - 1 : filteredSuggestions.length - 1
      );
    }

    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      handleSelect(filteredSuggestions[activeIndex]);
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <section>
      <h3>Autocomplete / Typeahead</h3>
      <label htmlFor="autocomplete-input">
        Search
        <input
          id="autocomplete-input"
          type="text"
          value={query}
          placeholder="Start typing..."
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-expanded={isOpen}
        />
      </label>
      {isOpen && (
        <ul role="listbox" aria-label="Search suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              role="option"
              aria-selected={index === activeIndex}
              style={{
                backgroundColor: index === activeIndex ? '#f0f0f0' : 'transparent',
                cursor: 'pointer',
                padding: '4px 8px',
              }}
              onMouseDown={() => handleSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
