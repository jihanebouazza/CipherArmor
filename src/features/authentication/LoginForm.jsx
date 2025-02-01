import { Link } from "react-router";
import Button from "../../ui/Button";

function LoginForm() {
  return (
    <>
      <h2 className="font-heading text-center text-[32px] leading-10 font-bold 2xl:text-4xl">
        Welcome Back
      </h2>
      <h4 className="font-heading text-charcoal-600 dark:text-charcoal-300 pb-2 text-center text-xl 2xl:text-2xl">
        Securely access your account <br />
        and manage your data.
      </h4>
      <form action="">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input id="email" type="text" placeholder="Email" className="input" />

        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          className="input"
          id="password"
          placeholder="Password"
        />

        <Link
          to="/forgot-password"
          className="text-charcoal-600 dark:text-charcoal-300 hover:text-ocean-500 block text-right text-sm underline"
        >
          Forgot password?
        </Link>
        <Button extraStyles="w-full mt-1">Log in</Button>
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
