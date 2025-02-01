import { HiOutlineArrowTopRightOnSquare, HiOutlineHome } from "react-icons/hi2";
import Button from "../../ui/Button";
import LockIcon from "../../ui/LockIcon";
import ThemeSwitch from "../../ui/ThemeSwitch";
import { useNavigate } from "react-router";

function AuthBentoBox() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-ocean-100 dark:bg-charcoal-100 dark:border-charcoal-100 col-span-5 rounded-3xl p-4 dark:border">
        <h3 className="font-heading inline text-xl font-bold md:text-2xl 2xl:text-2xl">
          Total Security at Your Fingertips
        </h3>
        <p className="dark:text-charcoal-800 leading-5 2xl:leading-6">
          Effortlessly safeguard your passwords and stay ahead of breaches.
        </p>
        <div className="flex items-center gap-4 pt-1 2xl:gap-6">
          <div>
            <p className="font-heading text-ruby-600 dark:text-ruby-900 text-5xl leading-none font-bold 2xl:text-7xl">
              90%
            </p>
          </div>
          <p className="dark:text-charcoal-700 leading-4 2xl:leading-5">
            With our app, stay ahead of threats with real-time protection and
            encrypted security for your accounts.
          </p>
        </div>
        <p className="leading-none font-light italic">
          of online accounts are compromised due to weak security practices.
        </p>
      </div>

      <div className="bg-ocean-100/60 border-ocean-300 dark:bg-charcoal-700/80 dark:border-charcoal-700 hidden rounded-3xl border p-4 md:col-span-2 md:block">
        <h2 className="font-heading dark:text-charcoal-100 text-2xl leading-none font-bold md:text-[32px] 2xl:text-4xl">
          100K+
        </h2>
        <p className="dark:text-charcoal-100 leading-5 2xl:leading-6">
          users stay ahead of threats with our app.
        </p>
        <div className="relative">
          <img
            className="dark:outline-charcoal-600 outline-ocean-900 absolute top-2 -left-0.5 aspect-auto h-12 w-12 rounded-full object-cover outline-1 outline-offset-2 md:top-2 md:left-1 md:h-14 md:w-14 lg:top-2 lg:-left-0.5 lg:h-10 lg:w-10 2xl:top-0.5 2xl:-left-1 2xl:h-14 2xl:w-14"
            src="user1.jpg"
            alt="user1"
          />
          <img
            className="dark:outline-charcoal-600 outline-ocean-900 absolute top-8 left-14 h-9 w-9 rounded-full object-cover outline-1 outline-offset-2 md:top-6 md:left-18 md:h-11 md:w-11 lg:top-5 lg:left-14 lg:h-12 lg:w-12 xl:top-8 xl:left-14 xl:h-9 xl:w-9 2xl:top-13 2xl:left-11 2xl:h-11 2xl:w-11"
            src="user2.jpg"
            alt="user2"
          />
          <img
            className="dark:outline-charcoal-600 outline-ocean-900 absolute top-1.5 right-8 h-13 w-13 rounded-full object-cover outline-1 outline-offset-2 md:top-1 md:right-15 md:h-14 md:w-14 lg:top-1.5 lg:right-14 lg:h-14 lg:w-14 xl:top-1.5 xl:right-8 xl:h-13 xl:w-13 2xl:top-1 2xl:right-5 2xl:h-15 2xl:w-15"
            src="user3.jpg"
            alt="user3"
          />
          <img
            className="dark:outline-charcoal-600 outline-ocean-900 absolute top-8 -right-2 h-8 w-8 rounded-full object-cover outline-1 outline-offset-2 md:top-8 md:right-2 md:h-9 md:w-9 lg:top-6 lg:-right-2 lg:h-10 lg:w-10 xl:top-8 xl:-right-2 xl:h-8 xl:w-8 2xl:top-14 2xl:-right-2 2xl:h-10 2xl:w-10"
            src="user4.jpg"
            alt="user4"
          />
        </div>
      </div>
      <div className="bg-ocean-100/60 dark:text-charcoal-100 border-ocean-300 dark:bg-charcoal-700/80 dark:border-charcoal-700 col-span-5 max-h-auto rounded-3xl border p-4 md:col-span-3">
        <ul className="divide-y font-medium">
          <li className="flex items-center justify-between py-1 leading-none md:leading-normal">
            <span className="font-heading pr-2 text-3xl font-medium md:pr-0 md:text-base md:font-bold 2xl:text-3xl">
              01
            </span>{" "}
            <span className="2xl:text-lg">Real-time breach alerts</span>
          </li>
          <li className="flex items-center justify-between py-1 leading-none md:leading-normal">
            <span className="font-heading pr-2 text-3xl font-medium md:pr-0 md:text-base md:font-bold 2xl:text-3xl">
              02
            </span>
            <span className="2xl:text-lg">End-to-end encryption</span>
          </li>
          <li className="flex items-center justify-between py-1 leading-none md:leading-normal">
            <span className="font-heading pr-2 text-3xl font-medium md:pr-0 md:text-base md:font-bold 2xl:text-3xl">
              03
            </span>
            <span className="2xl:text-lg">Auto-password generation</span>
          </li>
          <li className="flex items-center justify-between py-1 leading-none md:leading-normal">
            <span className="font-heading pr-2 text-3xl font-medium md:pr-0 md:text-base md:font-bold 2xl:text-3xl">
              04
            </span>
            <span className="2xl:text-lg">Easy-to-use interface</span>
          </li>
        </ul>
      </div>
      <div className="bg-ocean-100/60 border-ocean-300 dark:bg-charcoal-700/80 dark:border-charcoal-700 col-span-5 flex h-full flex-col space-y-8 rounded-3xl border p-4 md:col-span-4 md:justify-between">
        <div>
          <h3 className="font-heading dark:text-charcoal-100 text-xl leading-none font-bold md:text-2xl">
            How Secure Are You?
          </h3>
          <p className="dark:text-charcoal-100 pt-1 leading-5">
            Find out how your current passwords stand up to breaches. Click to
            check your password health.
          </p>
        </div>
        <div className="flex justify-between">
          <div className="relative">
            <LockIcon />
          </div>
          <Button type="secondarysm">
            Check password health{" "}
            <HiOutlineArrowTopRightOnSquare size={16} className="mb-1 inline" />
          </Button>
        </div>
      </div>
      <div className="hidden md:col-span-1 md:flex md:flex-col md:justify-between md:gap-4">
        <div className="bg-ocean-100 dark:bg-charcoal-100 dark:border-charcoal-700 flex grow items-center justify-center rounded-3xl p-2 dark:border">
          <Button type="primarysm" onClick={() => navigate("/")}>
            <HiOutlineHome size={16} className="mb-1 inline" /> Home
          </Button>
        </div>
        <div className="bg-ocean-100 dark:bg-charcoal-100 dark:border-charcoal-700 flex grow items-center justify-center rounded-3xl p-2 dark:border">
          <ThemeSwitch />
        </div>
      </div>
    </>
  );
}

export default AuthBentoBox;
