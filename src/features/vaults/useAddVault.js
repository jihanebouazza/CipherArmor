import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVault as addVaultApi } from "../../services/apiVaults";
import toast from "react-hot-toast";

export function useAddVault() {
  const queryClient = useQueryClient();

  const { mutate: addVault, isPending: isCreating } = useMutation({
    mutationFn: addVaultApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaults"] });
      toast.success("Vault added successfully.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { addVault, isCreating };
}
