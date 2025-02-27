import { useForm } from "react-hook-form";
import ErrorMessage from "../../ui/ErrorMessage";
import Button from "../../ui/Button";
import { useEditAccount } from "./useEditAccount";
import { useUser } from "../authentication/useUser";
import Loader from "../../ui/Loader";
import toast from "react-hot-toast";

function EditAccountForm({ onCloseModal }) {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { user, isPending } = useUser();
  const { updateAccount, isUpdating } = useEditAccount();

  function onSubmit({ email, fullName }) {
    if (isPending || !user) return;

    const updateData = {};

    // Only include email if it's changed
    if (email && email !== user?.email) updateData.email = email;

    // Always include fullName if provided
    if (fullName && fullName !== user?.user_metadata?.fullName)
      updateData.data = {
        fullName,
      };

    if (Object.keys(updateData).length === 0) {
      onCloseModal?.();
      toast.error("No changes detected.");
      return;
    }

    updateAccount(updateData, {
      onSettled: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  if (isPending)
    return (
      <div className="flex h-full w-full items-center justify-center pb-4">
        <Loader secondColor="#fafbfd" borderWidth="5" width="40" />
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="fullName" className="label">
        Full name
      </label>
      <input
        id="fullName"
        type="text"
        placeholder="Full name"
        className="input"
        disabled={isUpdating}
        defaultValue={user.user_metadata.fullName}
        {...register("fullName", {
          required: "This field is required.",
          pattern: {
            value: /^[A-Za-zÀ-ÿ-]+(?: [A-Za-zÀ-ÿ-]+)*$/,
            message: "Please provide a valid name.",
          },
        })}
      />
      <ErrorMessage
        condition={errors?.fullName?.message}
        message={errors?.fullName?.message}
      />
      <label htmlFor="email" className="label">
        Email
      </label>
      <input
        id="email"
        type="text"
        placeholder="Email"
        className="input"
        disabled={isUpdating}
        defaultValue={user.email}
        {...register("email", {
          required: "This field is required.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please provide a valid email address.",
          },
        })}
      />
      <ErrorMessage
        condition={errors?.email?.message}
        message={errors?.email?.message}
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

export default EditAccountForm;
