import { Link } from "react-router";
import Button from "../../ui/Button";
import PasswordInput from "../../ui/PasswordInput";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ui/ErrorMessage";

function SignupForm() {
  const { register, setValue, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
  }

  function onError(data) {
    console.log(getValues().password);

    console.log(data);
  }

  return (
    <>
      <h2 className="font-heading text-center text-[32px] leading-10 font-bold">
        Secure Your Future Today
      </h2>
      <h4 className="font-heading text-charcoal-600 dark:text-charcoal-300 pb-2 text-center text-xl">
        Sign up and protect your digital world.
      </h4>
      <form action="" onSubmit={handleSubmit(onSubmit, onError)}>
        <label htmlFor="fullName" className="label">
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          placeholder="Full name"
          className="input"
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
          {...register("email", {
            required: "This field is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address.",
            },
          })}
        />
        <ErrorMessage
          condition={errors?.email?.message}
          message={errors?.email?.message}
        />

        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="w-full">
            <label htmlFor="password" className="label">
              Passowrd
            </label>
            <PasswordInput
              id="password"
              placeholder="Password"
              register={register}
              setValue={setValue}
            />
            <ErrorMessage
              condition={errors?.password?.message}
              message={errors?.password?.message}
            />
          </div>
          <div className="w-full">
            <label htmlFor="confirmPassword" className="label">
              Confirm Passoword
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              className="input"
              {...register("confirmPassword", {
                required: "This field is required.",
                validate: (value) =>
                  value === getValues().password || "Passwords do not match.",
              })}
            />
            <ErrorMessage
              condition={errors?.confirmPassword?.message}
              message={errors?.confirmPassword?.message}
            />
          </div>
        </div>
        <Button extraStyles="w-full mt-1">Sign up</Button>
        <p className="mt-1 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-ocean-400 hover:text-ocean-500 inline-block font-medium underline"
          >
            Log in.
          </Link>
        </p>
      </form>
    </>
  );
}

export default SignupForm;
