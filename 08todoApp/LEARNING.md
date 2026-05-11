# Todo Flow Learning Guide

This document explains the todo app from a beginner React point of view. Read it slowly with `src/App.jsx` open beside it.

## 1. What This Project Is

This is a small React app made with Vite.

Vite starts a local development server, React builds the user interface, and CSS makes the app look polished.

Important files:

- `package.json`: lists project commands and dependencies.
- `index.html`: the single HTML page where React is mounted.
- `src/main.jsx`: connects React to the HTML page.
- `src/App.jsx`: contains the todo app logic and JSX markup.
- `src/styles.css`: contains all visual design and responsive layout.

## 2. How React Starts

In `index.html` there is this:

```html
<div id="root"></div>
```

That is an empty container. React fills it.

In `src/main.jsx`:

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

Meaning:

- Find the HTML element with `id="root"`.
- Create a React app inside it.
- Render the `App` component.

`<App />` is the main component from `src/App.jsx`.

## 3. What A Component Is

A React component is a function that returns UI.

In this app:

```jsx
function App() {
  return (
    <main className="app-shell">
      ...
    </main>
  )
}
```

The returned part looks like HTML, but it is JSX. JSX lets us write UI inside JavaScript.

## 4. State: Remembering Things

React state is data that can change while the app is running.

This app has five pieces of state:

```jsx
const [todos, setTodos] = useState(readStoredTodos)
const [newTodo, setNewTodo] = useState('')
const [filter, setFilter] = useState('all')
const [editingId, setEditingId] = useState(null)
const [editingText, setEditingText] = useState('')
```

Read each line like this:

- `todos`: the current value.
- `setTodos`: the function used to change that value.
- `useState(...)`: the starting value.

What each state does:

- `todos`: the array of todo objects.
- `newTodo`: the text currently typed in the add input.
- `filter`: which list view is active: `all`, `active`, or `completed`.
- `editingId`: which todo is currently being edited.
- `editingText`: the temporary text while editing.

## 5. Todo Data Shape

Each todo is an object:

```js
{
  id: crypto.randomUUID(),
  text: 'Plan the day',
  completed: false,
  createdAt: Date.now(),
}
```

Why each property exists:

- `id`: unique identifier so React knows which item is which.
- `text`: the task name.
- `completed`: true or false.
- `createdAt`: when it was created.

## 6. Adding A Todo

The form calls `addTodo`:

```jsx
<form className="todo-form" onSubmit={addTodo}>
```

The function:

```jsx
function addTodo(event) {
  event.preventDefault()
  const trimmedTodo = newTodo.trim()

  if (!trimmedTodo) {
    return
  }

  setTodos((currentTodos) => [
    {
      id: crypto.randomUUID(),
      text: trimmedTodo,
      completed: false,
      createdAt: Date.now(),
    },
    ...currentTodos,
  ])
  setNewTodo('')
}
```

Step by step:

- `event.preventDefault()` stops the browser from refreshing the page.
- `trim()` removes extra spaces.
- If the input is empty, stop.
- `setTodos(...)` creates a new array with the new todo at the top.
- `setNewTodo('')` clears the input.

Important beginner idea: we do not directly change the old array. We create a new array. This helps React notice the change and update the screen.

## 7. Controlled Input

The add input is controlled by React:

```jsx
<input
  value={newTodo}
  onChange={(event) => setNewTodo(event.target.value)}
/>
```

Meaning:

- The input displays `newTodo`.
- When the user types, `setNewTodo(...)` updates React state.
- React redraws the input with the new value.

This is one of the most common React patterns.

## 8. Toggling Complete

```jsx
function toggleTodo(id) {
  setTodos((currentTodos) =>
    currentTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    ),
  )
}
```

This means:

- Go through every todo using `map`.
- If the todo id matches, return a copied todo with `completed` flipped.
- If it does not match, return it unchanged.

`{ ...todo }` copies the old object. Then `completed: !todo.completed` changes only one property.

## 9. Deleting A Todo

```jsx
function removeTodo(id) {
  setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
}
```

`filter` keeps only the todos where the id does not match the deleted item.

## 10. Editing A Todo

Editing uses two states:

- `editingId`: which todo is open for editing.
- `editingText`: the temporary edit value.

When you click a todo text:

```jsx
function startEditing(todo) {
  setEditingId(todo.id)
  setEditingText(todo.text)
}
```

Then the JSX checks:

```jsx
{editingId === todo.id ? (
  <input ... />
) : (
  <button ...>{todo.text}</button>
)}
```

If this todo is being edited, show an input. Otherwise show normal text.

## 11. Saving An Edit

```jsx
function saveEditing(id) {
  const trimmedText = editingText.trim()

  if (!trimmedText) {
    removeTodo(id)
    setEditingId(null)
    return
  }

  setTodos((currentTodos) =>
    currentTodos.map((todo) =>
      todo.id === id ? { ...todo, text: trimmedText } : todo,
    ),
  )
  setEditingId(null)
}
```

