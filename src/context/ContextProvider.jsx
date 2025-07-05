import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

export let Context = createContext(null)

const ContextFunction = ({ children }) => {
    const [user, setUser] = useState({})
    let navigate = useNavigate()

    let value = {
        user,
        setUser
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export let Global = () => {
    return useContext(Context)
}

export default ContextFunction;