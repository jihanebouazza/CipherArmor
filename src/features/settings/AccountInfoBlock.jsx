import { HiOutlineAtSymbol } from "react-icons/hi2";
import SettingBlock from "./SettingBlock";
import EditAccount from "./EditAccount";

function AccountInfoBlock() {
  return (
    <SettingBlock
      heading="Account Information"
      subHeading="Edit your account info."
    >
      <div className="border-charcoal-100 flex w-1/5 min-w-max items-center gap-1 rounded-lg border px-3 py-1.5">
        <HiOutlineAtSymbol
          size={18}
          className="text-charcoal-300 dark:text-charcoal-100 mt-0.5 inline"
        />
        <p>user@gmail.com</p>
      </div>
      <EditAccount />
    </SettingBlock>
  );
}

export default AccountInfoBlock;
