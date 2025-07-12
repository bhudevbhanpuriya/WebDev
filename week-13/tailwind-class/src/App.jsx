import { useState } from 'react'
import './App.css'

export default function App() {
  return (
    <div className="w-screen h-screen bg-blue-900 flex items-center justify-center relative">
      
      {/* Center content: "Verify Your age" */}
      <div className="text-center text-white text-4xl z-10">
        <div className='pb-30'>Verify Your age</div>
        <input type="text" color='grey-900'/>
      </div>

      {/* "Webinar.gg" and image above center */}
      <div className="pb-30 items-center text-white text-4xl font-semibold">
        <img
          src="https://imgs.search.brave.com/NnPOmP2u3OjEkUhVINh2hy-DEARmNnz5cZrmoby0lKE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL3ByZW1pdW0v/dGh1bWIvZGVza3Rv/cC1jb21wdXRlci1p/bGx1c3RyYXRpb24t/ZG93bmxvYWQtaW4t/c3ZnLXBuZy1naWYt/ZmlsZS1mb3JtYXRz/LS1tb25pdG9yLXBj/LWVsZWN0cm9uaWMt/ZGV2aWNlcy1wYWNr/LWFwcGxpYW5jZXMt/aWxsdXN0cmF0aW9u/cy05Njg1NTIwLnBu/Zz9mPXdlYnA"
          alt="Logo"
          className="w-14 h-14 object-contain mr-3"
        />
        <div className="pt-1">
          <span className='text-cyan-200'>Webinar</span>.gg
          </div>
      </div>
      
    </div>
  );
}



/*

----------------getting familiar

import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-12'>
        <div className='col-span-1 sm:col-span-5 bg-red-300 sm:bg-red-700'>
          hi
        </div>

        <div className='col-span-1 sm:col-span-5 bg-blue-300 sm:bg-blue-700'>
          hi1
        </div>

        <div className='col-span-1 sm:col-span-2 bg-green-300 sm:bg-green-700'>
          hi2
        </div>
      </div>

    </>
  )
}

export default App

*/