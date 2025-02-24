import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPassword as editPasswordApi } from "../../services/apiPasswords";
import toast from "react-hot-toast";

export function useEditPassword() {
  const queryClient = useQueryClient();

  const { mutate: editPassword, isPending: isEditing } = useMutation({
    mutationFn: editPasswordApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
      toast.success("Password updated successfully.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { editPassword, isEditing };
}
