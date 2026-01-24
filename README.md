# Rick and Morty Character Browser

A React + Redux application for browsing characters from the Rick and Morty API. This project is designed as a learning resource, with extensive comments explaining React concepts, Redux patterns, and SOLID principles.

## 🎯 Learning Objectives

This project demonstrates:
- **React Fundamentals**: Components, Props, Hooks, JSX
- **Redux State Management**: Store, Slices, Actions, Thunks
- **SOLID Principles**: Applied throughout the codebase
- **REST API Integration**: Fetching and displaying data
- **Component Architecture**: Separation of concerns, reusability
- **Advanced Patterns**: Debouncing, search vs filters, state management
- **UI Patterns**: Collapsible components, conditional rendering, local vs global state

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (Loading, Error, Card, etc.)
│   ├── CharacterList.jsx
│   ├── CharacterSearch.jsx  # Real-time search with debouncing
│   └── CharacterFilters.jsx
├── store/              # Redux store configuration
│   ├── store.js        # Store setup
│   └── slices/         # Redux slices (feature-based state)
│       └── charactersSlice.js
├── services/           # API service layer
│   └── api.js          # All API calls
├── types/              # Type definitions (JSDoc)
│   └── index.js
├── App.jsx             # Main app component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## 🏗️ Architecture Overview

### SOLID Principles Applied

#### 1. **Single Responsibility Principle (SRP)**
Each module/component has one clear purpose:
- `services/api.js`: Only handles API communication
- `store/slices/charactersSlice.js`: Only manages character state
- `components/ui/Loading.jsx`: Only displays loading spinner
- `components/CharacterFilters.jsx`: Only handles filtering UI
- `components/CharacterSearch.jsx`: Only handles search functionality

#### 2. **Open/Closed Principle (OCP)**
- Redux slices can be extended with new actions without modifying existing ones
- Components accept props that allow customization without changing their code
- New filter types can be added without modifying existing filter logic

#### 3. **Liskov Substitution Principle (LSP)**
- UI components (Loading, Error, CharacterCard) are interchangeable
- They all follow consistent prop patterns

#### 4. **Interface Segregation Principle (ISP)**
- Components only receive the props they need
- API functions are focused and don't require unnecessary parameters

#### 5. **Dependency Inversion Principle (DIP)**
- Components depend on abstractions (Redux store) not concrete implementations
- API service layer abstracts HTTP calls, making it easy to swap implementations

## 🔄 Data Flow

```
User Action
    ↓
Component (e.g., CharacterFilters)
    ↓
Dispatch Redux Action
    ↓
Redux Slice (charactersSlice)
    ↓
Async Thunk (fetchCharacters)
    ↓
API Service (api.js)
    ↓
Rick and Morty API
    ↓
Response flows back up
    ↓
Redux Store Updated
    ↓
Components Re-render (via useSelector)
```

## 📚 Key React Concepts Explained

### Components

**What are Components?**
Components are reusable pieces of UI. They're like JavaScript functions that return HTML (JSX).

**Example:**
```jsx
function CharacterCard({ character, onClick }) {
  return <div onClick={onClick}>{character.name}</div>;
}
```

### Props

**What are Props?**
Props (short for "properties") are how you pass data from parent to child components. They're **read-only** - a component cannot modify its own props.

**Example:**
```jsx
// Parent component
<CharacterCard character={characterData} onClick={handleClick} />

// Child component receives props
function CharacterCard({ character, onClick }) {
  // character and onClick are available here
}
```

