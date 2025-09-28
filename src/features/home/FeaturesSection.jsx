import {
  HiOutlineFingerPrint,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
} from "react-icons/hi2";
import FeatureItem from "./FeatureItem";
import { PiVault } from "react-icons/pi";

function FeaturesSection() {
  return (
    <div className="px-8 py-6 pt-10 2xl:px-25">
      <h2 className="font-heading dark:text-charcoal-100 pb-2 text-2xl leading-none font-bold md:text-[32px] 2xl:text-4xl">
        Everything You Need in a Password Manager
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
        <FeatureItem
          Icon={
            <HiOutlineFingerPrint
              size={24}
              className="text-ocean-300 dark:text-charcoal-300"
            />
          }
          title="Master Password Always Reset"
          description="You need to enter your master password each session for maximum security."
          num="01"
        />
        <FeatureItem
          Icon={
            <HiOutlineLockClosed
              size={20}
              className="text-ocean-300 dark:text-charcoal-300"
            />
          }
          title="Save Passwords Securely"
          description="Store all your passwords in encrypted vaults. Only you can access them."
          num="02"
        />

        <FeatureItem
          Icon={
            <PiVault
              size={20}
              className="text-ocean-300 dark:text-charcoal-300"
            />
          }
          title="Organize Vaults Effortlessly"
          description="Group passwords into vaults with custom names and categories."
          num="03"
        />
        <FeatureItem
          Icon={
            <HiOutlineLockOpen
              size={20}
              className="text-ocean-300 dark:text-charcoal-300"
            />
          }
          title="Password Health Overview"
          description="Instantly see which passwords are weak, reused, or old."
          num="04"
        />
      </div>
    </div>
  );
}

export default FeaturesSection;
