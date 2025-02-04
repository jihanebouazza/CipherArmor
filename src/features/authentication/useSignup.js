import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: () =>
      toast.success(
        "Your account has been created! To activate it, click the verification link sent to your email.",
      ),
  });

  return { signup, isSigningUp };
}
