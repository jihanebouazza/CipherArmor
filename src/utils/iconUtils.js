import {
  HiOutlineAcademicCap,
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineBuildingLibrary,
  HiOutlineCreditCard,
  HiOutlineFolder,
  HiOutlineGlobeEuropeAfrica,
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
};

export function getVaultIcon(category) {
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, "");
  return vaultIcons[normalizedCategory] || vaultIcons.default;
}
