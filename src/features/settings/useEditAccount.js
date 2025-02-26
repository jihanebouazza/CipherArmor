import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAccount as updateAccountApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useUser } from "../authentication/useUser";

export function useEditAccount() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: updateAccount, isPending: isUpdating } = useMutation({
    mutationFn: updateAccountApi,
    onSuccess: (variables) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      const isEmailUpdated =
        variables?.email && variables.email !== user?.email;

      toast.success(
        isEmailUpdated
          ? "Confirmation email sent to new address."
          : "Profile updated.",
      );
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateAccount, isUpdating };
}
