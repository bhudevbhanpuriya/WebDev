import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import "./App.css"
import { counterAtom } from "../../../week-10/state-experiment/src/store/counter";




function App() {

  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  )
}

function Counter() {
  return <>
    <Increase />
    <Decrease />
    <Count />
  </>
}

function Count() {
  const count = useRecoilValue(counterAtom)
  return <>
    <p>Count is {count}</p>
  </>
}

function Increase() {
  const setCount = useSetRecoilState(counterAtom)
  function increment() {
    setCount(curr => curr + 1)
  }
  return <>
    <button onClick={increment}>Increase</button>
  </>
}

function Decrease() {
  const setCount = useSetRecoilState(counterAtom)
  function decrement() {
    setCount(curr => curr - 1)
  }

  return <>
    <button onClick={decrement}>Decrease</button>
  </>
}


export default App



/*
----------------useState Method

import { useState } from 'react'

import "./App.css"

function App() {

  return (
    <>
      <Counter/>
    </>
  )
}

function Counter(){
  const [count, setCount] = useState(0)
   return <>
      <Increase setCount={setCount}/>
      <Decrease setCount={setCount}/>
      <p>Count is {count}</p>
    </>
}

function Increase({setCount}) {

  function increment() {
    setCount(curr => curr + 1)
  }
  return <>
    <button onClick={increment}>Increase</button>
  </>
}

function Decrease({setCount}) {
  function decrement() {
    setCount(curr => curr - 1)
  }

  return <>
    <button onClick={decrement}>Decrease</button>
  </>
}


export default App


------------------context API

import { useState, useContext,createContext } from 'react'

import "./App.css"


const CounterContext = createContext();

function CounterContextProvider({children}){
  const [count, setCount] = useState(0);

  return <CounterContext.Provider value = {{
      count : count,
      setCount : setCount
    }
  }>
    {children}
  </CounterContext.Provider>
}

function App() {

  return (
    <>
      <CounterContextProvider>
        <Counter />
      </CounterContextProvider>
    </>
  )
}

function Counter() {
  const {count} = useContext(CounterContext);
  return <>
    <Increase />
    <Decrease />
    <p>Count is {count}</p>
  </>
}

function Increase() {

  const {setCount} = useContext(CounterContext);
  function increment() {
    setCount(curr => curr + 1)
  }
  return <>
    <button onClick={increment}>Increase</button>
  </>
}

function Decrease() {
  const {setCount} = useContext(CounterContext);
  function decrement() {
    setCount(curr => curr - 1)
  }

  return <>
    <button onClick={decrement}>Decrease</button>
  </>
}


export default App

*/