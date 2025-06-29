import { useState, useEffect } from "react";

export function useFetch(url){

    const [data,setData] = useState({});
    const[load,setLoad] = useState(true);

    async function getData(){
        setLoad(true);
        const res = await fetch(url)
        const json = await res.json()
        setData(json);
        setLoad(false);
    }

    useEffect(()=>{
        getData()
    },[url])

    return {
        data : data,
        load : load
    }
}