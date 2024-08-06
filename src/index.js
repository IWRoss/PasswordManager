import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";

import { FirestoreProvider } from "./contexts/FirestoreProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { MainMenuProvider } from "./contexts/MainMenuContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirestoreProvider>
      <AuthProvider>
        <MainMenuProvider>
          <App />
        </MainMenuProvider>
      </AuthProvider>
    </FirestoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
