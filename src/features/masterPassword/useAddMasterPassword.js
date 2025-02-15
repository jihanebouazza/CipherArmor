import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMasterPassword as addMasterPasswordApi } from "../../services/apiMasterPassword";
import toast from "react-hot-toast";

export function useAddMasterPassword() {
  const queryClient = useQueryClient();

  const { mutate: addMasterPassword, isPending: isCreating } = useMutation({
    mutationFn: addMasterPasswordApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["masterPassword"] });
      toast.success("Master password created successfully.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { addMasterPassword, isCreating };
}
