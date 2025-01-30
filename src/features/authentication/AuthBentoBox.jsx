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
        <h3 className="font-heading inline text-2xl font-bold">
          Total Security at Your Fingertips
        </h3>
        <p className="dark:text-charcoal-800">
          Effortlessly safeguard your passwords and stay ahead of breaches.
        </p>
        <div className="flex items-center gap-4 pt-1">
          <div>
            <p className="font-heading text-ruby-600 dark:text-ruby-900 text-5xl leading-none font-bold">
              90%
            </p>
          </div>
          <p className="dark:text-charcoal-700 leading-4">
            With our app, stay ahead of threats with real-time protection and
            encrypted security for your accounts.
          </p>
        </div>
        <p className="leading-none font-light italic">
          of online accounts are compromised due to weak security practices.
        </p>
      </div>

      <div className="bg-ocean-100/60 border-ocean-300 dark:bg-charcoal-700/80 dark:border-charcoal-700 col-span-2 rounded-3xl border p-4">
        <h2 className="font-heading dark:text-charcoal-100 text-[32px] leading-none font-bold">
          100K+
        </h2>
        <p className="dark:text-charcoal-100 leading-5">
          users stay ahead of threats with our app.
        </p>
        <div className="relative">
          <img
            className="dark:outline-charcoal-600 outline-ocean-900 absolute top-2 -left-0.5 aspect-auto h-12 w-12 rounded-full object-cover outline-1 outline-offset-2"
            src="user1.jpg"
            alt="user1"
          />
          <img
            className="dark:outline-charcoal-600 outline-ocean-900 absolute top-8 left-14 h-9 w-9 rounded-full object-cover outline-1 outline-offset-2"
            src="user2.jpg"
            alt="user2"
          />
          <img
            className="dark:outline-charcoal-600 outline-ocean-900 absolute top-1.5 right-8 h-13 w-13 rounded-full object-cover outline-1 outline-offset-2"
            src="user3.jpg"
            alt="user3"
          />
          <img
            className="dark:outline-charcoal-600 outline-ocean-900 absolute top-8 -right-2 h-8 w-8 rounded-full object-cover outline-1 outline-offset-2"
            src="user4.jpg"
            alt="user4"
          />
        </div>
      </div>
      <div className="bg-ocean-100/60 dark:text-charcoal-100 border-ocean-300 dark:bg-charcoal-700/80 dark:border-charcoal-700 col-span-3 rounded-3xl border p-4">
        <ul className="divide-y font-medium">
          <li className="flex items-center justify-between py-1">
            <span className="font-heading font-bold">01</span>{" "}
            <span className="">Real-time breach alerts</span>
          </li>
          <li className="flex items-center justify-between py-1">
            <span className="font-heading font-bold">02</span>
            <span className="">End-to-end encryption</span>
          </li>
          <li className="flex items-center justify-between py-1">
            <span className="font-heading font-bold">03</span>
            <span className="">Auto-password generation</span>
          </li>
          <li className="flex items-center justify-between py-1">
            <span className="font-heading font-bold">04</span>
            <span className="">Easy-to-use interface</span>
          </li>
        </ul>
      </div>
      <div className="bg-ocean-100/60 border-ocean-300 dark:bg-charcoal-700/80 dark:border-charcoal-700 col-span-4 flex flex-col justify-between rounded-3xl border p-4">
        <div>
          <h3 className="font-heading dark:text-charcoal-100 text-2xl leading-none font-bold">
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
            Check your password&apos;s health{" "}
            <HiOutlineArrowTopRightOnSquare size={16} className="mb-1 inline" />
          </Button>
        </div>
      </div>
      <div className="col-span-1 flex flex-col justify-between gap-4">
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
