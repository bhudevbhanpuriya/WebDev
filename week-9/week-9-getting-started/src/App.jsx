import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div>
      <b>Hi there</b>
      <Counter></Counter>
    </div>
  )
}

function Counter(){
  const [count , setCount] = useState(0);

  function increaseCount(){
    setCount(count+1);
  }

  function decreaseCount(){
    setCount(count-1);
  }

  function resetCount(){
    setCount(count-count);
  }

  return (
    <div>
       <h1 id="text">{count}</h1>
       <button onClick={increaseCount}>Increase Count</button>
       <button onClick={decreaseCount}>Decrease Count</button>
       <button onClick={resetCount}>Reset Count</button>
    </div>
  )
}

export default App
