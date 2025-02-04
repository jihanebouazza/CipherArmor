import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useForgotPassword() {
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () =>
      toast.success(
        "Password reset link sent! Check your email to reset your password.",
      ),
    onError: () => toast.error("There was an error sending reset email."),
  });

  return { forgotPassword, isPending };
}
