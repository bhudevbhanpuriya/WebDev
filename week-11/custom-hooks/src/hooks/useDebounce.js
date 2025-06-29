import {useRef} from "react";

export function useDebounce(orignalFn){
    const currentClock = useRef();

    const fn = () => {
        clearTimeout(currentClock.current);
        currentClock.current = setTimeout(orignalFn,5000);
    }
    return fn;
}