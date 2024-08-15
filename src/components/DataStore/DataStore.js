import { useEffect, useState } from "react";

import { useFirestore } from "../../contexts/FirestoreContext";

import { useMainMenu } from "../../contexts/MainMenuContext";
import { useAuth } from "../../contexts/AuthContext";

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

      {/* <div>
        <button onClick={() => {
          removeLowLevelData(usernameData, passwordData)
          setUsernameData("")
          setPasswordData("")
        }}>
          Remove from Low Level Data
        </button>

        <button onClick={() => {
          removeMidLevelData(usernameData, passwordData)
          setUsernameData("")
          setPasswordData("")
        }}>
          Remove from Mid Level Data
        </button>

        <button onClick={() => {
          removeHighLevelData(usernameData, passwordData)
          setUsernameData("")
          setPasswordData("")
        }}>
          Remove from High Level Data
        </button>
      </div> */}

      <div>
        <button onClick={() => promoteEmployee(usernameData)}>
          [DEBUG] Increase access level
        </button>
        <button onClick={() => demoteEmployee(usernameData)}>
          [DEBUG] Decrease access level
        </button>
      </div>

      <div>
        {lowTierData &&
          lowTierData.map((el, i) => (
            <p key={i}>
              {el.username}: {el.password}{" "}
              <button
                onClick={() => {
                  removeLowLevelData(el.username, el.password);

                  setLowLevelData((prev) => {
                    return prev.filter((item) => item.username !== el.username);
                  });
                }}
              >
                Remove
              </button>
            </p>
          ))}
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
          Toggle Low Level Data
        </button>

        {midTierData &&
          midTierData.map((el, i) => (
            <p key={i}>
              {el.username}: {el.password}{" "}
              <button onClick={removeMidLevelData(el.username, el.password)}>
                Remove
              </button>
            </p>
          ))}
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
          Toggle Mid Level Data
        </button>

        {highTierData &&
          highTierData.map((el, i) => (
            <p key={i}>
              {el.username}: {el.password}{" "}
              <button onClick={removeHighLevelData(el.username, el.password)}>
                Remove
              </button>
            </p>
          ))}
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
          Toggle High Level Data
        </button>
      </div>

      {isAdmin && <p>Current user is an admin.</p>}
    </>
  );
}
export default DataStore;
