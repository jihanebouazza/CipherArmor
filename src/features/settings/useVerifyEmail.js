import { useMutation } from "@tanstack/react-query";
import { verifyEmailChange } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useVerifyEmail() {
  const { mutate: verifyEmail, isPending: isVerifying } = useMutation({
    mutationFn: verifyEmailChange,
    onSuccess: () => {
      toast.success("Email updated successfully.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { verifyEmail, isVerifying };
}
