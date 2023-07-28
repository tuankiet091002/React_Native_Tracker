import { createContext, useMemo, useReducer } from "react";

export default (reducer, actions, initialState) => {
    const Context = createContext();

    function Provider({ children }) {
        const [state, dispatch] = useReducer(reducer, initialState);

        const boundActions = {};

        Object.keys(actions).forEach((key) => {
            boundActions[key] = actions[key](dispatch);
        });


        const contextProviderValue = useMemo(
            () => ({ state, ...boundActions }),
            [state, boundActions]
        );

        return (
            <Context.Provider value={contextProviderValue}>
                {children}
            </Context.Provider>
        );
    }

    return { Context, Provider };
};
