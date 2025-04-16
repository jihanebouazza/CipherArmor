import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSecurity } from "./SecurityContext";

const PasswordContext = createContext();

function PasswordProvider({ children }) {
  const { sessionNonce } = useSecurity();
  const [passwords, setPasswords] = useState([]);

  // Clear passwords when session changes
  useEffect(() => {
    setPasswords([]);
  }, [sessionNonce]);

  const value = useMemo(
    () => ({
      passwords,
      setPasswords,
    }),
    [passwords],
  );

  return (
    <PasswordContext.Provider value={value}>
      {children}
    </PasswordContext.Provider>
  );
}

function usePassword() {
  const context = useContext(PasswordContext);
  if (context === undefined)
    throw new Error("Password Context was used outside of Password Provider.");
  return context;
}
export { PasswordProvider, usePassword };
