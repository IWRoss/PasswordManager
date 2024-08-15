import { useContext, useState, createContext, useEffect } from "react";

import { useDatabase } from "./DatabaseContext";
import { useAuth } from "./AuthContext";
import Loader from "../components/Loader/Loader";

export const MainMenuContext = createContext();

export function useMainMenu() {
  return useContext(MainMenuContext);
}

export const MainMenuProvider = ({ children }) => {
  //States here
  const { getItems, addItem, deleteItem } = useDatabase();

  //Internal Vars
  const [userData, setUserData] = useState([]);

  const [LowTierData, setLowTierData] = useState(false);
  const [MidTierData, setMidTierData] = useState(false);
  const [HighTierData, setHighTierData] = useState(false);

  // This will fire on component mount
  useEffect(() => {
    (async () => {
      const credentials = await getItems("credentials");

      if (!credentials) {
        setLowTierData([]);
        setMidTierData([]);
        setHighTierData([]);
        return;
      }

      setLowTierData(
        credentials.filter((credential) => credential.tier === "Low") ?? []
      );

      setMidTierData(
        credentials.filter((credential) => credential.tier === "Medium") ?? []
      );

      setHighTierData(
        credentials.filter((credential) => credential.tier === "High") ?? []
      );
    })();
  }, []);

  //const [LowTierData, setLowTierData] = useState([]);
  //const [MidTierData, setMidTierData] = useState([]);
  //const [HighTierData, setHighTierData] = useState([]);

  //Imported Vars
  const { employeeData, loggedAccess, setEmployeeDataByIndex, userLoggedIn } =
    useAuth();

  //Functions here

  const promoteEmployee = (username) => {
    if (userLoggedIn && loggedAccess === "Master") {
      for (let i = 0; i < employeeData.length; i++) {
        if (employeeData[i].username === username) {
          //is the entered username in the employee database?
          switch (employeeData[i].tier) {
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
        if (employeeData[i].username === username) {
          switch (employeeData[i].tier) {
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

  const addLowLevelData = async (username, password) => {
    if (loggedAccess !== "None") {
      // Perform action on database
      const newItemID = await addItem("credentials", {
        username,
        password,
        tier: "Low",
      });

      // Confirm action was performed on database
      if (!newItemID) {
        console.error("Didn't work");
        return;
      }

      // If so, update state
      setLowTierData([
        ...LowTierData,
        {
          username,
          password,
          tier: "Low",
          id: newItemID,
        },
      ]);
    }
  };

  const addMidLevelData = async (username, password) => {
    if (loggedAccess !== ("None" || "Low")) {
      const newItemID = await addItem("credentials", {
        username,
        password,
        tier: "Medium",
      });

      if (!newItemID) {
        console.error("Didn't work");
        return;
      }

      setMidTierData([
        ...MidTierData,
        {
          username,
          password,
          tier: "Medium",
          id: newItemID,
        },
      ]);
    }
  };

  const addHighLevelData = async (username, password) => {
    if (loggedAccess !== ("None" || "Low" || "Medium")) {
      const newItemID = await addItem("credentials", {
        username,
        password,
        tier: "High",
      });

      if (!newItemID) {
        console.error("Didn't work");
        return;
      }

      setHighTierData([
        ...HighTierData,
        {
          username,
          password,
          tier: "High",
          id: newItemID,
        },
      ]);
    }
  };

  const removeLowLevelData = async (username, password) => {
    console.log("Attempting to remove.");

    const index = LowTierData.findIndex(
      (credential) =>
        credential.username === username && credential.password === password
    );

    if (index !== -1) {
      if (loggedAccess !== "None") {
        const credential = LowTierData[index];

        await deleteItem("credentials", credential);

        console.log("Removing Data...");

        const newArr = [
          ...LowTierData.slice(0, index),
          ...LowTierData.slice(index + 1),
        ];

        setLowTierData(newArr);
      }
    }
  };

  const removeMidLevelData = async (username, password) => {
    console.log("Attempting to remove.");

    const index = MidTierData.findIndex(
      (credential) =>
        credential.username === username && credential.password === password
    );

    if (index !== -1) {
      if (loggedAccess !== "None" || "Low") {
        const credential = MidTierData[index];

        await deleteItem("credentials", credential);

        console.log("Removing Data...");

        const newArr = [
          ...MidTierData.slice(0, index),
          ...MidTierData.slice(index + 1),
        ];

        setMidTierData(newArr);
      }
    }
  };

  const removeHighLevelData = async (username, password) => {
    console.log("Attempting to remove.");

    const index = HighTierData.findIndex(
      (credential) =>
        credential.username === username && credential.password === password
    );

    if (index !== -1) {
      if (loggedAccess !== "None" || "Low" || "Medium") {
        const credential = HighTierData[index];

        await deleteItem("credentials", credential);

        console.log("Removing Data...");

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
    if (loggedAccess !== ("None" || "Low" || "Medium")) {
      return HighTierData;
    }
  };

  if (!LowTierData || !MidTierData || !HighTierData) {
    return <Loader message="Importing data..." />;
  }

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
