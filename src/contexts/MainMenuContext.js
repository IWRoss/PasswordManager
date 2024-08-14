import { useContext, useState, createContext } from "react";

import { useAuth } from "./AuthContext";

export const MainMenuContext = createContext();

export function useMainMenu() {
  return useContext(MainMenuContext);
}

export const MainMenuProvider = ({ children }) => {
  //States here

  //Internal Vars
  const [userData, setUserData] = useState([]);
  const [LowTierData, setLowTierData] = useState([]);
  const [MidTierData, setMidTierData] = useState([]);
  const [HighTierData, setHighTierData] = useState([]);

  //Imported Vars
  const { employeeData, loggedAccess, setEmployeeDataByIndex, userLoggedIn } =
    useAuth();

  //Functions here

  const promoteEmployee = (username) => {
    if (userLoggedIn && loggedAccess === "Master") {
      for (let i = 0; i < employeeData.length; i++) {
        if (employeeData[i][0] === username) {
          //is the entered username in the employee database?
          switch (employeeData[i][2]) {
            case "High":
              setEmployeeDataByIndex(i, 2, "Master");
              break;
            case "Medium":
              setEmployeeDataByIndex(i, 2, "High");
              break;
            case "Low":
              setEmployeeDataByIndex(i, 2, "Medium");
              break;
            default:
              setEmployeeDataByIndex(i, 2, "Low");
              break;
          }
        }
      }
    }
  };

  const demoteEmployee = (username) => {
    //Debug method - decrease access level
    if (userLoggedIn && loggedAccess === "Master") {
      for (let i = 0; i < employeeData.length; i++) {
        if (employeeData[i][0] === username) {
          switch (employeeData[i][2]) {
            case "Master":
              setEmployeeDataByIndex(i, 2, "High");
              break;
            case "High":
              setEmployeeDataByIndex(i, 2, "Medium");
              break;
            case "Medium":
              setEmployeeDataByIndex(i, 2, "Low");
              break;
            default:
              setEmployeeDataByIndex(i, 2, "None");
              break;
          }
        }
      }
    }
  };

  const addLowLevelData = (username, password) => {
    if (loggedAccess !== "None") {
      setLowTierData([...LowTierData, [username, password]]);
    }
  };

  const addMidLevelData = (username, password) => {
    if (loggedAccess !== ("None" || "Low")) {
      setMidTierData([...MidTierData, [username, password]]);
    }
  };

  const addHighLevelData = (username, password) => {
    if (loggedAccess === ("High" || "Master")) {
      setHighTierData([...HighTierData, [username, password]]);
    }
  };

  const removeLowLevelData = (username, password) => {
    console.log("Attempting to remove.");

    const index = LowTierData.findIndex(
      (credential) => credential[0] === username && credential[1] === password
    );

    if (index !== -1) {
      if (loggedAccess !== "None") {
        console.log("Removing Data...");
        const newArr = [
          ...LowTierData.slice(0, index),
          ...LowTierData.slice(index + 1),
        ];
        setLowTierData(newArr);
      }
    }
  };

  const removeMidLevelData = (username, password) => {
    const index = MidTierData.indexOf([username, password]);
    if (index !== -1) {
      if (loggedAccess !== ("None" || "Low")) {
        const newArr = [
          ...MidTierData.slice(0, index),
          ...MidTierData.slice(index + 1),
        ];
        setMidTierData(newArr);
      }
    }
  };

  const removeHighLevelData = (username, password) => {
    const index = HighTierData.indexOf([username, password]);
    if (index !== -1) {
      if (loggedAccess === ("High" || "Master")) {
        const newArr = [
          ...HighTierData.slice(0, index),
          ...HighTierData.slice(index + 1),
        ];
        setHighTierData(newArr);
      }
    }
  };

  const accessLowLevelData = () => {
    if (loggedAccess !== "None") {
      return LowTierData;
    }
  };

  const accessMidLevelData = () => {
    if (loggedAccess !== ("None" || "Low")) {
      return MidTierData;
    }
  };

  const accessHighLevelData = () => {
    if (loggedAccess === ("High" || "Master")) {
      return HighTierData;
    }
  };

  return (
    <MainMenuContext.Provider
      value={{
        userData,
        setUserData,
        LowTierData,
        setLowTierData,
        MidTierData,
        setMidTierData,
        HighTierData,
        setHighTierData,
        promoteEmployee,
        demoteEmployee,
        addLowLevelData,
        addMidLevelData,
        addHighLevelData,
        removeLowLevelData,
        removeMidLevelData,
        removeHighLevelData,
        accessLowLevelData,
        accessMidLevelData,
        accessHighLevelData,
      }}
    >
      {children}
    </MainMenuContext.Provider>
  );
};
