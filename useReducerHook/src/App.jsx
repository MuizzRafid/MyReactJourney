import { useReducer } from "react";

import "./App.css";

const emptyData = {
  name: "",
  password: "",
  email: "",
  city: "",
  address: "",
};

function App() {
  const [state, dispatch] = useReducer(reducer, emptyData);
  function reducer(state, action) {
    return { ...state, [action.type]: action.val };
  }

  return (
    <>
      <div>
        <h1>UseReducer HOOk</h1>

        <div>
          <label htmlFor="">Name: </label>
          <input
            type="text"
            onChange={(e) => {
              dispatch({ val: e.target.value, type: "name" });
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="">Password: </label>
          <input
            type="text"
            onChange={(e) => {
              dispatch({ val: e.target.value, type: "password" });
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="">Email: </label>
          <input
            type="text"
            onChange={(e) => {
              dispatch({ val: e.target.value, type: "email" });
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="">City: </label>
          <input
            type="text"
            onChange={(e) => {
              dispatch({ val: e.target.value, type: "city" });
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="">Address: </label>
          <input
            type="text"
            onChange={(e) => {
              dispatch({ val: e.target.value, type: "address" });
            }}
          />
        </div>
        <br />
        <ul>
          <li>{state.name}</li>
          <li>{state.password}</li>
          <li>{state.email}</li>
          <li>{state.city}</li>
          <li>{state.address}</li>
        </ul>
      </div>
    </>
  );
}

export default App;
