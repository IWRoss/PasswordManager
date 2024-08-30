const forge = require("node-forge");

// Function to generate RSA keys
function generateKeyPair() {
  const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
  const publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
  const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);
  return { publicKey, privateKey };
}

// Function to encrypt data with a public key
function encryptWithPublicKey(data) {
  const publicKey = process.env.REACT_APP_PUBLIC_KEY.replace(/\\n/g, "\n");
  const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
  const encrypted = publicKeyObj.encrypt(data, "RSA-OAEP");
  return forge.util.encode64(encrypted);
}

// Function to decrypt data with a private key
function decryptWithPrivateKey(encryptedData) {
  const privateKey = process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, "\n");
  const privateKeyObj = forge.pki.privateKeyFromPem(privateKey);
  const encrypted = forge.util.decode64(encryptedData);
  const decrypted = privateKeyObj.decrypt(encrypted, "RSA-OAEP");
  return decrypted;
}

export { generateKeyPair, encryptWithPublicKey, decryptWithPrivateKey };
