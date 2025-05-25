import { useState } from 'react'
import './App.css'

function App() {
  return  <div>
    <LightBulb/>
  </div>
}

function LightBulb(){
  const [bulbOn , setBulbOn]  = useState(true)
  return <div>
    <Bulb bulbOn = {bulbOn}/>
    <Toggle setBulbOn = {setBulbOn}/>
  </div>
}

function Bulb({bulbOn}){
  return <div>
    {bulbOn ? "Bulb ON" : "Bulb OFF"}
  </div>
}

function Toggle({setBulbOn}){
  function toggle(){
    setBulbOn(currentState => !currentState)
  }
  return <div>
    <button onClick={toggle} >Toggle Bulb</button>
  </div>
}

export default App
