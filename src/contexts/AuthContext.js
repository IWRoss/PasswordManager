import { useContext, useState, createContext } from "react";

export const AuthContext = createContext();

export const useAuth = useContext(AuthContext);

export const AuthProvider = ({children}) => {

    const [userData, setUserData] = useState([]);

    return (
        <AuthContext.Provider value={{
            userData,
            setUserData
        }}>
            {children}
        </AuthContext.Provider>
    )

};


 ;