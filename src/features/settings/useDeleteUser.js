import { useMutation } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../../services/apiSettings";
import toast from "react-hot-toast";
import { useLogout } from "../authentication/useLogout";

export function useDeleteUser() {
  const { logout } = useLogout();

  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      logout();
      toast.success(
        "Your account has been deleted. We're sorry to see you go!",
      );
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteUser, isDeleting };
}
