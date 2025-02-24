import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const SecurityContext = createContext();

function SecurityProvider({ children }) {
  const [encryptionKey, setEncryptionKey] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const lockTimer = useRef(null);
  const [sessionNonce, setSessionNonce] = useState(0); // Add nonce

  const resetLockTimer = useCallback(() => {
    if (lockTimer.current) clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => {
      setEncryptionKey(null);
      setIsUnlocked(false);
      setSessionNonce((prev) => prev + 1); // Invalidate session
    }, 900000); // 15 minutes
  }, []);

  const initializeSession = useCallback(
    (key) => {
      setEncryptionKey(key);
      setIsUnlocked(true);
      setSessionNonce((prev) => prev + 1); // New session version
      resetLockTimer();
    },
    [setEncryptionKey, resetLockTimer],
  );

  const getEncryptionKey = useCallback(() => {
    if (!encryptionKey) throw new Error("Session expired.");
    resetLockTimer();
    return encryptionKey;
  }, [encryptionKey, resetLockTimer]);

  useEffect(() => {
    return () => clearTimeout(lockTimer.current);
  }, [lockTimer]);

  return (
    <SecurityContext.Provider
      value={{ initializeSession, getEncryptionKey, isUnlocked, sessionNonce }}
    >
      {children}
    </SecurityContext.Provider>
  );
}
function useSecurity() {
  const context = useContext(SecurityContext);
  if (context === undefined)
    throw new Error("Security Context was used outside of Security Provider.");
  return context;
}

export { SecurityProvider, useSecurity };
