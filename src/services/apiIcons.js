import { convertBlobToBase64, formatPlatformName } from "../utils/iconUtils";

export async function fetchPlatformIcon(platformName, color = "default") {
  const formattedName = formatPlatformName(platformName);
  const iconUrl = `https://cdn.simpleicons.org/${formattedName}/${color}`;

  try {
    const res = await fetch(iconUrl);
    if (!res.ok) throw new Error("Icon not found");

    const iconBlob = await res.blob();
    return await convertBlobToBase64(iconBlob);
  } catch (error) {
    throw new Error(error);
  }
}
