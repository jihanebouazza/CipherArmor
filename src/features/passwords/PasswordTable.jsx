import { useEffect, useState } from "react";
import { useSecurity } from "../../contexts/SecurityContext";
import ContainerLoader from "../../ui/ContainerLoader";
import Table from "../../ui/Table";
import DashboardHeader from "../dashboard/DashboardHeader";
import PasswordRow from "./PasswordRow";
import { usePasswords } from "./usePasswords";
import { decryptData } from "../../services/cryptoServices";
import toast from "react-hot-toast";
import AddPassword from "./AddPassword";

function PasswordTable() {
  const { getEncryptionKey } = useSecurity();
  const { passwords, isPendingPasswords } = usePasswords();
  const [decryptedPasswords, setDecryptedPasswords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

        setDecryptedPasswords(decrypted);
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
  }, [passwords, getEncryptionKey]);

  if (isPendingPasswords || isLoading) return <ContainerLoader />;

  return (
    <>
      <DashboardHeader title="Passwords">
        Protect your digital identity. <br /> Keep hackers locked out.
      </DashboardHeader>
      <div className="py-4">
        <Table.Container
          title="My passwords"
          count={15}
          action={<AddPassword />}
        >
          <Table
            columnsCount={8}
            emptyErrorMessage="No passwords found. Begin adding your secure logins and organize them in your vault!"
          >
            <Table.Head>
              <Table.HeadCell width="15%">Platform</Table.HeadCell>
              <Table.HeadCell width="15%">Username</Table.HeadCell>
              <Table.HeadCell width="15%">Password</Table.HeadCell>
              <Table.HeadCell width="11%">Vault</Table.HeadCell>
              <Table.HeadCell width="10%">Strength</Table.HeadCell>
              <Table.HeadCell width="15%">Last updated</Table.HeadCell>
              <Table.HeadCell width="14%">Added on</Table.HeadCell>
              <Table.HeadCell width="5%"></Table.HeadCell>
            </Table.Head>
            <Table.Body
              data={decryptedPasswords}
              render={(decryptedPassword) => (
                <PasswordRow
                  key={decryptedPassword.id}
                  decryptedPassword={decryptedPassword}
                  decryptPasswords={decryptedPasswords}
                />
              )}
            />
          </Table>
        </Table.Container>
      </div>
    </>
  );
}

export default PasswordTable;
