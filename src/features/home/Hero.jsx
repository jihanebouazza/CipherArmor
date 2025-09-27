import { Link } from "react-router";
import Button from "../../ui/Button";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

function Hero() {
  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
    <div className="grid h-screen flex-1 grid-cols-8 grid-rows-8 gap-4 px-8 pb-6">
      <div className="col-span-4 row-span-3 flex gap-4">
        <div className="bg-ocean-150 dark:bg-charcoal-600 dark:text-charcoal-100 shadow-ocean-200 dark:shadow-charcoal-600 flex w-full flex-col justify-between rounded-3xl p-4 shadow-sm">
          <div className="flex -space-x-1 overflow-hidden pt-1 pb-2 pl-1">
            <img
              className="dark:outline-charcoal-400 outline-ocean-900 h-10 w-10 rounded-full object-cover outline-1 outline-offset-2"
              src="user1.jpg"
              alt="user1"
            />
            <img
              className="dark:outline-charcoal-400 outline-ocean-900 h-10 w-10 rounded-full object-cover outline-1 outline-offset-2"
              src="user2.jpg"
              alt="user1"
            />
            <img
              className="dark:outline-charcoal-400 outline-ocean-900 h-10 w-10 rounded-full object-cover outline-1 outline-offset-2"
              src="user3.jpg"
              alt="user1"
            />
            <img
              className="dark:outline-charcoal-400 outline-ocean-900 h-10 w-10 rounded-full object-cover outline-1 outline-offset-2"
              src="user4.jpg"
              alt="user1"
            />
          </div>
          <h2 className="font-heading dark:text-charcoal-100 text-2xl leading-none font-bold md:text-[32px] 2xl:text-4xl">
            100K+
          </h2>
          <p className="dark:text-charcoal-100 leading-5 2xl:leading-6">
            Growing community of security-conscious people.
          </p>
        </div>
        <div className="bg-ocean-150 dark:bg-charcoal-600 dark:text-charcoal-100 shadow-ocean-200 dark:shadow-charcoal-600 flex w-full flex-col justify-between rounded-3xl p-4 shadow-sm">
          <div>
            <h4 className="font-heading text-lg font-semibold">
              Trusted by users
            </h4>
            <p className="text-charcoal-800 dark:text-charcoal-100 leading-6">
              Loved for security and simplicity.
            </p>
            <p className="text-charcoal-700 dark:text-charcoal-200 pt-0.5 text-sm font-light">
              Built with privacy at the core — your data, your control.
            </p>
          </div>
          <div className="flex justify-end">
            <Link
              to="/signup"
              className="bg-ocean-500 text-ocean-100 rounded-full p-2"
            >
              <HiOutlineArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
      <div className="dark:text-charcoal-100 col-span-4 row-span-5 flex w-full flex-col justify-between px-2 pb-4">
        <div>
          <h1 className="font-heading text-[48px] leading-15 font-semibold">
            Say goodbye to Pa$$w0rds
          </h1>
          <h3 className="font-heading text-charcoal-800 dark:text-charcoal-200 pt-1 text-lg">
            Keep your accounts secure effortlessly with our smart password
            manager. Track health, detect breaches, and never reuse passwords
            again.
          </h3>
        </div>
        <Link to="/signup">
          <Button extraStyles="w-fit">Create Account</Button>
        </Link>{" "}
      </div>
      <div className="texture shadow-ocean-200 dark:shadow-charcoal-600 relative col-span-4 row-span-5 w-full rounded-3xl p-4 shadow-sm">
        <img
          src="/portrait1.png"
          alt="Person"
          className="absolute bottom-0 left-1/2 h-[calc(100%+150px)] -translate-x-1/2 object-cover dark:block"
        />
        <img
          src="/portrait.png"
          alt="Person"
          className="absolute bottom-0 left-1/2 h-[calc(100%+150px)] -translate-x-1/2 object-cover dark:hidden"
        />
      </div>
      <div className="bg-ocean-150 dark:bg-charcoal-600 dark:text-charcoal-100 shadow-ocean-200 dark:shadow-charcoal-600 col-span-4 row-span-3 flex w-full flex-col justify-between rounded-3xl p-4 shadow-sm">
        <img
          className="dark:outline-charcoal-400 outline-ocean-900 h-12 w-12 rounded-full object-cover outline-1 outline-offset-2"
          src="user5.jpg"
          alt="user5"
        />
        <p className="font-semibold">
          {'"'}Finally, a password manager that feels simple and powerful at the
          same time. I’ve never felt more secure online.{'"'}
        </p>
        <div>
          <p className="">
            Sarah L.,{" "}
            <span className="text-charcoal-700 dark:text-charcoal-200 pt-1.5 text-sm font-light">
              Early User
            </span>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Hero;
