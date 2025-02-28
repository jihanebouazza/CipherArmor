import { useForm } from "react-hook-form";
import ErrorMessage from "../../ui/ErrorMessage";
import Button from "../../ui/Button";
import { useUser } from "../authentication/useUser";
import { useEditVault } from "./useEditVault";

function EditVaultForm({ onCloseModal, vault }) {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const { isPending, user } = useUser();
  const { editVault, isEditing } = useEditVault();
  const { id, name, description } = vault;

  function onSubmit(data) {
    if (isPending || !user) return;
    editVault(
      { id, user_id: user?.id, vault: data },
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
      <label htmlFor="name" className="label">
        Name
      </label>
      <input
        id="name"
        type="text"
        placeholder="Vault name"
        className="input"
        defaultValue={name}
        disabled={isEditing}
        {...register("name", {
          required: "This field is required.",
          minLength: {
            value: 3,
            message: "Must be at least 3 characters.",
          },
        })}
      />
      <ErrorMessage
        condition={errors?.name?.message}
        message={errors?.name?.message}
      />

      <label htmlFor="description" className="label">
        Description
      </label>
      <textarea
        id="description"
        type="text"
        placeholder="Description"
        className="input"
        defaultValue={description}
        disabled={isEditing}
        {...register("description", {
          maxLength: {
            value: 500,
            message: "Description must be less than 500 characters",
          },
        })}
      ></textarea>
      <ErrorMessage
        condition={errors?.description?.message}
        message={errors?.description?.message}
      />

      <div className="mt-3 flex justify-end gap-2">
        <Button
          type="raw"
          disabled={isEditing}
          onClick={() => onCloseModal?.()}
          reset
        >
          Cancel
        </Button>
        <Button type="primary" disabled={isEditing}>
          Edit
        </Button>
      </div>
    </form>
  );
}

export default EditVaultForm;
