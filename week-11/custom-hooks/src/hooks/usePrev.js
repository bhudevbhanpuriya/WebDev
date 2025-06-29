import { useEffect,useRef } from "react";

export function usePrev(value){
    const ref = useRef(-1);

    useEffect(()=>{
        ref.current = value;
    },[value])

    return ref.current;
}