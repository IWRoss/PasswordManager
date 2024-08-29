function encryptPrivateKey(password) {
  const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  nodeRSA.encrypt({ password, privateKey });
}

function decryptPrivateKey(password) {
  const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  nodeRSA.decryptStringWithRsaPrivateKey({ password, privateKey });
}

function encryptData(password, publicKey) {
  const encryptedString = nodeRSA.encryptStringWithRsaPublicKey({
    password,
    publicKey,
  });
  return encryptPrivateKey(encryptedString);
}

function decryptPublicKey(password, publicKey) {
  let newpassword = nodeRSA.decrypt({ password, publicKey });
  return decryptPrivateKey(newpassword);
}

export { encryptData, encryptPrivateKey, decryptPublicKey, decryptPrivateKey };
