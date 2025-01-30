import { Link } from "react-router";
import Button from "../../ui/Button";

function ForgotPasswordForm() {
  // If this email exists, a reset link has been sent to your inbox.
  return (
    <>
      <h2 className="font-heading text-center text-[32px] leading-10 font-bold">
        Reset Your Password
      </h2>
      <h4 className="font-heading text-charcoal-600 dark:text-charcoal-300 pb-2 text-center text-xl">
        Enter your email, and we&apos;ll send you <br />a link to reset your
        password.
      </h4>
      <form action="">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input id="email" type="text" placeholder="Email" className="input" />
        <Button extraStyles="w-full mt-3">Send Reset Link</Button>

        <Link
          to="/login"
          className="text-charcoal-600 dark:text-charcoal-300 hover:text-ocean-500 block mt-1 text-center underline"
        >
          Back to login?
        </Link>
      </form>
    </>
  );
}

export default ForgotPasswordForm;
