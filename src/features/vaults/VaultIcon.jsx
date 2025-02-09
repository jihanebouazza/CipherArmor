import { getVaultIcon } from "../../utils/iconUtils";

function VaultIcon({ title = "", icon = "Default" }) {
  const Icon = getVaultIcon(icon);

  return (
    <div className="flex items-end gap-2">
      <div className="bg-charcoal-100 dark:bg-charcoal-600 inline-block rounded-lg px-1.5 py-1">
        <Icon size={18} />
      </div>
      <p>{title}</p>
    </div>
  );
}

export default VaultIcon;
