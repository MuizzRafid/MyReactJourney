import React from "react";

export const ChildComponent = React.memo((props) => {
  console.log("Child com re-render");
  return (
    <div>
      <button>{props.buttonName}</button>
    </div>
  );
});

//React.memo->wrap->component->component re-render when
//props change
// if u sending a function then react. memo wont be save
//you from re-rendering
//because when the state re-render the function related to
// the state also re-render because they are not the same
// new function are created means new reference and react thing the new function and
// the function send by the props are not the same so it also rerender
