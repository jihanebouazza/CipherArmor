import ContainerLoader from "../../ui/ContainerLoader";
import { useUser } from "../authentication/useUser";
import AddMasterPassword from "./AddMasterPassword";
import MasterPassword from "./MasterPassword";
import { useMasterPasswordStatus } from "./useMasterPasswordStatus";

function PasswordsGate() {
  const { isPending: isPendingUser, user } = useUser();
  const { hasMasterPassword, isPending } = useMasterPasswordStatus(user?.id);

  if (isPending || isPendingUser) return <ContainerLoader />;

  return hasMasterPassword ? (
    <MasterPassword />
  ) : (
    <AddMasterPassword />
  );
}

export default PasswordsGate;
