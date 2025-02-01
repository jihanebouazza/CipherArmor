import { Link } from "react-router";
import Button from "../../ui/Button";
import PasswordInput from "../../ui/PasswordInput";
import { useForm } from "react-hook-form";

function SignupForm() {
  const { register, setValue } = useForm();

  return (
    <>
      <h2 className="font-heading text-center text-[32px] leading-10 font-bold">
        Secure Your Future Today
      </h2>
      <h4 className="font-heading text-charcoal-600 dark:text-charcoal-300 pb-2 text-center text-xl">
        Sign up and protect your digital world.
      </h4>
      <form action="">
        <label htmlFor="fullName" className="label">
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          placeholder="Full name"
          className="input"
        />
        <label htmlFor="email" className="label">
          Email
        </label>
        <input id="email" type="text" placeholder="Email" className="input" />
        <div className="mb-2 flex items-center justify-between gap-2">
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
          </div>
          <div className="w-full">
            <label htmlFor="confirmPassword" className="label">
              Confirm Passowrd
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              className="input"
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
