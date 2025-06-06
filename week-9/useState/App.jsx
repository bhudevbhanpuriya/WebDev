import { useState } from 'react';

function App() {

  return (
    <div>
      <h1>React Hooks</h1>
      <Counter />
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(count + 1);
  }

  function decreaseCount() {
    setCount(count - 1);
  }

  function resetCount() {
    setCount(0);
  }

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={increaseCount}>Increase Count</button>

      <button onClick={decreaseCount}>Decrease Count</button>
      
      <button onClick={resetCount}>Reset Count</button>
    </div>
  )
}

export default App;





// import { useState, useEffect } from "react";

// function App() {
//     return (
//         <div>
//             <h1>React Hooks</h1>
//             <Counter />
//         </div>
//     );
// }

// function Counter() {
//     const [count, setCount] = useState(1);

//     useEffect(() => {
//         setInterval(() => {
//             setCount(function (count) {
//                 return count + 1;
//             });
//         }, 1000);

//         console.log("Mounted");
//     }, []); 


//   return (
//       <div>
//         {count}
//       </div>
//   );
// }

// export default App;


