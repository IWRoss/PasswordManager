import { useState } from "react";

import Login from "../Login/Login";

import "./App.css";

import { useAuth } from "../../contexts/AuthContext";
import DataStore from "../DataStore/DataStore";

function App() {

  const {auth} = useAuth();


  return (
    <div className="App">
      {auth.isAuthorised ? <DataStore/>: <Login/>}
    </div>
  );
}

export default App;
