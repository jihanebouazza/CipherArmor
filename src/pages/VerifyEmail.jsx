import { useEffect } from "react";
import { useVerifyEmail } from "../features/settings/useVerifyEmail";
import Loader from "../ui/Loader";
import { useNavigate, useSearchParams } from "react-router";

export default function VerifyEmail() {
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
