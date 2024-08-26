import { useState, useEffect } from "react";

export const usePersistState = (key, initialState) => {
    const [state, setState] = useState(() => {
        const storedState = localStorage.getItem(key);
        return storedState ? JSON.parse(storedState) : initialState;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [key, state]);
    
    const setPersistState = (newState) => {
        setState(prevState => {
            const updatedState = typeof newState === 'function' ? newState(prevState) : newState;
            localStorage.setItem(key, JSON.stringify(updatedState))
            return updatedState;
        });
    };

    return [state, setPersistState];
};