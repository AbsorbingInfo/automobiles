import { createContext, useReducer, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('admin'))
    const tokenExpiration = localStorage.getItem('adminTokenExpiry');

    if (user && tokenExpiration) {
      const currentTime = Date.now();
      if (currentTime > tokenExpiration) {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('admin');
        localStorage.removeItem('tokenExpiration');
      } else {
        dispatch({ type: 'LOGIN', payload: user });
      }
    }
    setLoading(false);
  }, [])
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}