import {
  HiOutlineInformationCircle,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import Table from "../../ui/Table";
import Tooltip from "../../ui/Tooltip";
import VaultIcon from "../vaults/VaultIcon";
import PasswordCell from "./PasswordCell";
import PlatformCell from "./PlatformCell";
import StrengthCell from "./StrengthCell";
import { formatDate, formatRelativeTime } from "../../utils/helpers";
import { useEffect, useMemo, useState } from "react";
import { analyzePassword } from "../../utils/passwordUtils";
import Menu from "../../ui/Menu";
import { IoTrashOutline } from "react-icons/io5";
import Modal from "../../ui/Modal";
import EditPasswordForm from "./EditPasswordForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeletePassword } from "./useDeletePassword";
import { useUser } from "../authentication/useUser";

function PasswordRow({ decryptedPassword, passwordMap }) {
  const { deletePassword, isDeleting } = useDeletePassword();
  const { isPending, user } = useUser();
  const {
    id,
    platform,
    platform_url,
    username,
    password,
    vaults,
    last_updated,
    created_at,
  } = decryptedPassword;

  const existingsPasswords = useMemo(() => {
    if (!passwordMap) return [];

    return Array.from(passwordMap.entries())
      .filter(([id]) => id !== decryptedPassword.id)
      .map(([, password]) => password);
  }, [passwordMap, decryptedPassword.id]);

  const [analysis, setAnalysis] = useState({
    strengthInfo: null,
    isReused: false,
    isBreached: false,
    score: 0,
  });

  const {
    strength = "",
    background = "",
    description = "",
  } = analysis.strengthInfo || {};

  useEffect(
    function () {
      async function analyse() {
        const res = await analyzePassword(password, existingsPasswords);

        // Only update if the result has changed
        if (JSON.stringify(res) !== JSON.stringify(analysis)) {
          setAnalysis(res);
        }
      }

      analyse();
    },
    [password, existingsPasswords, analysis],
  );

  return (
    <Table.Row>
      <Table.Cell>
        <PlatformCell platformName={platform} platformUrl={platform_url} />
      </Table.Cell>
      <Table.Cell>{username}</Table.Cell>
      <Table.Cell>
        <PasswordCell password={password} />
      </Table.Cell>
      <Table.Cell>
        <VaultIcon title={vaults.name} tag />
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${background}`}></div>
            <p>{analysis.score}%</p>
          </div>
          <Tooltip>
            <Tooltip.Trigger isButton>
              <button>
                <HiOutlineInformationCircle
                  size={20}
                  className="text-charcoal-600 dark:text-charcoal-100 cursor-pointer"
                />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <StrengthCell
                analysis={analysis}
                strength={strength}
                description={description}
              />
            </Tooltip.Content>
          </Tooltip>
        </div>
      </Table.Cell>
      <Table.Cell>{formatRelativeTime(last_updated)}</Table.Cell>
      <Table.Cell>{formatDate(created_at)}</Table.Cell>
      <Table.Cell>
        <Modal>
          <Menu.Container>
            <Menu>
              <Menu.Toggle id={id} />
              <Menu.List id={id}>
                <Modal.Open opens="edit-password">
                  <Menu.ListButton Icon={<HiOutlinePencilSquare />}>
                    Edit
                  </Menu.ListButton>
                </Modal.Open>
                <Modal.Open opens="delete-vault">
                  <Menu.ListButton Icon={<IoTrashOutline />}>
                    Delete
                  </Menu.ListButton>
                </Modal.Open>
              </Menu.List>
            </Menu>
          </Menu.Container>
          <Modal.Window name="edit-password">
            <EditPasswordForm password={decryptedPassword} />
          </Modal.Window>
          <Modal.Window name="delete-vault">
            <ConfirmDelete
              message="This action is permanent. The password will be deleted and cannot be recovered."
              ressourceName="Password"
              disabled={isPending || isDeleting}
              onConfirm={() => deletePassword({ id, user_id: user?.id })}
            />
          </Modal.Window>
        </Modal>
      </Table.Cell>
    </Table.Row>
  );
}

export default PasswordRow;
