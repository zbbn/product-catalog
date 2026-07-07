import { useEffect, useState } from 'react';

/**
 * Only updates after delayMs to prevent searching on every keystroke
 */

export function useDebounce<T>(value: T, delayMs = 300): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        /*
        * Resets the timer on every keystroke
        */
        const timeout = setTimeout(() => {
            setDebounced(value);
        }, delayMs);
        return () => {
            clearTimeout(timeout);
        };
    }, [value, delayMs]);

    return debounced;
}