**Key Rules:**
- Props flow **down** (parent → child)
- Props are **immutable** (can't be changed by child)
- Props can be functions, objects, strings, numbers, etc.

### Hooks

Hooks are special functions that let you "hook into" React features.

#### useState
Manages component-level state (data that can change).

```jsx
const [count, setCount] = useState(0);
// count is the value, setCount is the function to update it
```

#### useEffect
Performs side effects (API calls, subscriptions, DOM manipulation).

```jsx
useEffect(() => {
  // This runs after every render
  fetchData();
}, [dependency]); // Only re-run if dependency changes
```

#### useSelector (Redux)
Reads data from Redux store.

```jsx
const characters = useSelector((state) => state.characters.items);
```

#### useDispatch (Redux)
Gets the dispatch function to send actions to Redux.

```jsx
const dispatch = useDispatch();
dispatch(fetchCharacters());
```

### JSX

JSX is JavaScript XML - it lets you write HTML-like syntax in JavaScript.

```jsx
// JSX
const element = <h1>Hello, {name}!</h1>;

// Compiles to JavaScript
const element = React.createElement('h1', null, `Hello, ${name}!`);
```

**Rules:**
- Must return a single root element (or use Fragment `<>...</>`)
- Use `className` instead of `class`
- Use `{}` for JavaScript expressions
- Self-closing tags need `/`: `<img />`

## 🔴 Redux Concepts Explained

### What is Redux?

Redux is a state management library. Instead of passing data through many components (prop drilling), Redux provides a central "store" where any component can access or update state.

### Store

The **store** is the single source of truth for your application state.

```jsx
// Creating a store
const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
});
```

### Slices

A **slice** manages one piece of your application state. It contains:
- Initial state
- Reducers (synchronous state updates)
- Async thunks (for API calls)

### Actions

**Actions** are plain objects that describe what happened. Redux Toolkit auto-generates them.

```jsx
// Action creator (auto-generated)
dispatch(setFilters({ status: 'alive' }));

// Action object (what gets dispatched)
{ type: 'characters/setFilters', payload: { status: 'alive' } }
```

### Reducers

**Reducers** are pure functions that specify how state updates in response to actions.

```jsx
// Reducer function
setFilters: (state, action) => {
  state.filters = { ...state.filters, ...action.payload };
}
```

### Async Thunks

**Thunks** handle asynchronous operations (like API calls). They automatically dispatch pending/fulfilled/rejected actions.

```jsx
export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (filters) => {
    const response = await getCharacters(filters);
    return response;
  }
);
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📖 Code Walkthrough

### 1. API Service Layer (`src/services/api.js`)

**Purpose:** Handles all HTTP requests to the Rick and Morty API.

**Key Concepts:**
- Separation of concerns: API logic is isolated
- Reusable functions: Can be used anywhere in the app
- Error handling: Centralized error management

**Example:**
```javascript
export async function getCharacters(params = {}) {
  const url = `${BASE_URL}/character?${queryParams}`;
  return fetchData(url);
}
```

### 2. Redux Store (`src/store/store.js`)

**Purpose:** Configures the Redux store.

**Key Concepts:**
- Single source of truth
- Provider makes store available to all components
- Reducers manage different parts of state

### 3. Redux Slice (`src/store/slices/charactersSlice.js`)

**Purpose:** Manages character-related state.

**Key Concepts:**
- Initial state defines starting values
- Reducers handle synchronous updates
- Async thunks handle API calls
- Extra reducers handle thunk actions

### 4. Components

#### CharacterFilters (`src/components/CharacterFilters.jsx`)

**Purpose:** Allows users to filter characters.

**Key Concepts:**
- Controlled inputs (React controls the value)
- Local state for form inputs
- Syncs with Redux on submit
- Event handlers update state

#### CharacterList (`src/components/CharacterList.jsx`)

**Purpose:** Displays list of characters.

**Key Concepts:**
- Connects to Redux (container component)
- useEffect fetches data when filters/page change
- Conditional rendering based on state
- Maps over array to render cards

#### UI Components (`src/components/ui/`)

**Purpose:** Reusable presentational components.

**Key Concepts:**
- Don't know about Redux
- Receive data via props
- Highly reusable
- Easy to test

## 🎓 Learning Path

### For Beginners

1. **Start with Components**
   - Read `src/components/ui/Loading.jsx` - simplest component
   - Understand JSX syntax
   - Learn about props

2. **Learn State Management**
   - Read `src/components/CharacterFilters.jsx`
   - Understand `useState` hook
   - See how state updates UI

3. **Understand Redux**
   - Read `src/store/slices/charactersSlice.js`
   - See how state is managed globally
   - Understand actions and reducers

4. **Study Data Flow**
   - Follow a user action from component → Redux → API → back
   - See how `useEffect` triggers API calls
   - Understand how Redux updates trigger re-renders

### For Intermediate Developers

1. **Study Architecture**
   - Understand SOLID principles in practice
   - See separation of concerns
   - Learn component composition patterns

2. **Redux Patterns**
   - Study async thunks
   - Understand reducer patterns
   - Learn about selectors

3. **Performance**
   - Consider memoization opportunities
   - Understand re-render triggers
   - Study lazy loading

## 🛠️ Technologies Used

- **React 18**: UI library
- **Redux Toolkit**: State management
- **Vite**: Build tool and dev server
- **Rick and Morty API**: Data source

## 📝 Code Comments

Every file in this project contains extensive comments explaining:
- **What** the code does
- **Why** it's structured that way
- **How** React/Redux concepts apply
- **When** to use certain patterns

## 🔍 Key Files to Study

1. **`src/services/api.js`** - API layer, SOLID principles
2. **`src/store/slices/charactersSlice.js`** - Redux patterns
3. **`src/components/CharacterList.jsx`** - React hooks, Redux integration
4. **`src/components/CharacterFilters.jsx`** - Form handling, state management
5. **`src/components/CharacterSearch.jsx`** - Debouncing, search patterns, useRef hook

## 🔍 Search Feature

The application includes both **Search** and **Filter** functionality:

- **Search**: Real-time text search with intelligent triggering
  - Triggers every **2 new characters** typed, OR
  - Triggers immediately when **Enter** is pressed
  - Still uses debouncing for performance
- **Filters**: Structured filtering by status, species, type, and gender
- **Combined**: Search and filters work together for powerful filtering

See [SEARCH_FEATURE_GUIDE.md](./SEARCH_FEATURE_GUIDE.md) for a detailed explanation of:
- How debouncing works
- Search vs filters differences
- useRef hook usage
- Combining search and filters

See [SEARCH_TRIGGER_PATTERN.md](./SEARCH_TRIGGER_PATTERN.md) for the new hybrid trigger pattern:
- Character count tracking
- Enter key handling
- Incremental search logic
- State management for triggers

## 📦 Collapsible UI Feature

The filter section includes a **collapsible/expandable UI** that demonstrates important state management concepts:

- **Local UI State**: Controls visibility (isExpanded)
- **State Management Patterns**: When to use local vs global state
- **Conditional Rendering**: Showing/hiding content based on state
- **Auto-expand**: Automatically expands when filters are active

See [COLLAPSE_FEATURE_GUIDE.md](./COLLAPSE_FEATURE_GUIDE.md) for a detailed explanation of:
- Local state vs global state
- State lifecycle and re-renders
- Conditional rendering patterns
- Decision tree for state placement

## 🎯 Exercises for Practice

1. **Add a Character Detail View**
   - Create a new component to show full character details
   - Use `fetchCharacter` thunk from the slice
   - Add routing (consider React Router)

2. **Add Locations Feature**
   - Create `locationsSlice.js` following the same pattern
   - Create `LocationList` component
   - Add location filters

3. **Improve Error Handling**
   - Add retry logic with exponential backoff
   - Show more detailed error messages
   - Add error boundaries

4. **Add Search Debouncing**
   - Debounce the name filter input
   - Prevent API calls on every keystroke
   - Use a custom hook

5. **Add Favorites**
   - Store favorite characters in localStorage
   - Add favorite/unfavorite functionality
   - Create a favorites view

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Rick and Morty API Docs](https://rickandmortyapi.com/documentation)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

## 🤝 Contributing

This is a learning project. Feel free to:
- Add more features
- Improve documentation
- Refactor code
- Add tests

## 📄 License

This project is for educational purposes.

---

**Happy Learning! 🚀**
