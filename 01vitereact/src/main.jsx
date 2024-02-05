import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

function Myapp(){
  return(
  <div>
    <h1>My function in main</h1>
  </div>
  )
}

const anotherElement=( 
  <a href="https://google.com" target='_blank'>Visit Plz</a>
)

//i can't use customReact syntax here cause that was developed by me.i decided to name 
//keys like type,props and other.but if i want to use that way then i need to know how 
//react can take it or how react was written,now see how react takes


//it takes variable at the last
const myVariable="Muizz Rafid";

const reactElement=React.createElement(
'a',
{href:'https://google.com',target:'_blank'},
'click me to visit google',
myVariable

)

ReactDOM.createRoot(document.getElementById('root')).render(

   // <Myapp />
   //anotherElement,
  // reactElement,
    <App/>

)
