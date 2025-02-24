export function generateSalt() {
  return bufferToHex(crypto.getRandomValues(new Uint8Array(32)));
}

export async function deriveKey(
  password,
  salt,
  kdfParams = {
    algorithm: "PBKDF2",
    hash: "SHA-256",
    iterations: 310000,
    version: "v2",
  },
) {
  const encoder = new TextEncoder();
  const saltBuffer = hexToBuffer(salt);

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const derivedKey = await crypto.subtle.deriveBits(
    {
      name: kdfParams.algorithm,
      salt: saltBuffer,
      iterations: kdfParams.iterations,
      hash: { name: kdfParams.hash },
    },
    keyMaterial,
    512,
  );

  const keyBytes = new Uint8Array(derivedKey);
  return {
    encryptionKey: keyBytes.slice(0, 32),
    verificationKey: bufferToHex(keyBytes.slice(32)),
    kdfParams,
  };
}

export function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer)).reduce(
    (str, byte) => str + byte.toString(16).padStart(2, "0"),
    "",
  );
}

export function hexToBuffer(hexString) {
  if (hexString === undefined) {
    throw new Error("Crypto operation failed: Missing required parameters");
  }

  const safeHex = hexString ?? "";
  return new Uint8Array(
    safeHex.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16)),
  );
}

export async function encryptData(data, encryptionKey) {
  try {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const algorithm = { name: "AES-GCM", iv };
    const encodedData = new TextEncoder().encode(JSON.stringify(data));

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      encryptionKey,
      "AES-GCM",
      false,
      ["encrypt"],
    );

    const ciphertext = await crypto.subtle.encrypt(
      algorithm,
      cryptoKey,
      encodedData,
    );

    return {
      iv: bufferToHex(iv),
      ciphertext: bufferToHex(new Uint8Array(ciphertext)),
    };
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Failed to encrypt data");
  }
}

export async function decryptData(encryptedData, encryptionKey) {
  try {
    const algorithm = {
      name: "AES-GCM",
      iv: hexToBuffer(encryptedData.iv),
    };

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      encryptionKey,
      "AES-GCM",
      false,
      ["decrypt"],
    );

    const decrypted = await crypto.subtle.decrypt(
      algorithm,
      cryptoKey,
      hexToBuffer(encryptedData.ciphertext),
    );

    return JSON.parse(new TextDecoder().decode(decrypted));
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Failed to decrypt data. Invalid key or corrupted data.");
  }
}
