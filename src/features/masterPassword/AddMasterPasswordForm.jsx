import { useForm } from "react-hook-form";
import ErrorMessage from "../../ui/ErrorMessage";
import Button from "../../ui/Button";
import { useUser } from "../authentication/useUser";
import { useAddSecret } from "./useAddSecret";
import { deriveKey, generateSalt } from "../../services/cryptoServices";
import MasterPasswordInput from "./MasterPasswordInput";

function AddMasterPasswordForm({ onCloseModal }) {
  const { handleSubmit, formState, register, getValues } = useForm();
  const { errors } = formState;
  const { isPending: isPendingUser, user } = useUser();
  const { addSecret, isCreating } = useAddSecret();

  async function onSubmit(data) {
    if (isPendingUser || !user) return;

    const { masterPassword } = data;

    const salt = generateSalt();
    const { verificationKey, kdfParams } = await deriveKey(
      masterPassword,
      salt,
    );

    addSecret(
      {
        user_id: user?.id,
        salt,
        kdf_params: kdfParams,
        key_verifier: verificationKey,
      },
      { onSettled: onCloseModal?.() },
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} role="dialog">
      <label htmlFor="masterPassword" className="label">
        Master password
      </label>
      <MasterPasswordInput disabled={isCreating} register={register} />
      <ErrorMessage
        condition={errors?.masterPassword?.message}
        message={errors?.masterPassword?.message}
      />
      <label htmlFor="confirmMasterPassword" className="label">
        Confirm master password
      </label>
      <input
        id="confirmMasterPassword"
        type="password"
        placeholder="Confirm master password"
        className="input"
        {...register("confirmMasterPassword", {
          required: "This field is required.",
          validate: (value) =>
            value === getValues().masterPassword || "Passwords do not match.",
        })}
      />
      <ErrorMessage
        condition={errors?.confirmMasterPassword?.message}
        message={errors?.confirmMasterPassword?.message}
      />

      <div className="mt-3 flex justify-end gap-2">
        <Button
          type="raw"
          disabled={isCreating}
          onClick={() => onCloseModal?.()}
          reset
        >
          Cancel
        </Button>
        <Button type="primary" disabled={isCreating}>
          Create
        </Button>
      </div>
    </form>
  );
}

export default AddMasterPasswordForm;
