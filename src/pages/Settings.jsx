import DashboardHeader from "../features/dashboard/DashboardHeader";
import AccountInfoBlock from "../features/settings/AccountInfoBlock";
import AccountManagementBlock from "../features/settings/AccountManagementBlock";
import SecurityBlock from "../features/settings/SecurityBlock";

function Settings() {
  return (
    <>
      <DashboardHeader title="Settings">
        Your security, your control. <br /> Manage your account and password
        effortlessly.
      </DashboardHeader>
      <div className="divide-charcoal-400 divide-y-1 py-4">
        <h4 className="font-heading pb-2 text-[24px] font-bold">My settings</h4>
        <AccountInfoBlock />
        <SecurityBlock />
        <AccountManagementBlock />
      </div>
    </>
  );
}

export default Settings;
