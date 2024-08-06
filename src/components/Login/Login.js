import { useState } from "react";

import { useFirestore } from "../../contexts/FirestoreProvider";

import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const { loginWithGoogle } = useFirestore();

  return (
    <>
      <div>
        <h2>Login</h2>
        <button onClick={() => loginWithGoogle()}>Login with Google</button>
      </div>
    </>
  );
}

export default Login;
