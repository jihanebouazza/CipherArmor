import {
  HiOutlineAcademicCap,
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineBuildingLibrary,
  HiOutlineComputerDesktop,
  HiOutlineCreditCard,
  HiOutlineFolder,
  HiOutlineGlobeEuropeAfrica,
  HiOutlineIdentification,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import { IoGameControllerOutline, IoPulseOutline } from "react-icons/io5";

const vaultIcons = {
  financial: HiOutlineBanknotes,
  banking: HiOutlineBuildingLibrary,
  creditcards: HiOutlineCreditCard,
  work: HiOutlineBriefcase,
  social: HiOutlineGlobeEuropeAfrica,
  gaming: IoGameControllerOutline,
  shopping: HiOutlineShoppingBag,
  medical: IoPulseOutline,
  education: HiOutlineAcademicCap,
  default: HiOutlineFolder,
  streaming: HiOutlineComputerDesktop,
  personal: HiOutlineIdentification,
};

export function getVaultIcon(category) {
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, "");
  return vaultIcons[normalizedCategory] || vaultIcons.default;
}
