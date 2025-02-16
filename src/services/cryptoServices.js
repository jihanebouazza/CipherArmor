export function generateSalt() {
  return bufferToHex(crypto.getRandomValues(new Uint8Array(32)));
}

export async function deriveKey(password, salt, kdfParams = {
  algorithm: 'PBKDF2',
  hash: 'SHA-256',
  iterations: 310000,
  version: 'v2'
}) {
  const encoder = new TextEncoder();
  const saltBuffer = hexToBuffer(salt);
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );

  const derivedKey = await crypto.subtle.deriveBits(
    {
      name: kdfParams.algorithm,
      salt: saltBuffer,
      iterations: kdfParams.iterations,
      hash: { name: kdfParams.hash },
    },
    keyMaterial,
    512
  );

  const keyBytes = new Uint8Array(derivedKey);
  return {
    encryptionKey: keyBytes.slice(0, 32),
    verificationKey: bufferToHex(keyBytes.slice(32)),
    kdfParams
  };
}

export function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

export function hexToBuffer(hexString) {
  return new Uint8Array(hexString.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16)));
}