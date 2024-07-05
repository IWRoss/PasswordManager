import { useState } from "react";
import { useMainMenu } from "../../contexts/MainMenuContext";

function DataStore({}){
    
    const [usernameData, setUsernameData] = useState("");
    const [passwordData, setPasswordData] = useState("");

    const {addHighLevelData, addMidLevelData, addLowLevelData, accessHighLevelData, accessLowLevelData, accessMidLevelData, removeHighLevelData, removeLowLevelData, removeMidLevelData} = useMainMenu();

    return(
        <>
            <div>
                <h2>Datastore</h2>

                <p>Username to Add</p>

                <input
                    onChange={(e) => {
                        setUsernameData(e.target.value);
                    }}
                    value={usernameData}
                    type="text"
                />

                <p>Password to Add</p>

                <input
                    onChange={(e) => {
                        setPasswordData(e.target.value);
                    }}
                    value={passwordData}
                    type="password"
                />

            </div>

            <button onClick={() => addLowLevelData(usernameData, passwordData)}>Add to Low Level Data</button>

            <button onClick={() => addMidLevelData(usernameData, passwordData)}>Add to Mid Level Data</button>

            <button onClick={() => addHighLevelData(usernameData, passwordData)}>Add to High Level Data</button>
        </> 
    )
}
export default DataStore;