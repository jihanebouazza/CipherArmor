import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending: isLogingout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/", { replace: true });
      toast.success("Logout successful. See you next time!");
    },
    onError: () =>
      toast.error(
        "Oops! We couldn’t log you out. Please refresh and try again.",
      ),
  });

  return { logout, isLogingout };
}
