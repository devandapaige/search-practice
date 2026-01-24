# Quick Start Guide

## 🚀 Running the Application

1. **Install dependencies** (if not already done):
```bash
npm install
```

2. **Start the development server**:
```bash
npm run dev
```

3. **Open your browser**:
Navigate to `http://localhost:5173`

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 First Steps to Understand the Code

### 1. Start Here: Entry Point
Open `src/main.jsx` - This is where the app starts. See how Redux Provider wraps the App.

### 2. Main Component
Open `src/App.jsx` - See the component structure and how components are composed.

### 3. Simple Component
Open `src/components/ui/Loading.jsx` - Simplest component, good for understanding JSX and components.

### 4. State Management
Open `src/components/CharacterFilters.jsx` - See React hooks (useState, useEffect) and Redux integration.

### 5. Redux Store
Open `src/store/slices/charactersSlice.js` - Understand Redux slices, actions, and async thunks.

### 6. API Layer
Open `src/services/api.js` - See how API calls are structured following SOLID principles.

## 🔍 Understanding the Flow

1. **User types in filter** → `CharacterFilters` component
2. **Form submitted** → Dispatches `setFilters` action
3. **Redux updates** → `charactersSlice` reducer updates state
4. **Component detects change** → `CharacterList` useEffect runs
5. **API call made** → `fetchCharacters` thunk calls `api.js`
6. **Data received** → Redux state updated
7. **UI re-renders** → Components show new data via `useSelector`

## 💡 Key Concepts to Learn

### React
- **Components**: Reusable UI pieces
- **Props**: Data passed from parent to child
- **State**: Data that can change within a component
- **Hooks**: Functions that let you use React features
  - `useState`: Component-level state
  - `useEffect`: Side effects (API calls, etc.)
  - `useSelector`: Read from Redux store
  - `useDispatch`: Send actions to Redux

### Redux
- **Store**: Central state container
- **Slice**: Manages one piece of state
- **Actions**: Describe what happened
- **Reducers**: Specify how state updates
- **Thunks**: Handle async operations

### SOLID Principles
- **S**ingle Responsibility: Each module does one thing
- **O**pen/Closed: Extend without modifying
- **L**iskov Substitution: Components are interchangeable
- **I**nterface Segregation: Only receive needed props
- **D**ependency Inversion: Depend on abstractions

## 🐛 Common Issues

### Port Already in Use
If port 5173 is taken, Vite will automatically try the next available port.

### API Errors
The Rick and Morty API is free but rate-limited. If you see errors, wait a moment and try again.

### Build Errors
Make sure all dependencies are installed:
```bash
npm install
```

## 📚 Next Steps

1. Read the full [README.md](./README.md) for detailed explanations
2. Explore the code with the extensive comments
3. Try the exercises suggested in the README
4. Experiment by modifying components
5. Add new features following the same patterns

## 🎓 Learning Path

**Beginner:**
1. Understand components and JSX
2. Learn about props
3. Study useState hook
4. Understand useEffect hook

**Intermediate:**
1. Learn Redux basics
2. Understand async thunks
3. Study component composition
4. Learn SOLID principles

**Advanced:**
1. Optimize performance
2. Add routing
3. Implement advanced Redux patterns
4. Add testing

---

Happy coding! 🎉
