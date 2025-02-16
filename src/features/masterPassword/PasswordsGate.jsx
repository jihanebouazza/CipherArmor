import { useState } from "react";
import ContainerLoader from "../../ui/ContainerLoader";
import { useUser } from "../authentication/useUser";
import AddMasterPassword from "./AddMasterPassword";
import MasterPassword from "./MasterPassword";
import { useSecretStatus } from "./useSecretStatus";
import PasswordTable from "../passwords/PasswordTable";

function PasswordsGate() {
  const { isPending: isPendingUser, user } = useUser();
  const { hasMasterPassword, isPending } = useSecretStatus(user?.id);
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (isPending || isPendingUser) return <ContainerLoader />;

  return isUnlocked ? (
    <PasswordTable />
  ) : hasMasterPassword ? (
    <MasterPassword onUnlock={() => setIsUnlocked(true)} />
  ) : (
    <AddMasterPassword />
  );
}

export default PasswordsGate;
