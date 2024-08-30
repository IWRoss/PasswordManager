import React from "react";

import "./Credential.css";

export default function Credential({ credential, key, removeAction }) {
  return (
    <div className="form-fields credential" key={key}>
      <div className="form-field">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={credential.username}
          readOnly
        />
      </div>
      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credential.password}
          readOnly
        />
      </div>
      <button
        onClick={() => navigator.clipboard.writeText(credential.password)}
      >
        Copy Password
      </button>
      <button onClick={() => removeAction(credential)}>Remove</button>
    </div>
  );
}
