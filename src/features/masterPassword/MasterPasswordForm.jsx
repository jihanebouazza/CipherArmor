import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";
import { useSecret } from "./useSecret";
import { useUser } from "../authentication/useUser";
import toast from "react-hot-toast";
import { deriveKey } from "../../services/cryptoServices";
import Loader from "../../ui/Loader";
import { useSecurity } from "../../contexts/SecurityContext";

function MasterPasswordForm({ onCloseModal }) {
  const { handleSubmit, formState, register } = useForm();
  const { errors } = formState;
  const { isPending: isPendingUser, user } = useUser();
  const { secret, isPending } = useSecret(user?.id);
  const { initializeSession } = useSecurity();

  async function onSubmit(data) {
    const { masterPassword } = data;
    const { encryptionKey, verificationKey } = await deriveKey(
      masterPassword,
      secret.salt,
      secret.kdf_params,
    );

    if (verificationKey !== secret.key_verifier) {
      toast.error("Invalid master password.");
      onCloseModal?.();
    } else initializeSession(encryptionKey);
  }

  if (isPending || isPendingUser)
    return (
      <div className="flex h-full w-full items-center justify-center pb-4">
        <Loader secondColor="#fafbfd" borderWidth="5" width="40" />
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="masterPassword" className="label">
        Master password
      </label>
      <input
        id="masterPassword"
        type="password"
        placeholder="Master password"
        className="input"
        {...register("masterPassword", {
          required: "This field is required.",
        })}
      />
      <ErrorMessage
        condition={errors?.masterPassword?.message}
        message={errors?.masterPassword?.message}
      />

      <div className="mt-3 flex justify-end gap-2">
        <Button
          type="raw"
          disabled={false}
          onClick={() => onCloseModal?.()}
          reset
        >
          Cancel
        </Button>
        <Button type="primary" disabled={false}>
          Submit
        </Button>
      </div>
    </form>
  );
}

export default MasterPasswordForm;
