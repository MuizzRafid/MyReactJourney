# Redux Toolkit Learning Guide

This project is a simple React + Redux Toolkit starter built with Vite. It has a counter slice in `src/Features/Counter/counterSlice.jsx`, a store in `src/redux/store.js`, and component usage in `src/App.jsx`.

## What you need to learn in Redux Toolkit

1. Redux Toolkit basics
   - `configureStore`: how to create the Redux store.
   - `createSlice`: how to define state, reducers, and actions together.
   - `createAsyncThunk`: how to handle async logic like API calls.

2. Slice structure
   - `name`: the slice name.
   - `initialState`: the starting state object.
   - `reducers`: functions that update state using Immer.
   - action creators: exported from `slice.actions`.

3. Dispatching actions
   - use `useDispatch()` in components.
   - call actions like `dispatch(resetValue())`, not `dispatch(resetValue)`.
   - actions are plain objects created by action creators.

4. Selecting state
   - use `useSelector((state) => state.counter.value)`.
   - understand the Redux state tree shape.
   - keep selectors simple and stable.

5. Store structure
   - combine slices in `configureStore({ reducer: { counter: counterReducer } })`.
   - name each slice reducer clearly.
   - use `Provider` to wrap the app and share the store.

6. Immutable updates with Immer
   - write code like `state.value += 1` inside reducers.
   - Redux Toolkit uses Immer so reducers look mutable but are actually safe.

7. Async workflows
   - learn `createAsyncThunk` for loading data.
   - use extra reducers to handle `pending`, `fulfilled`, and `rejected` states.
   - understand the lifecycle of async actions.

8. Organizing large apps
   - group logic by feature, not by type.
   - keep each feature folder self-contained.
   - create a slice per domain area.

## Important concepts

- **Single source of truth**: Redux stores all shared state in one place.
- **Actions**: signals describing what should happen.
- **Reducers**: functions that update state based on actions.
- **Selectors**: functions to read specific pieces of state.
- **Middleware**: extend Redux with logging, async support, etc.
- **Immutability**: state must not be mutated directly outside of reducers.

## How to move from small examples to big projects

1. Start small, then add features gradually.
2. Use feature folders like `Features/Counter`.
3. Keep slice files focused on one feature.
4. Use reusable UI components and keep them separate from state logic.
5. Add abstraction only when needed: custom hooks, selectors, or shared utilities.
6. Test reducers and selectors as you build them.
7. Use a clear naming pattern: `counterSlice`, `counterReducer`, `resetValue`.
8. Keep the store config simple and scalable.

## Practical steps for this repo

- Inspect `src/Features/Counter/counterSlice.jsx` to learn slice syntax.
- Inspect `src/redux/store.js` to learn store setup.
- Inspect `src/App.jsx` to learn how to use actions and selectors in a component.
- Add one new feature at a time instead of changing everything at once.

## Tips for becoming confident with Redux Toolkit

- Build a Todo app with `createSlice` and local state.
- Add asynchronous data loading using `createAsyncThunk`.
- Refactor state into multiple slices as the app grows.
- Read the official Redux Toolkit docs: https://redux-toolkit.js.org/
- Practice debugging with Redux DevTools.

## Final advice

Focus on understanding the flow:

1. user event → component calls `dispatch()`
2. action creator returns an action object
3. reducer updates state
4. component reads state with `useSelector()`
5. UI updates automatically

That flow is the heart of Redux Toolkit. If you understand those steps, you can build larger apps by repeating the same pattern and organizing code by feature.
