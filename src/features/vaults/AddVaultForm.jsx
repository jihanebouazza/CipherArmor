import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";
import { useAddVault } from "./useAddVault";
import { useUser } from "../authentication/useUser";

function AddVaultForm({ onCloseModal }) {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const { addVault, isCreating } = useAddVault();
  const { isPending, user } = useUser();

  function onSubmit(data) {
    if (isPending || !user) return;
    addVault(
      { vault: data, user_id: user?.id },
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
        disabled={isCreating}
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
        disabled={isCreating}
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
          disabled={isCreating}
          onClick={() => onCloseModal?.()}
          reset
        >
          Cancel
        </Button>
        <Button type="primary">Add</Button>
      </div>
    </form>
  );
}

export default AddVaultForm;
