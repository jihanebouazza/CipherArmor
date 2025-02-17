import { getVaultIcon } from "../../utils/iconUtils";

function VaultIcon({ title = "", tag = false }) {
  const Icon = getVaultIcon(title);

  if (tag)
    return (
      <div className="bg-charcoal-50 dark:bg-charcoal-600 flex w-fit items-center justify-center gap-1 rounded-2xl px-4 py-1">
        <div>
          <Icon size={18} />
        </div>
        <p>{title}</p>
      </div>
    );

  return (
    <div className="flex items-end gap-2">
      <div className="bg-charcoal-50 dark:bg-charcoal-600 inline-block rounded-lg px-1.5 py-1">
        <Icon size={18} />
      </div>
      <p>{title}</p>
    </div>
  );
}

export default VaultIcon;
