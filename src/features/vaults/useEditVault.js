import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editVault as editVaultApi } from "../../services/apiVaults";
import toast from "react-hot-toast";

export function useEditVault() {
  const queryClient = useQueryClient();
  const { mutate: editVault, isPending: isEditing } = useMutation({
    mutationFn: editVaultApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaults"] });
      toast.success("Vault updated successfully.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { editVault, isEditing };
}
