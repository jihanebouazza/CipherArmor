import { useEffect } from "react";
import Loader from "./Loader";
import { useNavigate, useSearchParams } from "react-router";
import { useVerifyEmail } from "../features/settings/useVerifyEmail";

export default function EmailVerifier() {
  // { verifyFunction, successMessage, redirectTo }
  const [searchParams] = useSearchParams();
  const { verifyEmail } = useVerifyEmail();
  const navigate = useNavigate();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  useEffect(
    function () {
      verifyEmail(
        {
          email,
          token,
        },
        { onSettled: () => navigate("/settings") },
      );
    },
    [email, token, verifyEmail, navigate],
  );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
      <Loader width="80" />
      <p className="dark:text-charcoal-100 text-lg font-medium">
        Verifying email...
      </p>
    </div>
  );
}
