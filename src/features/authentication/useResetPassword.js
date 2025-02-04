import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useResetPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending: isResetingPassword } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(
        "Your password has been successfully reset. Please log in.",
      );
      navigate("/login");
    },
    onError: () =>
      toast.error(
        "An error occurred while resetting your password. Please try again.",
      ),
  });

  return { resetPassword, isResetingPassword };
}
