import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import "./App.css"
import { counterAtom, eventSelector } from "../store/counter";
// import { counterAtom } from "../store/counter";
 
function App() {

  return (
    <RecoilRoot>
      <Buttons/>
      <Counter/>
      <IsEven/>
    </RecoilRoot>
  )
}

function Buttons(){
  const setCount = useSetRecoilState(counterAtom);

  function increase(){
    setCount(curr => curr+2);
  }

  function decrease(){
    setCount(curr => curr-1);
  }

  return <div>
    <button onClick={increase}>Increase</button>
    <button onClick={decrease}>Decrease</button>
  </div>
}

function Counter(){
  const count = useRecoilValue(counterAtom);
  return <div>
    <p>Counter is {count}</p>
  </div>
}

function IsEven(){
  const isEven = useRecoilValue(eventSelector);
  return <div>
    {isEven ? "even" : "odd"}
  </div>
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



----------------------------recoil 
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import "./App.css"
import { counterAtom } from "../store/counter";
// import { counterAtom } from "../store/counter";




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


------------------------------recoil with selector

import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import "./App.css"
import { counterAtom, eventSelector } from "../store/counter";
// import { counterAtom } from "../store/counter";
 
function App() {

  return (
    <RecoilRoot>
      <Buttons/>
      <Counter/>
      <IsEven/>
    </RecoilRoot>
  )
}

function Buttons(){
  const setCount = useSetRecoilState(counterAtom);

  function increase(){
    setCount(curr => curr+2);
  }

  function decrease(){
    setCount(curr => curr-1);
  }

  return <div>
    <button onClick={increase}>Increase</button>
    <button onClick={decrease}>Decrease</button>
  </div>
}

function Counter(){
  const count = useRecoilValue(counterAtom);
  return <div>
    <p>Counter is {count}</p>
  </div>
}

function IsEven(){
  const isEven = useRecoilValue(eventSelector);
  return <div>
    {isEven ? "even" : "odd"}
  </div>
}
export default App




*/