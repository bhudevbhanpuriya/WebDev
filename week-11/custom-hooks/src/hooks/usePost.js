import { useEffect, useState } from 'react'


export function usePost(){
   const [post,setPost] = useState({});

  async function fetchPost(){
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1")
    const json = await response.json();
    setPost(json)
  }

  useEffect(() => {
    fetchPost();
  },[])

  return post
}