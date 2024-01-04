import { createContext, useReducer, ReactNode, Dispatch } from "react";
import reducer, {Action, initState, State} from "./reducer";

const Context = createContext<[State, Dispatch<Action>] | null>(null);

interface ProviderProps {
  children: ReactNode;
}

function Provider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, initState);
  const contextValue: [State, Dispatch<Action>] = [state, dispatch];

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}

export { Context };
export default Provider;
