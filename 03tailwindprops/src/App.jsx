import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Card from './components/card.jsx'

function App() {
  const [count, setCount] = useState(0)
  let myObj={
    userName: "July",
    age: 4,
  }
  let myArr=[1,2,3,4]

  return (
    <>
     
        
      <h1 className ="bg-green-600 p-4 rounded-xl text-white mb-4">Tailwind test</h1>
      <Card username="iPhone" btnText="Please read"/>
      <Card username="Android"/>

    </>
  )
}

export default App
