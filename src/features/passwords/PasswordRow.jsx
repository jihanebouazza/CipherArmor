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
import { formatRelativeTime } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { analyzePassword } from "../../utils/passwordUtils";
import Menu from "../../ui/Menu";
import { IoTrashOutline } from "react-icons/io5";

function PasswordRow() {
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

  useEffect(function () {
    async function analyse() {
      const res = await analyzePassword("1234@5(-$$**ùùAazerty", ["password"]);
      setAnalysis(res);
    }
    analyse();
  }, []);

  return (
    <Table.Row>
      <Table.Cell>
        <PlatformCell
          platformName="Netflix"
          platformUrl="https://www.netflix.com/login"
        />
      </Table.Cell>
      <Table.Cell>Hello World</Table.Cell>
      <Table.Cell>
        <PasswordCell password="password" />
      </Table.Cell>
      <Table.Cell>
        <VaultIcon title="Work" tag />
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
        {formatRelativeTime("2025-02-12 16:44:32.212339+00")}
      </Table.Cell>
      <Table.Cell>Hello World</Table.Cell>
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
