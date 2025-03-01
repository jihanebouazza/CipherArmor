import { HiOutlineKey } from "react-icons/hi2";
import SettingBlock from "./SettingBlock";
import EditPassword from "./EditPassword";

function SecurityBlock() {
  return (
    <SettingBlock heading="Security" subHeading="Manage your password.">
      <div className="border-charcoal-100 flex w-full min-w-max items-center gap-1 rounded-lg border px-3 py-1.5 md:w-1/5">
        <HiOutlineKey
          size={18}
          className="text-charcoal-300 dark:text-charcoal-100 mb-1 inline"
        />
        <p>•••••••••••••••••••</p>
      </div>
      <EditPassword />
    </SettingBlock>
  );
}

export default SecurityBlock;
