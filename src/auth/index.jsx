import React, { createContext, useContext, useReducer } from "react";
import { usePersistState } from "./UsePersistedState";

const Context = createContext();

const rootReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isLogin: true,
          user: {
            username: action.payload.username,
            memberId: action.payload.memberId,
            token: action.payload.token
          }
        };
      case 'LOGOUT':
        localStorage.removeItem('token');
        localStorage.removeItem('memberId');
        return {
          ...state,
          isLogin: false,
          user: {}
        };
      default:
        return state;
    }
  };

export const StoreProvider = ({children}) => {
    const initialState = {
        isLogin: false,
        user: {},
    }

    const [persistedState, setPersistedState] = usePersistState("state", initialState)
    const [state, dispatch] = useReducer(rootReducer, persistedState)

    const globalState = {
        state,
        dispatch: (action) => {
            const newState = rootReducer(state, action);
            dispatch(action);
            setPersistedState(newState);
        },
    }

    return <Context.Provider value={globalState}>{children}</Context.Provider>
}

export const useStore = () => useContext(Context);