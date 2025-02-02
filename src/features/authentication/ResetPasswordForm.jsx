import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import PasswordInput from "../../ui/PasswordInput";
import ErrorMessage from "../../ui/ErrorMessage";

function ResetPasswordForm() {
  const { register, setValue, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
  }

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
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="newPassword" className="label">
          New password
        </label>
        <PasswordInput
          id="password"
          placeholder="Password"
          register={register}
          setValue={setValue}
        />
        <ErrorMessage
          condition={errors?.password?.message}
          message={errors?.password?.message}
        />
        <label htmlFor="confirmPassword" className="label">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          className="input"
          {...register("confirmPassword", {
            required: "This field is required.",
            validate: (value) =>
              value === getValues().password || "Passwords do not match.",
          })}
        />
        <ErrorMessage
          condition={errors?.confirmPassword?.message}
          message={errors?.confirmPassword?.message}
        />
        <Button extraStyles="w-full mt-3">Reset password</Button>
      </form>
    </>
  );
}

export default ResetPasswordForm;
