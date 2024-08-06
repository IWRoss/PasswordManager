import { useState } from "react";

import Login from "../Login/Login";

import "./App.css";

import { useFirestore } from "../../contexts/FirestoreProvider";
import { useAuth } from "../../contexts/AuthContext";
import DataStore from "../DataStore/DataStore";

function App() {
  // const { auth } = useAuth();

  const { isAuthorised } = useFirestore();

  return <div className="App">{isAuthorised ? <DataStore /> : <Login />}</div>;
}

export default App;
