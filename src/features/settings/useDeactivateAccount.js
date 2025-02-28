import { useMutation } from "@tanstack/react-query";
import { deactivateAccount as deactivateAccountApi } from "../../services/apiSettings";
import { useLogout } from "../authentication/useLogout";
import toast from "react-hot-toast";

export function useDeactivateAccount() {
  const { logout } = useLogout();

  const { mutate: deactivateAccount, isPending: isDeactivating } = useMutation({
    mutationFn: deactivateAccountApi,
    onSuccess: () => {
      logout();
      toast.success(
        "Your account has been successfully deactivated. Please note that reactivation is not possible for the next 24 hours.",
      );
    },
    onError: (err) => toast.error(err.message),
  });

  return { deactivateAccount, isDeactivating };
}
