// Define types for ciphertext
export interface CipherText {
  iv: string; // Base64-encoded IV
  data: string; // Base64-encoded encrypted string
}

// Base64 pre-generated key (replace with an environment variable if needed)
const preGeneratedKeyBase64 = import.meta.env.VITE_ENCRYPTION_KEY;

// Helper function to import a symmetric key
const importKey = async (): Promise<CryptoKey> => {
  const rawKey = Uint8Array.from(atob(preGeneratedKeyBase64), (char) => char.charCodeAt(0));

  return await window.crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-GCM" },
    true,
    ["encrypt"]
  );
};

// Encrypt function
export const encryptData = async (plaintext: string): Promise<CipherText> => {
  try {
    const key = await importKey();
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Generate a random IV

    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      data
    );

    return {
      iv: btoa(String.fromCharCode(...iv)),
      data: btoa(String.fromCharCode(...new Uint8Array(encryptedData))),
    };
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Failed to encrypt data.");
  }
};
