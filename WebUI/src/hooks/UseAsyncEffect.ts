import { useEffect } from "react";

// more convenient way to trigger an asynchronous effect, but does not return a cleanup function.
export function useAsyncEffect(effectCallback: () => Promise<void | (() => void | undefined)>, deps?: any[]) {
    // since this is a dynamic hook we cannot verify the dependencies statically
    // eslint-disable-next-line
    useEffect(() => { effectCallback(); }, deps);
}