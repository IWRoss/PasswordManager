import { useContext, useState, createContext } from "react";

export const AuthContext = createContext();

export function useAuth() { return useContext(AuthContext) };

export const AuthProvider = ({children}) => {

    // States here

    const [employeeData, setEmployeeData] = useState([]);  //[username, password, accessTier]
    const [loggedUsername, setLoggedUsername] = useState("");
    const [loggedPassword, setLoggedPassword] = useState("");
    const [loggedAccess, setLoggedAccess] = useState("");
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [auth, setAuth] = useState({
        isAuthorised: false,
        errors: [],
        username: false,    
    });

    // Functions here

    const registerEmployee = (username, password) => { //(employee username, employee password)

        if (employeeData.filter((employee) => employee[0] === username).length > 0) {
          return;
        }
    
        setEmployeeData([...employeeData, [username, password, "None"]]);       
    }

    const logIn = (username, password) => {
        let index = 0
        let found = false;
        for (let i = 0; i < employeeData.length; i++) {
            if (employeeData[i][0] === username) {
                if (employeeData[i][1] === password){
                    found = true;
                    index = i;
                }
            } 
        }
        if (found === true) {
            setUserLoggedIn(true);
            setLoggedUsername(employeeData[index][0]);
            setLoggedPassword(employeeData[index][1]);
            setLoggedAccess(employeeData[index][2]);
            setAuth({
                ...auth,
                isAuthorised: true,
                username: username,
            });
        } else {
            setAuth({
                ...auth,
                isAuthorised: false,
                username: false,
                errors: ["Credentials not correct"],
            });
        }
    }

    const logOut = () => {
        if (userLoggedIn) {
            setUserLoggedIn(false);
            setLoggedUsername("None");
            setLoggedPassword("None");
            setLoggedAccess("None");
            setAuth({
                ...auth,
                isAuthorised: false,
                username: false,
            });
        }
    }

    const setEmployeeDataByIndex = (index, key, value) => {
        const newEmployeeData = employeeData[index];
        newEmployeeData[key] = value;
        setEmployeeData([
            ...employeeData.slice(0, index-1),
            newEmployeeData,
            ...employeeData.slice(index+1)
        ])
    };

    return (
        <AuthContext.Provider value={{
            employeeData,
            setEmployeeData,
            setEmployeeDataByIndex,
            loggedUsername,
            setLoggedUsername,
            loggedPassword,
            setLoggedPassword,
            loggedAccess,
            setLoggedAccess,
            logIn,
            logOut,
            registerEmployee,
            auth,
            setAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
};