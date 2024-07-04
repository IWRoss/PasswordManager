import { useContext, useState, createContext, useMemo } from "react";

import { useAuth } from "./AuthContext";

export const MainMenuContext = createContext();

export const UseMainMenu = useContext(MainMenuContext);

export const MainMenuProvider = ({children}) => {
    //States here

    //Internal Vars
    const [userData, setUserData] = useState([]);
    const [LowTierData, setLowTierData] = useState([]);
    const [MidTierData, setMidTierData] = useState([]);
    const [HighTierData, setHighTierData] = useState([]);

    //Imported Vars
    const {employeeData} = useAuth();
    const {loggedAccess} = useAuth();

    //Functions here

    const promoteEmployee = (username) => {
        if (userLoggedIn) {
            for (let i = 0; i < employeeData.length; i++) {
                if (employeeData[i][0] == EmployeeID) { 
                    //is the entered username in the employee database?
                    if (employeeData[i][2] == "None") {
                    employeeData[i][2] = "Low";
                    } else if (employeeData[i][2] == "Low") {
                    employeeData[i][2] = "Medium";
                    } else if (employeeData[i][2] == "Medium") {
                    employeeData[i][2] = "High";
                    } else if (employeeData[i][2] == "High") {
                    employeeData[i][2] = "Master";
                    }
                }
            }
        }    
    }

    const demoteEmployee = (username) => {
        //Debug method - decrease access level
        if (userLoggedIn) {
            for (let i = 0; i < employeeData.length; i++) {
                if (employeeData[i][0] == EmployeeID) {
                    //is the entered username in the employee database?
                    if (employeeData[i][2] == "Low") {
                    employeeData[i][2] = "None";
                    } else if (employeeData[i][2] == "Medium") {
                    employeeData[i][2] = "Low";
                    } else if (employeeData[i][2] == "High") {
                    employeeData[i][2] = "Medium";
                    } else if (employeeData[i][2] == "Master") {
                    employeeData[i][2] = "High";
                    }
                }
            }
        }
    }

    const addLowLevelData = (username, password) => {
        if (loggedAccess != "None") {
            LowTierData.push([username, password]);
        }
    }

    const addMidLevelData = (username, password) => {
        if (loggedAccess != ("None" || "Low")) {
            MidTierData.push([username, password]);
        }
    }

    const addHighLevelData = (username, password) => {
        if (loggedAccess == ("High" || "Master")) {
            setHighTierData([
                ...HighTierData,
                [username, password]
            ]);
        }
    }

    const removeLowLevelData = (username, password) => {
        const index = LowTierData.indexOf([username, password]);
        if (index > -1) {
            if (loggedAccess != "None") {
                LowTierData.splice(index, 1);
                setLowTierData(Object.values(LowTierData.filter((value, i) => {
                    return index !== i;
                })))
            }
        }
    }

    const removeMidLevelData = (username, password) => {
        const index = MidTierData.indexOf([username, password]);
        if (index > -1) {
            if (loggedAccess != ("None" || "Low")) {
                MidTierData.splice(index, 1);
            }
        }
    }

    const removeHighLevelData = (username, password) => {
        const index = HighTierData.indexOf([username, password]);
        if (index > -1) {
            if (loggedAccess == ("High" || "Master")) {
                HighTierData.splice(index, 1);
            }
        }
    }

    const accessLowLevelData = () => {
        if (loggedAccess != "None") {
            return LowTierData;
        }
    }

    const accessMidLevelData = () => {
        if (loggedAccess != ("None" || "Low")) {
            return MidTierData;
        }
    }

    const accessHighLevelData = () => {
        if (loggedAccess == ("High" || "Master")) {
            return HighTierData;
        }
    }


    return (
        <MainMenuContext.Provider value={{
            userData,
            setUserData,
            LowTierData,
            setLowTierData,
            MidTierData,
            setMidTierData,
            HighTierData,
            setHighTierData
        }}>
            {children}
        </MainMenuContext.Provider>

    )
}