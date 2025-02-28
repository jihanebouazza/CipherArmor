import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../services/apiSettings";
import toast from "react-hot-toast";
import { useLogout } from "../authentication/useLogout";

export function useEditPassword() {
  const { logout } = useLogout();

  const { mutate: updateAccount, isPending: isUpdating } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      logout();
      toast.success("Password updated successfully! Please log in again.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateAccount, isUpdating };
}
