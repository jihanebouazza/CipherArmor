import { useEffect, useState } from "react";
import { useSecurity } from "../../contexts/SecurityContext";
import ContainerLoader from "../../ui/ContainerLoader";
import Table from "../../ui/Table";
import DashboardHeader from "../dashboard/DashboardHeader";
import PasswordRow from "./PasswordRow";
import { usePasswords } from "./usePasswords";
import { decryptData } from "../../services/cryptoServices";
import toast from "react-hot-toast";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";
import PasswordTableOperations from "./PasswordTableOperations";
import { usePassword } from "../../contexts/PasswordContext";

function PasswordTable() {
  const { getEncryptionKey } = useSecurity();
  const { passwords, isPendingPasswords, count } = usePasswords();
  const [isLoading, setIsLoading] = useState(false);
  const [platformSearchTerm, setPlatformSearchTerm] = useState("");
  const { passwords: decryptedPasswords, setPasswords } = usePassword();

  useEffect(() => {
    const decryptPasswords = async () => {
      try {
        if (!passwords) return;

        setIsLoading(true);
        const key = await getEncryptionKey();
        const decrypted = await Promise.all(
          passwords.map(async (pwd) => {
            const decryptedData = await decryptData(pwd.encrypted_data, key);
            return {
              ...pwd,
              password:
                typeof decryptedData === "object" && "0" in decryptedData
                  ? Object.values(decryptedData).join("") // Convert array to string
                  : decryptedData, // Fallback if not an array-like structure
            };
          }),
        );

        setPasswords(decrypted);
      } catch (err) {
        console.log(err.message);
        toast.error(
          "Failed to unlock your passwords. Please check your master password and try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    decryptPasswords();
  }, [passwords, getEncryptionKey, setPasswords]);

  const filteredPasswords = decryptedPasswords?.filter((password) =>
    password.platform.toLowerCase().includes(platformSearchTerm.toLowerCase()),
  );

  if (isPendingPasswords || isLoading) return <ContainerLoader />;

  return (
    <>
      <DashboardHeader title="Passwords">
        Protect your digital identity. <br /> Keep hackers locked out.
      </DashboardHeader>
      <div className="py-4">
        <Table.Container
          title="My passwords"
          count={count}
          actions={
            <PasswordTableOperations
              platformSearchTerm={platformSearchTerm}
              setPlatformSearchTerm={setPlatformSearchTerm}
            />
          }
        >
          <Table
            columnsCount={8}
            emptyErrorMessage="No passwords found. Begin adding your secure logins and organize them in your vault!"
          >
            <Table.Head>
              <Table.HeadCell width="15%">Platform</Table.HeadCell>
              <Table.HeadCell width="14%">Username</Table.HeadCell>
              <Table.HeadCell width="15%">Password</Table.HeadCell>
              <Table.HeadCell width="11%">Vault</Table.HeadCell>
              <Table.HeadCell width="10%">Strength</Table.HeadCell>
              <Table.HeadCell width="15%">Last updated</Table.HeadCell>
              <Table.HeadCell width="15%">Added on</Table.HeadCell>
              <Table.HeadCell width="5%"></Table.HeadCell>
            </Table.Head>
            <Table.Body
              data={filteredPasswords}
              render={(decryptedPassword) => (
                <PasswordRow
                  key={decryptedPassword.id}
                  decryptedPassword={decryptedPassword}
                />
              )}
            />
            {Math.ceil(count / PAGE_SIZE) > 1 && (
              <Table.Footer>
                <Pagination count={count} />
              </Table.Footer>
            )}
          </Table>
        </Table.Container>
      </div>
    </>
  );
}

export default PasswordTable;
