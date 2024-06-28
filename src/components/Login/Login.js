import { useState } from "react";

function Login({ auth, login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

      <button onClick={() => login(username, password)}>Login</button>
    </>
  );
}

export default Login;
