import { Link } from "react-router";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "./useForgotPassword";
import Loader from "../../ui/Loader";

function ForgotPasswordForm() {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { forgotPassword, isPending } = useForgotPassword();

  function onSubmit({ email }) {
    forgotPassword(email, { onSettled: reset() });
  }

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
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          id="email"
          type="text"
          placeholder="Email"
          className="input"
          disabled={isPending}
          {...register("email", {
            required: "This field is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address.",
            },
          })}
        />
        <ErrorMessage
          condition={errors?.email?.message}
          message={errors?.email?.message}
        />

        <Button extraStyles="w-full mt-3">
          {isPending ? (
            <Loader secondColor="#fafbfd" borderWidth="5" width="22" />
          ) : (
            "Send Reset Link"
          )}
        </Button>

        <Link
          to="/login"
          className="text-charcoal-600 dark:text-charcoal-300 hover:text-ocean-500 mt-1 block text-center underline"
        >
          Back to login?
        </Link>
      </form>
    </>
  );
}

export default ForgotPasswordForm;
