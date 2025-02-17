import { useForm } from "react-hook-form";
import { useUser } from "../authentication/useUser";
import ErrorMessage from "../../ui/ErrorMessage";
import Button from "../../ui/Button";
import PasswordInput from "../../ui/PasswordInput";
import { useVaults } from "../vaults/useVaults";
import { encryptData } from "../../services/cryptoServices";
import { useSecurity } from "../../contexts/SecurityContext";
import { useAddPassword } from "./useAddPassword";

function AddPasswordForm({ onCloseModal }) {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const { isPending: isPendingUser, user } = useUser();
  const { vaults, isPending: isPendingVaults } = useVaults();
  const { getEncryptionKey } = useSecurity();
  const { addPassword, isCreating } = useAddPassword();

  async function onSubmit(data) {
    if (isPendingUser || !user) return;

    const { password, vault, ...newPassword } = data;

    const encryptionKey = getEncryptionKey();
    const encryptedData = await encryptData(password, encryptionKey);

    addPassword(
      {
        ...newPassword,
        encrypted_data: encryptedData,
        vault_id: vault,
        user_id: user.id,
      },
      {
        onSettled: () => {
          reset();
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="platform" className="label">
        Platform
      </label>
      <input
        id="platform"
        type="text"
        placeholder="Platform name"
        className="input"
        disabled={isCreating}
        {...register("platform", {
          required: "This field is required.",
          minLength: {
            value: 3,
            message: "Must be at least 3 characters.",
          },
        })}
      />
      <ErrorMessage
        condition={errors?.platform?.message}
        message={errors?.platform?.message}
      />

      <label htmlFor="platform_url" className="label">
        Platform URL
      </label>
      <input
        id="platform_url"
        type="text"
        placeholder="Platform login link"
        className="input"
        disabled={isCreating}
        {...register("platform_url", {
          required: "This field is required.",
        })}
      />
      <ErrorMessage
        condition={errors?.platform_url?.message}
        message={errors?.platform_url?.message}
      />

      <label htmlFor="username" className="label">
        Username
      </label>
      <input
        id="username"
        type="text"
        placeholder="Username or email"
        className="input"
        disabled={isCreating}
        {...register("username", {
          required: "This field is required.",
        })}
      />
      <ErrorMessage
        condition={errors?.username?.message}
        message={errors?.username?.message}
      />

      <label htmlFor="password" className="label">
        Password
      </label>
      <PasswordInput
        id="password"
        placeholder="Password"
        disabled={isCreating}
        register={register}
      />
      <ErrorMessage
        condition={errors?.password?.message}
        message={errors?.password?.message}
      />

      <label htmlFor="vault" className="label">
        Vault
      </label>
      <select
        id="vault"
        className="input"
        disabled={isCreating}
        {...register("vault", {
          required: "This field is required.",
        })}
      >
        <option value="">Choose a vault</option>
        {!isPendingVaults &&
          vaults.map((vault) => (
            <option value={vault.id} key={vault.id}>
              {vault.name}
            </option>
          ))}
      </select>
      <ErrorMessage
        condition={errors?.vault?.message}
        message={errors?.vault?.message}
      />

      <div className="mt-4 flex justify-end gap-2">
        <Button
          type="raw"
          disabled={isCreating}
          onClick={() => onCloseModal?.()}
          reset
        >
          Cancel
        </Button>
        <Button type="primary" disabled={isCreating}>
          Add
        </Button>
      </div>
    </form>
  );
}

export default AddPasswordForm;
