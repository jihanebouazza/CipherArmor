import AddButton from "../../ui/AddButton";
import Table from "../../ui/Table";
import DashboardHeader from "../dashboard/DashboardHeader";
import { formatRelativeTime } from "../../utils/helpers";
import VaultIcon from "../vaults/VaultIcon";
import PlatformCell from "./PlatformCell";
import PasswordCell from "./PasswordCell";
import { analyzePassword } from "../../utils/passwordUtils";
import { useEffect, useState } from "react";
import Tooltip from "../../ui/Tooltip";
import StrengthCell from "./StrengthCell";
import { HiOutlineInformationCircle } from "react-icons/hi2";

function PasswordTable() {
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
    <>
      <DashboardHeader title="Passwords">
        Protect your digital identity. <br /> Keep hackers locked out.
      </DashboardHeader>
      <div className="py-4">
        <Table.Container
          title="My passwords"
          count={15}
          action={<AddButton>Add password</AddButton>}
        >
          <Table
            columnsCount={8}
            emptyErrorMessage="No passwords found. Begin adding your secure logins and organize them in your vault!"
          >
            <Table.Head>
              <Table.HeadCell width="20%">Platform</Table.HeadCell>
              <Table.HeadCell width="15%">Username</Table.HeadCell>
              <Table.HeadCell width="15%">Password</Table.HeadCell>
              <Table.HeadCell width="10%">Vault</Table.HeadCell>
              <Table.HeadCell width="10%">Strength</Table.HeadCell>
              <Table.HeadCell width="15%">Last updated</Table.HeadCell>
              <Table.HeadCell width="10%">Added on</Table.HeadCell>
              <Table.HeadCell width="5%"></Table.HeadCell>
            </Table.Head>
            <Table.CustomBody data={[1]}>
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
              </Table.Row>
            </Table.CustomBody>
          </Table>
        </Table.Container>
      </div>
    </>
  );
}

export default PasswordTable;
