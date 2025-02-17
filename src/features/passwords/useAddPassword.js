import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPassword as addPasswordApi } from "../../services/apiPasswords";
import toast from "react-hot-toast";

export function useAddPassword() {
  const queryClient = useQueryClient();

  const { mutate: addPassword, isCreating } = useMutation({
    mutationFn: addPasswordApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
      toast.success("Password added successfully.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { addPassword, isCreating };
}
