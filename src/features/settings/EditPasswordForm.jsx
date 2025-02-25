import { useForm } from "react-hook-form";
import PasswordInput from "../../ui/PasswordInput";
import ErrorMessage from "../../ui/ErrorMessage";
import Button from "../../ui/Button";

function EditPasswordForm({ onCloseModal }) {
  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;
  const isResetingPassword = false;

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} role="dialog">
      <label htmlFor="password" className="label">
        New password
      </label>
      <PasswordInput
        id="password"
        placeholder="Password"
        disabled={isResetingPassword}
        register={register}
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
        disabled={isResetingPassword}
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
      <div className="mt-3 flex justify-end gap-2">
        <Button
          type="raw"
          disabled={isResetingPassword}
          onClick={() => onCloseModal?.()}
          reset
        >
          Cancel
        </Button>
        <Button type="primary" disabled={isResetingPassword}>
          Edit
        </Button>
      </div>
    </form>
  );
}

export default EditPasswordForm;
