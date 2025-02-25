import { useForm } from "react-hook-form";
import ErrorMessage from "../../ui/ErrorMessage";
import Button from "../../ui/Button";

function EditAccountForm({ onCloseModal }) {
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const isResetingPassword = false;

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} role="dialog">
      <label htmlFor="email" className="label">
        Email
      </label>
      <input
        id="email"
        type="text"
        placeholder="Email"
        className="input"
        disabled={isResetingPassword}
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

export default EditAccountForm;
