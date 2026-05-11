import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'todo-flow-items'

const starterTodos = [
  {
    id: crypto.randomUUID(),
    text: 'Plan the day',
    completed: false,
    createdAt: Date.now(),
  },
  // {
  //   id: crypto.randomUUID(),
  //   text: 'Build something small',
  //   completed: true,
  //   createdAt: Date.now() - 1,
  // },
]

const filters = ['all', 'active', 'completed']

function readStoredTodos() {
  const savedTodos = localStorage.getItem(STORAGE_KEY)

  if (!savedTodos) {
    return starterTodos
  }

  try {
    const parsedTodos = JSON.parse(savedTodos)
    return Array.isArray(parsedTodos) ? parsedTodos : starterTodos
  } catch {
    return starterTodos
  }
}

function App() {
  const [todos, setTodos] = useState(readStoredTodos)
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - activeCount

  const visibleTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed)
    }

    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed)
    }

    return todos
  }, [filter, todos])

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

  function toggleTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function removeTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  function startEditing(todo) {
    setEditingId(todo.id)
    setEditingText(todo.text)
  }

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

  function clearCompleted() {
    setTodos((currentTodos) => currentTodos.filter((todo) => !todo.completed))
  }

  return (
    <main className="app-shell">
      <section className="todo-panel" aria-label="Todo list application">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Today</p>
            <h1>Todo Flow</h1>
          </div>
          <div className="progress-ring" aria-label={`${activeCount} active tasks`}>
            <span>{activeCount}</span>
            <small>left</small>
          </div>
        </div>

        <form className="todo-form" onSubmit={addTodo}>
          <input
            aria-label="New todo"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit">Add</button>
        </form>

        <div className="toolbar">
          <div className="filter-group" aria-label="Todo filters">
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
          </div>

          <button
            className="clear-button"
            disabled={completedCount === 0}
            onClick={clearCompleted}
            type="button"
          >
            Clear done
          </button>
        </div>

        <ul className="todo-list">
          {visibleTodos.map((todo) => (
            <li className={todo.completed ? 'todo-item completed' : 'todo-item'} key={todo.id}>
              <button
                className="check-button"
                onClick={() => toggleTodo(todo.id)}
                type="button"
                aria-label={todo.completed ? 'Mark as active' : 'Mark as complete'}
              >
                {todo.completed ? 'Done' : ''}
              </button>

              {editingId === todo.id ? (
                <input
                  className="edit-input"
                  autoFocus
                  value={editingText}
                  onBlur={() => saveEditing(todo.id)}
                  onChange={(event) => setEditingText(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      saveEditing(todo.id)
                    }

                    if (event.key === 'Escape') {
                      setEditingId(null)
                    }
                  }}
                />
              ) : (
                <button
                  className="todo-text"
                  onClick={() => startEditing(todo)}
                  type="button"
                  title="Click to edit"
                >
                  {todo.text}
                </button>
              )}

              <button
                className="delete-button"
                onClick={() => removeTodo(todo.id)}
                type="button"
                aria-label={`Delete ${todo.text}`}
              >
                X
              </button>
            </li>
          ))}
        </ul>

        {visibleTodos.length === 0 && (
          <div className="empty-state">
            <strong>No tasks here</strong>
            <span>
              {filter === 'all'
                ? 'Add your first task to get started.'
                : `No ${filter} tasks right now.`}
            </span>
          </div>
        )}

        <footer className="summary">
          <span>{todos.length} total</span>
          <span>{completedCount} completed</span>
        </footer>
      </section>
    </main>
  )
}

export default App
