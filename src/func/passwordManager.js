//user databases
let userData = []; //[username, password]
let employeeData = []; //[username, password, accessTier]

//data databases
let LowTierData = [];
let MidTierData = [];
let HighTierData = [];

//Login Info
loggedUsername = "None";
loggedPassword = "None";
loggedAccess = "None";

//toggle vars
let userLoggedIn = false;

function promoteEmployee(EmployeeID) {
  //Debug method - increase access level
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

function demoteEmployee(EmployeeID) {
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
function registerEmployee(EmployeeID, password) {
  let found = false;
  for (let i = 0; i < employeeData.length; i++) {
    if (employeeData[i][0] == EmployeeID) {
      //is the entered username already in the employee database?
      found = true;
    }
  }
  if (found == false) {
    employeeData.push([EmployeeID, password, "None"]); //if not, add them to database.
  }
}
function logIn(EmployeeID, password) {
  let found = false;
  for (let i = 0; i < employeeData.length; i++) {
    if (employeeData[i][0] == EmployeeID) {
      if (employeeData[i][1] == password){
        found = true;
        let index = i;
      }
    }
  }
  if (found == true) {
    userLoggedIn = true;
    loggedUsername = employeeData[index][0];
    loggedPassword = employeeData[index][1];
    loggedAccess = employeeData[index][2];
  }
}

function logOut() {
  if (userLoggedIn) {
    userLoggedIn = false;
    loggedUsername = "None";
    loggedPassword = "None";
    loggedAccess = "None";
  }
}

function addLowLevelData(username, password) {
  if (loggedAccess != "None") {
    LowTierData.push([username, password]);
  }
}

function addMidLevelData(username, password) {
  if (loggedAccess != ("None" || "Low")) {
    MidTierData.push([username, password]);
  }
}

function addHighLevelData(username, password) {
  if (loggedAccess == ("High" || "Master")) {
    HighTierData.push([username, password]);
  }
}

function removeLowLevelData(username, password) {
  const index = LowTierData.indexOf([username, password]);
  if (index > -1) {
    if (loggedAccess != "None") {
      LowTierData.splice(index, 1);
    }
  }
}

function removeMidLevelData(username) {
  const index = MidTierData.indexOf([username, password]);
  if (index > -1) {
    if (loggedAccess != ("None" || "Low")) {
      MidTierData.splice(index, 1);
    }
  }
}

function removeHighLevelData(username) {
  const index = HighTierData.indexOf([username, password]);
  if (index > -1) {
    if (loggedAccess == ("High" || "Master")) {
      HighTierData.splice(index, 1);
    }
  }
}

function accessLowLevelData() {
  if (loggedAccess != "None") {
    return LowTierData;
  }
}

function accessMidLevelData() {
  if (loggedAccess != ("None" || "Low")) {
    return MidTierData;
  }
}

function accessHighLevelData() {
  if (loggedAccess == ("High" || "Master")) {
    return HighTierData;
  }
}

export {
  promoteEmployee,
  demoteEmployee,
  registerEmployee,
  logIn,
  logOut,
  addLowLevelData,
  addMidLevelData,
  addHighLevelData,
  removeLowLevelData,
  removeMidLevelData,
  removeHighLevelData,
  accessLowLevelData,
  accessMidLevelData,
  accessHighLevelData,
};
