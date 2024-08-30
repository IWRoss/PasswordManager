import { useEffect, useState } from "react";

import { useFirestore } from "../../contexts/FirestoreContext";

import { useMainMenu } from "../../contexts/MainMenuContext";
import { useAuth } from "../../contexts/AuthContext";

import Credential from "../Credential/Credential";

// Import styles
import "./DataStore.css";

function DataStore({}) {
  const { logoutWithGoogle, isAdmin } = useFirestore();

  const [usernameData, setUsernameData] = useState("");
  const [passwordData, setPasswordData] = useState("");

  // Component data store
  const [lowTierData, setLowLevelData] = useState([]);
  const [midTierData, setMidLevelData] = useState([]);
  const [highTierData, setHighLevelData] = useState([]);

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
    <div className="datastore">
      <header className="header">
        <h2>Datastore</h2>
        {isAdmin && <p>Current user is an admin.</p>}
        <div>
          <button onClick={() => logoutWithGoogle()}>Log Out</button>
        </div>
      </header>

      <div className="controls">
        <div className="show">
          <h3>Show Credentials</h3>

          <div className="button-group">
            <button
              onClick={() => {
                setLowLevelData((prev) => {
                  if (prev.length) {
                    return [];
                  }

                  return accessLowLevelData();
                });
              }}
            >
              Toggle Low Level Credentials
            </button>

            <button
              onClick={() => {
                setMidLevelData((prev) => {
                  if (prev.length) {
                    return [];
                  }

                  return accessMidLevelData();
                });
              }}
            >
              Toggle Mid Level Credentials
            </button>

            <button
              onClick={() => {
                setHighLevelData((prev) => {
                  if (prev.length) {
                    return [];
                  }

                  return accessHighLevelData();
                });
              }}
            >
              Toggle High Level Credentials
            </button>
          </div>
        </div>

        <div className="add">
          <h3>Add Credentials</h3>

          <div className="form-fields">
            <div className="form-group">
              <label>Username to Add</label>

              <input
                onChange={(e) => {
                  setUsernameData(e.target.value);
                }}
                value={usernameData}
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Password to Add</label>

              <input
                onChange={(e) => {
                  setPasswordData(e.target.value);
                }}
                value={passwordData}
                type="password"
              />
            </div>
          </div>

          <div className="button-group">
            <button
              onClick={() => {
                if (usernameData !== "" && passwordData !== "") {
                  addLowLevelData(usernameData, passwordData);
                  setUsernameData("");
                  setPasswordData("");
                }
              }}
            >
              Add to Low Level Data
            </button>

            <button
              onClick={() => {
                if (usernameData !== "" && passwordData !== "") {
                  addMidLevelData(usernameData, passwordData);
                  setUsernameData("");
                  setPasswordData("");
                }
              }}
            >
              Add to Mid Level Data
            </button>

            <button
              onClick={() => {
                if (usernameData !== "" && passwordData !== "") {
                  addHighLevelData(usernameData, passwordData);
                  setUsernameData("");
                  setPasswordData("");
                }
              }}
            >
              Add to High Level Data
            </button>
          </div>
        </div>

        {isAdmin && (
          <div class="privileges">
            <h3>Privileges</h3>

            <div className="button-group">
              <button onClick={() => promoteEmployee(usernameData)}>
                [DEBUG] Increase access level
              </button>
              <button onClick={() => demoteEmployee(usernameData)}>
                [DEBUG] Decrease access level
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="data">
        <h3>Low Level Credentials</h3>
        {lowTierData.length ? (
          lowTierData.map((el, i) => (
            <Credential
              key={i}
              credential={el}
              removeAction={(el) => {
                removeLowLevelData(el.username, el.password);

                setLowLevelData((prev) => {
                  return prev.filter((item) => item.username !== el.username);
                });
              }}
            />
          ))
        ) : (
          <p>Credentials hidden or do not exist</p>
        )}

        <h3>Mid Level Credentials</h3>

        {midTierData.length ? (
          midTierData.map((el, i) => (
            <Credential
              key={i}
              credential={el}
              removeAction={(el) => {
                removeMidLevelData(el.username, el.password);

                setMidLevelData((prev) => {
                  return prev.filter((item) => item.username !== el.username);
                });
              }}
            />
          ))
        ) : (
          <p>Credentials hidden or do not exist</p>
        )}

        <h3>High Level Credentials</h3>

        {highTierData.length ? (
          highTierData.map((el, i) => (
            <Credential
              key={i}
              credential={el}
              removeAction={(el) => {
                removeHighLevelData(el.username, el.password);

                setHighLevelData((prev) => {
                  return prev.filter((item) => item.username !== el.username);
                });
              }}
            />
          ))
        ) : (
          <p>Credentials hidden or do not exist</p>
        )}
      </div>
    </div>
  );
}
export default DataStore;
