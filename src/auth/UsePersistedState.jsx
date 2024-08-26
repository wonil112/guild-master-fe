import { useState, useEffect } from "react";

export const usePersistState = (key, initialState) => {
    const [state, setState] = useState(() => {
        const storedState = localStorage.getItem(key);
        return storedState ? JSON.parse(storedState) : initialState;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [key, state]);
    const changeStore = (change) => {
        setState(change)
    }

    return [state, changeStore];
};