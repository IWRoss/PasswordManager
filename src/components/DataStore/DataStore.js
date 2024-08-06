import { useState } from "react";

import { useFirestore } from "../../contexts/FirestoreContext";

import { useMainMenu } from "../../contexts/MainMenuContext";
import { useAuth } from "../../contexts/AuthContext";

function DataStore({}) {
  const { logoutWithGoogle, isAdmin } = useFirestore();

  const [usernameData, setUsernameData] = useState("");
  const [passwordData, setPasswordData] = useState("");

  const { logOut } = useAuth();
  const {
    addHighLevelData,
    addMidLevelData,
    addLowLevelData,
    accessHighLevelData,
    accessLowLevelData,
    accessMidLevelData,
    removeHighLevelData,
    removeLowLevelData,
    removeMidLevelData,
    promoteEmployee,
    demoteEmployee,
  } = useMainMenu();

  return (
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

      <div>
        <button onClick={() => logoutWithGoogle()}>Log Out</button>
      </div>

      <div>
        <button onClick={() => addLowLevelData(usernameData, passwordData)}>
          Add to Low Level Data
        </button>

        <button onClick={() => addMidLevelData(usernameData, passwordData)}>
          Add to Mid Level Data
        </button>

        <button onClick={() => addHighLevelData(usernameData, passwordData)}>
          Add to High Level Data
        </button>
      </div>

      <div>
        <button onClick={() => removeLowLevelData(usernameData, passwordData)}>
          Remove from Low Level Data
        </button>

        <button onClick={() => removeMidLevelData(usernameData, passwordData)}>
          Remove from Mid Level Data
        </button>

        <button onClick={() => removeHighLevelData(usernameData, passwordData)}>
          Remove from High Level Data
        </button>
      </div>

      <div>
        <button onClick={() => promoteEmployee(usernameData, passwordData)}>
          [DEBUG] Increase access level
        </button>
        <button onClick={() => demoteEmployee(usernameData, passwordData)}>
          [DEBUG] Decrease access level
        </button>
      </div>

      {isAdmin && <p>Current user is an admin.</p>}
    </>
  );
}
export default DataStore;
