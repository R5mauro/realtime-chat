import React, { createContext, useReducer } from 'react'
import userReducer from '../reducer/userReducer';
import { TemporalUserContextType } from '../types/types';

const user = {
  name: "",
  id: ""
}
export const initialState = {
  user,
  dispatch: () => { }
}


export const UserContext = createContext<TemporalUserContextType>(initialState)

export const UserProvider = ({ children }: any) => {
  const [user, dispatch] = useReducer(userReducer, initialState.user)
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}
