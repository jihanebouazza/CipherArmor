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
  HiOutlineWifi,
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
  wifi: HiOutlineWifi,
};

export function getVaultIcon(category) {
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, "");
  const match = Object.keys(vaultIcons).find((key) =>
    normalizedCategory.includes(key),
  );
  return vaultIcons[match] || vaultIcons.default;
}

export function formatPlatformName(platformName) {
  return platformName
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "") // Remove all whitespace
    .replace(/[^a-z0-9]/g, ""); // Remove special characters
}

export function convertBlobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
