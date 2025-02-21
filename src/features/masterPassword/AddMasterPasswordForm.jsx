import { useForm } from "react-hook-form";
import ErrorMessage from "../../ui/ErrorMessage";
import Button from "../../ui/Button";
import { useUser } from "../authentication/useUser";
import { useAddSecret } from "./useAddSecret";
import { deriveKey, generateSalt } from "../../services/cryptoServices";
import MasterPasswordInput from "./MasterPasswordInput";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

function AddMasterPasswordForm({ onCloseModal }) {
  const { handleSubmit, formState, register, getValues } = useForm();
  const { errors } = formState;
  const { isPending: isPendingUser, user } = useUser();
  const { addSecret, isCreating } = useAddSecret();

  async function onSubmit(data) {
    if (isPendingUser || !user) return;

    const { masterPassword, confirmation } = data;

    if (!confirmation) return;

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
      <div className="text-ruby-500 dark:text-ruby-600 mb-1 flex">
        <div>
          <HiOutlineExclamationCircle
            size={18}
            className="mr-1 mb-0.5 inline"
          />
        </div>
        <p>
          Make sure your Master Password is strong and memorable. If you lose
          it, you will not be able to recover your data.
        </p>
      </div>
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
      <label className="mt-2 flex gap-1">
        <div>
          <input
            id="confirmation"
            type="checkbox"
            className="text-ocean-500 focus:ring-charcoal-100 dark:focus:ring-charcoal-700 border-charcoal-100 bg-ocean-100 dark:bg-charcoal-800 h-3 w-3 cursor-pointer rounded-md border transition duration-300 focus:ring-1 focus:outline-none"
            {...register("confirmation", {
              required: "You must confirm before proceeding.",
            })}
          />
        </div>
        <span className="text-charcoal-800 leading-5">
          I understand that my Master Password cannot be{" "}
          <span className="font-medium">changed</span> or{" "}
          <span className="font-medium">recovered</span>.
        </span>
      </label>
      <ErrorMessage
        condition={errors?.confirmation?.message}
        message={errors?.confirmation?.message}
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
