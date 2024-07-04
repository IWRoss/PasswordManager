import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";




function Login({ auth, login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {userData, logIn, registerEmployee} = useAuth();

  if (auth.isAuthorised) {
    return <p>Authorised</p>;
  }

  return (
    <>
      <div>
        <h2>Login</h2>

        <p>Username</p>

        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          type="text"
        />

        <p>Password</p>

        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
        />
      </div>

      {auth.errors.map((error) => (
        <p>{error}</p>
      ))}

      <button onClick={() => registerEmployee(username, password)}>Register</button>

      <button onClick={() => logIn(username, password)}>Login</button>
    </>
  );
}

export default Login;
