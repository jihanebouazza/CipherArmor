import ContainerLoader from "../../ui/ContainerLoader";
import { useUser } from "../authentication/useUser";
import AddMasterPassword from "./AddMasterPassword";
import MasterPassword from "./MasterPassword";
import { useSecretStatus } from "./useSecretStatus";
import PasswordTable from "../passwords/PasswordTable";
import { useSecurity } from "../../contexts/SecurityContext";
import { PasswordProvider } from "../../contexts/PasswordContext";

function PasswordsGate() {
  const { isPending: isPendingUser, user } = useUser();
  const { hasMasterPassword, isPending } = useSecretStatus(user?.id);
  const { isUnlocked } = useSecurity();
  if (isPending || isPendingUser) return <ContainerLoader />;

  return isUnlocked ? (
    <PasswordProvider>
      <PasswordTable />
    </PasswordProvider>
  ) : hasMasterPassword ? (
    <MasterPassword />
  ) : (
    <AddMasterPassword />
  );
}

export default PasswordsGate;
