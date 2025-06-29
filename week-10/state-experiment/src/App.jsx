/*

step1 : create context

step2 : wrap parent element

step3 : catch context / use context

*/


import { useState,  createContext, useContext} from 'react'
import './App.css'

const BulbContext = createContext();

function BulbContextProvider({children}){
  const [bulbOn , setBulbOn]  = useState(true)

  return<BulbContext.Provider value={{
        bulbOn :bulbOn,
        setBulbOn:setBulbOn
    }} >
        {children}
    </BulbContext.Provider>
}

function App() {
  return<>
    <BulbContextProvider>
      <LightBulb/>
    </BulbContextProvider>
  </>
}

function LightBulb(){
  return <div>
    <Bulb/>
    <Toggle />
  </div>
}

function Bulb(){
  const {bulbOn} = useContext(BulbContext);
  return <div>
    {bulbOn ? "Bulb ON" : "Bulb OFF"}
  </div>
}

function Toggle(){

  const {bulbOn,setBulbOn} = useContext(BulbContext);

  function toggle(){
    setBulbOn(currentState => !currentState)
  }
  return <div>
    <button onClick={toggle} >Toggle Bulb</button>
  </div>
}

export default App
