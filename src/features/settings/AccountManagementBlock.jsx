import Button from "../../ui/Button";
import SettingBlock from "./SettingBlock";

function AccountManagementBlock() {
  return (
    <SettingBlock
      heading="Account Management"
      subHeading="Control your account status."
    >
      <div className="border-charcoal-100 flex items-center gap-2">
        <Button type="dangersecondary">Disable Account</Button>
        <Button type="danger">Delete Account</Button>
      </div>
    </SettingBlock>
  );
}

export default AccountManagementBlock;
