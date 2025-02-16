import { SecurityProvider } from "../contexts/SecurityContext";
import PasswordsGate from "../features/masterPassword/PasswordsGate";

function Passwords() {
  return (
    <SecurityProvider>
      <PasswordsGate />
    </SecurityProvider>
  );
}

export default Passwords;