If the edit is empty, the todo is removed. Otherwise the todo text is updated.

`setEditingId(null)` closes edit mode.

## 12. Filtering Todos

The filter buttons come from an array:

```jsx
const filters = ['all', 'active', 'completed']
```

Then JSX creates a button for each filter:

```jsx
{filters.map((filterName) => (
  <button
    className={filter === filterName ? 'active' : ''}
    key={filterName}
    onClick={() => setFilter(filterName)}
    type="button"
  >
    {filterName}
  </button>
))}
```

This is React's list rendering pattern:

- Use `.map(...)`.
- Return JSX for each item.
- Add a unique `key`.

## 13. Derived Values

Some values are calculated from existing state:

```jsx
const activeCount = todos.filter((todo) => !todo.completed).length
const completedCount = todos.length - activeCount
```

These do not need their own state because they can be calculated from `todos`.

Beginner rule: if a value can be calculated from existing state, calculate it instead of storing it separately.

## 14. useMemo

```jsx
const visibleTodos = useMemo(() => {
  if (filter === 'active') {
    return todos.filter((todo) => !todo.completed)
  }

  if (filter === 'completed') {
    return todos.filter((todo) => todo.completed)
  }

  return todos
}, [filter, todos])
```

`visibleTodos` is the list currently shown on screen.

`useMemo` says: only recalculate this when `filter` or `todos` changes.

For a tiny app this is not strictly required, but it is useful to learn because bigger apps often calculate filtered or sorted data this way.

## 15. useEffect And localStorage

```jsx
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}, [todos])
```

`useEffect` runs after React updates the screen.

This effect says:

- Whenever `todos` changes, save the todos into browser storage.
- `JSON.stringify(todos)` converts the array into text because localStorage stores strings.

At the top of the file, `readStoredTodos()` loads saved todos:

```jsx
function readStoredTodos() {
  const savedTodos = localStorage.getItem(STORAGE_KEY)
  ...
}
```

Together, these two pieces make the app remember todos after refreshing the browser.

## 16. Conditional Rendering

React can show different UI based on state.

Example 1:

```jsx
{editingId === todo.id ? <input /> : <button>{todo.text}</button>}
```

Example 2:

```jsx
{visibleTodos.length === 0 && (
  <div className="empty-state">...</div>
)}
```

The second pattern means: if the list is empty, show the empty state.

## 17. CSS Structure

The CSS is organized by UI area:

- `:root`: global colors, font, and CSS variables.
- `.app-shell`: full-page background and centering.
- `.todo-panel`: the main app surface.
- `.todo-form`: input and add button.
- `.toolbar`: filters and clear button.
- `.todo-list`: scrollable todo list.
- `.todo-item`: each todo row.
- `.empty-state`: message when no todos are visible.
- `@media`: responsive rules for smaller screens.

CSS variables are names for reusable values:

```css
--blue: #2f6fed;
--green: #19a974;
--shadow: 0 24px 70px rgba(42, 58, 75, 0.18);
```

Then we use them:

```css
color: var(--blue);
box-shadow: var(--shadow);
```

This keeps the design easier to change.

## 18. Commands To Run

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

On your Windows PowerShell, if `npm` is blocked by execution policy, use:

```bash
npm.cmd run dev
```

## 19. How To Study This App

Recommended order:

1. Open `src/main.jsx` and understand how React starts.
2. Open `src/App.jsx` and read only the state lines.
3. Study `addTodo`, then test adding a todo in the browser.
4. Study `toggleTodo`, then click the complete button.
5. Study `removeTodo`, then delete a todo.
6. Study the filter buttons and `visibleTodos`.
7. Study `useEffect` and refresh the browser to see saved data.
8. Open `src/styles.css` and connect class names from JSX to CSS.

## 20. Practice Tasks

Try these in order:

1. Change the app title from `Todo Flow` to your own name.
2. Change the main colors in `:root`.
3. Add a new starter todo.
4. Move new todos to the bottom instead of the top.
5. Add a button that marks all todos as completed.
6. Add a small date under each todo.
7. Add a priority field: low, medium, high.
8. Split `TodoItem` into its own component.

That last one is a very good next React lesson.

## 21. Good Learning Links

- React official quick start: https://react.dev/learn
- React state guide: https://react.dev/learn/state-a-components-memory
- React rendering lists: https://react.dev/learn/rendering-lists
- React effects: https://react.dev/learn/synchronizing-with-effects
- Vite guide: https://vite.dev/guide/
- MDN JavaScript arrays: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- MDN localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

## 22. Mental Model

React apps are mostly this loop:

1. State stores the current data.
2. JSX describes what the screen should look like for that state.
3. Events update state.
4. React redraws the screen.

For this todo app:

- Typing updates `newTodo`.
- Submitting adds to `todos`.
- Clicking complete updates one todo.
- Clicking a filter updates `filter`.
- Changing `todos` saves to `localStorage`.

Once this loop clicks in your head, React becomes much less mysterious.
