import { useState } from 'react'

import './App.css'

import {useFetch} from './hooks/usefetch'
import { usePrev } from './hooks/usePrev'


function App() {
  const [cnt,setCnt] = useState(0)
  const prev = usePrev(cnt);

  function increase(){
    setCnt(curr => curr+1);
  }
  return <>
  <p>{cnt}</p>
  <div>
  <button onClick={increase}>Increase</button>
  </div>
  <div>
    The previous value was {prev}
  </div>
  </>
}

export default App


/*

counter example

function useCounter(){
  const [count, setCount] = useState(0)

  function increase(){
    setCount(c=>c+1);
  }
  return {
    count : count,
    increase : increase
  }
}

function App() {
  
  const {count,increase} = useCounter();

  return <>
  
  <button onClick={increase}>
    increase {count}
  </button>
  
  </>
}

function App() {
  const [curr,setCurr] = useState(1);
  const {data,load} = useFetch('https://jsonplaceholder.typicode.com/todos/' + curr);

  if(load){
    return <div>
      Loading...
    </div>
  }


  return <>
   <div>
    <button onClick={()=> setCurr(1)}>1</button>
    <button onClick={()=> setCurr(2)}>2</button>
    <button onClick={()=> setCurr(3)}>3</button>
  </div>
  <div>
    {JSON.stringify(data)};
  </div>
  </>
}

export default App



*/