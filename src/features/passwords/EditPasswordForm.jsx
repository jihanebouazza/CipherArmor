import { useForm } from "react-hook-form";
import { useAllVaults } from "../vaults/useAllVaults";
import { useSecurity } from "../../contexts/SecurityContext";
import { encryptData } from "../../services/cryptoServices";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";
import PasswordInput from "../../ui/PasswordInput";
import { useEditPassword } from "./useEditPassword";
import { useUser } from "../authentication/useUser";
import { analyzePassword } from "../../utils/passwordUtils";

function EditPasswordForm({ onCloseModal, password }) {
  const {
    id,
    platform,
    platform_url,
    username,
    password: passwordData,
    vaults: vault,
  } = password;

  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const { isPending: isPendingUser, user } = useUser();
  const { vaults, isPending: isPendingVaults } = useAllVaults();
  const { getEncryptionKey } = useSecurity();
  const { editPassword, isEditing } = useEditPassword();

  async function onSubmit(data) {
    if (isPendingUser || !user) return;

    const { password, vault, ...newPassword } = data;
    const updatedPassword = {
      ...newPassword,
      vault_id: vault,
      user_id: user.id,
      last_updated: new Date().toISOString(),
    };

    // Encrypt the password only if it has changed
    if (password && password !== passwordData) {
      const encryptionKey = getEncryptionKey();
      updatedPassword.encrypted_data = await encryptData(
        password,
        encryptionKey,
      );

      const res = await analyzePassword(password, []);
      updatedPassword.is_reused = res?.isReused;
      updatedPassword.is_breached = res?.isBreached;
      updatedPassword.strength = res?.strengthInfo.strength;
      updatedPassword.score = res?.score;
    }

    editPassword(
      { updatedPassword, id, user_id: user.id },
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
      <label htmlFor="username" className="label">
        Username
      </label>
      <input
        id="username"
        type="text"
        placeholder="Username or email"
        className="input"
        defaultValue={username}
        disabled={isEditing}
        {...register("username", {
          required: "This field is required.",
          validate: (value) => {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            const isUsername = /^[a-zA-Z0-9_]{3,}$/.test(value); // At least 3 chars
            if (!isEmail && !isUsername)
              return "Must be a valid email or username (min. 3 chars)";
          },
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
        disabled={isEditing}
        defaultValue={passwordData}
        register={register}
      />
      <ErrorMessage
        condition={errors?.password?.message}
        message={errors?.password?.message}
      />

      <label htmlFor="platform" className="label">
        Platform
      </label>
      <input
        id="platform"
        type="text"
        placeholder="Platform name"
        className="input"
        disabled={isEditing}
        defaultValue={platform}
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
        disabled={isEditing}
        defaultValue={platform_url}
        {...register("platform_url", {
          required: "This field is required.",
          pattern: {
            value: /^(https?:\/\/)[\w.-]+\.[a-z]{2,6}(\/.*)?$/i,
            message: "Enter a valid URL starting with http:// or https://",
          },
        })}
      />
      <ErrorMessage
        condition={errors?.platform_url?.message}
        message={errors?.platform_url?.message}
      />

      <label htmlFor="vault" className="label">
        Vault
      </label>
      <select
        id="vault"
        className="input"
        disabled={isEditing}
        defaultValue={vault.id}
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
          disabled={false}
          onClick={() => onCloseModal?.()}
          reset
        >
          Cancel
        </Button>
        <Button type="primary" disabled={false}>
          Edit
        </Button>
      </div>
    </form>
  );
}

export default EditPasswordForm;
