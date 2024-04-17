import {useState, createContext} from 'react'

export const AuthContext = createContext();


// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children})=>{

const [user, setUser] = useState(null);
const [Authorized, setAuthorized] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);

const values ={
    user,
    setUser,
    Authorized,
    setAuthorized,
    isLoggedIn,
    setIsLoggedIn
}


    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

