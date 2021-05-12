import React,{ useContext, useReducer} from "react";

export const StateContext = React.createContext();
export function useStateValue() {
	return useContext(StateContext);
}
export const StateProvider = ({ reducer, initialState, children }) => {
	
	return (
		<StateContext.Provider value={useReducer(reducer,initialState)}>
			{children}
		</StateContext.Provider>
	)
}