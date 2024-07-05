import { useState } from "react";
import { useMainMenu } from "../../contexts/MainMenuContext";

function DataStore({}){
    
    const [usernameData, setUsernameData] = useState("");
    const [passwordData, setPasswordData] = useState("");

    const {addHighLevelData, addMidLevelData, addLowLevelData, accessHighLevelData, accessLowLevelData, accessMidLevelData, removeHighLevelData, removeLowLevelData, removeMidLevelData, promoteEmployee, demoteEmployee} = useMainMenu();

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

            <div>
                <button onClick={() => promoteEmployee(usernameData, passwordData)}>[DEBUG] Increase access level</button>
                <button onClick={() => demoteEmployee(usernameData, passwordData)}>[DEBUG] Decrease access level</button>
            </div>
        </> 
        
    )
}
export default DataStore;