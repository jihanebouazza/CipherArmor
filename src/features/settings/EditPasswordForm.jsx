import { useForm } from "react-hook-form";
import PasswordInput from "../../ui/PasswordInput";
import ErrorMessage from "../../ui/ErrorMessage";
import Button from "../../ui/Button";
import { useUser } from "../authentication/useUser";
import { useEditPassword } from "./useEditPassword";
import VisibilityToggle from "../../ui/VisibilityToggle";
import { useState } from "react";

function EditPasswordForm({ onCloseModal }) {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { user, isPending } = useUser();
  const { updateAccount, isUpdating } = useEditPassword();
  const [isVisible, setIsVisible] = useState(false);

  function onSubmit({ oldPassword, password }) {
    if (isPending || !user) return;
    updateAccount(
      { email: user?.email, oldPassword, password },
      {
        onSettled: () => {
          reset();
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} role="dialog">
      <label htmlFor="oldPassword" className="label">
        Old password
      </label>
      <div className="relative">
        <input
          type={isVisible ? "text" : "password"}
          className="input"
          id="oldPassword"
          placeholder="Old password"
          disabled={isUpdating}
          {...register("oldPassword", { required: "This field is required." })}
        />
        <VisibilityToggle
          isVisible={isVisible}
          onToggle={() => setIsVisible((is) => !is)}
        />
      </div>
      <ErrorMessage
        condition={errors?.oldPassword?.message}
        message={errors?.oldPassword?.message}
      />

      <label htmlFor="password" className="label">
        New password
      </label>
      <PasswordInput
        id="password"
        placeholder="New Password"
        disabled={isUpdating}
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
        disabled={isUpdating}
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
          disabled={isUpdating}
          onClick={() => onCloseModal?.()}
          reset
        >
          Cancel
        </Button>
        <Button type="primary" disabled={isUpdating}>
          Edit
        </Button>
      </div>
    </form>
  );
}

export default EditPasswordForm;
