import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import PasswordInput from "../../ui/PasswordInput";

function ResetPasswordForm() {
  const { register, setValue } = useForm();
  // Your password has been successfully reset. Please log in.
  return (
    <>
      <h2 className="font-heading text-center text-[32px] leading-10 font-bold">
        Create a New Password
      </h2>
      <h4 className="font-heading text-charcoal-600 dark:text-charcoal-300 pb-2 text-center text-xl">
        Set a new password to regain <br />
        access to your account.
      </h4>
      <form action="">
        <label htmlFor="newPassword" className="label">
          New password
        </label>
        <PasswordInput
          id="password"
          placeholder="Password"
          register={register}
          setValue={setValue}
        />
        <label htmlFor="confirmPassword" className="label">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="text"
          placeholder="Confirm password"
          className="input"
        />
        <Button extraStyles="w-full mt-3">Reset password</Button>
      </form>
    </>
  );
}

export default ResetPasswordForm;
