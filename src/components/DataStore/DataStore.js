import { useState } from "react";

function DataStore({}){
    
    const [usernameData, setUsernameData] = useState("");
    const [passwordData, setPasswordData] = useState("");

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
        </> 
    )
}
export default DataStore;