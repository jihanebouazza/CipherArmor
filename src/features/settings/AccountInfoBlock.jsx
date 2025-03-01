import { HiOutlineAtSymbol } from "react-icons/hi2";
import SettingBlock from "./SettingBlock";
import EditAccount from "./EditAccount";
import { useUser } from "../authentication/useUser";
import Loader from "../../ui/Loader";
import { LiaUser } from "react-icons/lia";

function AccountInfoBlock() {
  const { user, isPending } = useUser();

  if (isPending)
    return (
      <div className="flex w-full items-center justify-center p-4">
        <Loader secondColor="#fafbfd" borderWidth="5" width="35" />
      </div>
    );
  return (
    <SettingBlock
      heading="Account Information"
      subHeading="Edit your account info."
    >
      <div className="w-full min-w-max space-y-1 md:w-1/5">
        <div className="border-charcoal-100 flex w-full items-center gap-1 rounded-lg border px-3 py-1.5">
          <LiaUser
            size={18}
            className="text-charcoal-300 dark:text-charcoal-100 mb-0.5 inline"
          />
          <p>{user.user_metadata.fullName}</p>
        </div>
        <div className="border-charcoal-100 flex w-full items-center gap-1 rounded-lg border px-3 py-1.5">
          <HiOutlineAtSymbol
            size={18}
            className="text-charcoal-300 dark:text-charcoal-100 mt-0.5 inline"
          />
          <p>{user.email}</p>
        </div>
      </div>
      <EditAccount />
    </SettingBlock>
  );
}

export default AccountInfoBlock;
