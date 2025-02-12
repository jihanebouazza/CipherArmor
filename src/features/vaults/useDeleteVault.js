import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVault as deleteVaultApi } from "../../services/apiVaults";
import toast from "react-hot-toast";

export function useDeleteVault() {
  const queryClient = useQueryClient();

  const { mutate: deleteVault, isPending: isDeleting } = useMutation({
    mutationFn: deleteVaultApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaults"] });
      toast.success("Vault deleted successfully.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteVault, isDeleting };
}
