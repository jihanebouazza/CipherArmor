import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePassword as deletePasswordApi } from "../../services/apiPasswords";
import toast from "react-hot-toast";

export function useDeletePassword() {
  const queryClient = useQueryClient();

  const { mutate: deletePassword, isPending: isDeleting } = useMutation({
    mutationFn: deletePasswordApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
      toast.success("Password deleted successfully.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { deletePassword, isDeleting };
}
