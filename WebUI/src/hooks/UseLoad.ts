import { useState, useRef, useCallback } from "react";
import { useAsyncEffect } from "./UseAsyncEffect";

// This hook will load data asynchronously with the given load function. It will also return the value as well as two flags 
// indicating whether or not the data is still being loaded or if an error occured. 
// This will be the hook to use when you want to fetch something from the backend.
export function useLoad<T>(load: () => Promise<T>, initialState: T, isDirty: boolean = true, loadedCallback: () => void = () => { }, deps: any[] = []): [T, boolean, boolean] {
    const [state, setState] = useState<T>(initialState);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const loadId = useRef(0);

    useAsyncEffect(async () => {
        if(!hasError && !isDirty)
            return;
        
        try {
            setIsLoading(true);

            // this reference is the same on every render so here we check whether or not it is still up to date
            // or if we should cancel the current load because a newer one was started
            loadId.current += 1;
            const currentLoadId = loadId.current;

            const response = await load();

            if(currentLoadId !== loadId.current)
                return;

            setState(response);
        } catch(e) {
            setHasError(true);
            setIsLoading(false);
            loadedCallback();
            throw e;
        }

        setIsLoading(false);
        setHasError(false);
        loadedCallback();
    },
    // since we spread the additional dependencies here we cannot verify the useAsyncEffect dependencies statically anymore
    // eslint-disable-next-line 
    [useCallback(load, deps), hasError, isDirty, ...deps]);

    return [state, isLoading, hasError];
}