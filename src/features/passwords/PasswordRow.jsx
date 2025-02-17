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
import { useEffect, useState } from "react";
import { analyzePassword } from "../../utils/passwordUtils";
import Menu from "../../ui/Menu";
import { IoTrashOutline } from "react-icons/io5";

function PasswordRow({ decryptedPassword, decryptedPasswords }) {
  const existingsPasswords = decryptedPasswords
    ?.filter((decrypted) => decrypted.password !== decryptedPassword.password) // Exclude current password
    .map((decrypted) => decrypted.password);

  const [analysis, setAnalysis] = useState({
    strengthInfo: null,
    isReused: false,
    isBreached: false,
    score: 0,
  });

  const {
    strength = "",
    color = "",
    description = "",
  } = analysis.strengthInfo || {};

  useEffect(
    function () {
      async function analyse() {
        const res = await analyzePassword(
          decryptedPassword.password,
          existingsPasswords,
        );
        setAnalysis(res);
      }

      analyse();
    },
    [decryptedPassword, existingsPasswords],
  );

  return (
    <Table.Row>
      <Table.Cell>
        <PlatformCell
          platformName={decryptedPassword.platform}
          platformUrl={decryptedPassword.platform_url}
        />
      </Table.Cell>
      <Table.Cell>{decryptedPassword.username}</Table.Cell>
      <Table.Cell>
        <PasswordCell password={decryptedPassword.password} />
      </Table.Cell>
      <Table.Cell>
        <VaultIcon title={decryptedPassword.vaults.name} tag />
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${color}`}></div>
            <p>{analysis.score}%</p>
          </div>
          <Tooltip>
            <Tooltip.Trigger isButton>
              <button>
                <HiOutlineInformationCircle
                  size={20}
                  className="text-charcoal-600 dark:text-charcoal-100 mt-0.5 cursor-pointer"
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
      <Table.Cell>
        {formatRelativeTime(decryptedPassword.last_updated)}
      </Table.Cell>
      <Table.Cell>{formatDate(decryptedPassword.created_at)}</Table.Cell>
      <Table.Cell>
        <Menu.Container>
          <Menu>
            <Menu.Toggle id={1} />
            <Menu.List id={1}>
              <Menu.ListButton Icon={<HiOutlinePencilSquare />}>
                Edit
              </Menu.ListButton>
              <Menu.ListButton Icon={<IoTrashOutline />}>
                Delete
              </Menu.ListButton>
            </Menu.List>
          </Menu>
        </Menu.Container>
      </Table.Cell>
    </Table.Row>
  );
}

export default PasswordRow;
