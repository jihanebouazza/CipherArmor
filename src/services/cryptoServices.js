export function generateSalt() {
  return window.crypto.getRandomValues(new Uint8Array(16)).toString();
}

export async function deriveKey(password, salt, kdfParams = { iterations: 100000 }) {
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );

  const derivedKey = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: kdfParams.iterations,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );

  return {
    key: derivedKey,
    keyVerifier: bufferToHex(derivedKey.slice(0, 32)),
    kdfParams
  };
}

function bufferToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}