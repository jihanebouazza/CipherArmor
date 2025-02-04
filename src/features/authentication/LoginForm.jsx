import { Link } from "react-router";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ui/ErrorMessage";
import { useLogin } from "./useLogin";
import { useState } from "react";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import Loader from "../../ui/Loader";

function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { login, isLoginIn } = useLogin();

  function onSubmit({ email, password }) {
    login({ email, password }, { onSettled: reset() });
  }

  return (
    <>
      <h2 className="font-heading text-center text-[32px] leading-10 font-bold 2xl:text-4xl">
        Welcome Back
      </h2>
      <h4 className="font-heading text-charcoal-600 dark:text-charcoal-300 pb-2 text-center text-xl 2xl:text-2xl">
        Securely access your account <br />
        and manage your data.
      </h4>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="label">
          Email
        </label>

        <input
          id="email"
          type="text"
          placeholder="Email"
          className="input"
          disabled={isLoginIn}
          {...register("email", {
            required: "This field is required.",
          })}
        />

        <ErrorMessage
          condition={errors?.email?.message}
          message={errors?.email?.message}
        />

        <label htmlFor="password" className="label">
          Password
        </label>
        <div className="relative">
          <input
            type={isVisible ? "text" : "password"}
            className="input"
            id="password"
            placeholder="Password"
            disabled={isLoginIn}
            {...register("password", { required: "This field is required." })}
          />

          <div
            className="bg-ocean-100 dark:bg-charcoal-800 absolute top-2 right-2.5"
            onClick={() => setIsVisible((is) => !is)}
          >
            {isVisible ? <RxEyeClosed size={20} /> : <RxEyeOpen size={20} />}
          </div>
        </div>
        <ErrorMessage
          condition={errors?.password?.message}
          message={errors?.password?.message}
        />

        <Link
          to="/forgot-password"
          className="text-charcoal-600 dark:text-charcoal-300 hover:text-ocean-500 block text-right text-sm underline"
        >
          Forgot password?
        </Link>
        <Button extraStyles="w-full mt-2">
          {isLoginIn ? (
            <Loader secondColor="#fafbfd" borderWidth="5" width="22" />
          ) : (
            "Log in"
          )}
        </Button>
        <p className="mt-1 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-ocean-400 hover:text-ocean-500 inline-block font-medium underline"
          >
            Sign up.
          </Link>
        </p>
      </form>
    </>
  );
}

export default LoginForm;
