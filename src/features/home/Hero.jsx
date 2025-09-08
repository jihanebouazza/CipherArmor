import {
  HiOutlineBellAlert,
  HiOutlineBolt,
  HiOutlineChartPie,
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import Button from "../../ui/Button";
import BentoBoxTag from "./BentoBoxTag";

function Hero() {
  return (
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
        <div className="bg-ocean-150 dark:bg-charcoal-600 dark:text-charcoal-100 shadow-ocean-200 dark:shadow-charcoal-600 w-full rounded-3xl p-4 shadow-sm">
          <h4 className="font-heading text-lg font-semibold">
            Trusted by users
          </h4>
          <p className="text-charcoal-800 dark:text-charcoal-200">
            Loved for security and simplicity.
          </p>
          <div>
            <BentoBoxTag
              Icon={<HiOutlineChartPie size={16} className="text-ocean-800" />}
              title="Smart insights"
            />
            <BentoBoxTag
              Icon={
                <HiOutlineShieldCheck size={16} className="text-ocean-800" />
              }
              title="Zero-knowledge"
            />
            <BentoBoxTag
              Icon={
                <HiOutlineLockClosed size={16} className="text-ocean-800" />
              }
              title="Strong Encryption"
            />
            {/* <div className="bg-ocean-500 ml-12 flex w-fit items-center gap-1.5 rounded-full px-1.5 py-1.5 text-sm">
              <HiOutlineBellAlert size={16} className="text-ocean-100" />
            </div>
            <div className="bg-butter-500 ml-12 flex w-fit items-center gap-1.5 rounded-full px-1.5 py-1.5 text-sm">
              <HiOutlineBolt size={16} className="text-ocean-100" />
            </div> */}
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
        <Button extraStyles="w-fit">Create Account</Button>
        {/* <p className="text-sm font-light text-charcoal-700 dark:text-charcoal-200">Join thousands of users who have upgraded their digital security. Fast, safe, and completely encrypted.</p> */}
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
      <div className="bg-ocean-150 dark:bg-charcoal-600 dark:text-charcoal-100 shadow-ocean-200 dark:shadow-charcoal-600 col-span-4 row-span-3 w-full rounded-3xl p-4 shadow-sm">
        hello3
      </div>
    </div>
  );
}

export default Hero;
