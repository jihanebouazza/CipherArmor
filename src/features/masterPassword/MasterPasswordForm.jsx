import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";

function MasterPasswordForm({ onCloseModal }) {
  const { handleSubmit, formState, register } = useForm();
  const { errors } = formState;

  function onSubmit() {}

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
