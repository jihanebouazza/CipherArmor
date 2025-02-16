import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSecret as addSecretApi } from "../../services/apiSecrets";
import toast from "react-hot-toast";

export function useAddSecret() {
  const queryClient = useQueryClient();

  const { mutate: addSecret, isPending: isCreating } = useMutation({
    mutationFn: addSecretApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["secrets"] });
      toast.success("Master password created successfully.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { addSecret, isCreating };
}
