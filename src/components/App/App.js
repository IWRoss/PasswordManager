import { useState } from "react";

import Login from "../Login/Login";

import "./App.css";

function App() {
  const [auth, setAuth] = useState({
    isAuthorised: false,
    errors: [],
    username: false,
  });

  // const login = (username, password) => {
  //   if (username !== "admin" || password !== "password") {
  //     setAuth({
  //       ...auth,
  //       isAuthorised: false,
  //       username: false,
  //       errors: ["Credentials not correct"],
  //     });
  //     return;
  //   }

  //   setAuth({
  //     ...auth,
  //     isAuthorised: true,
  //     username: username,
  //   });
  // };

  return (
    <div className="App">
      <Login 
        auth={auth} 
        //login={login} 
      />
    </div>
  );
}

export default App;
