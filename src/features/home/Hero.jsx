import Button from "../../ui/Button";

function Hero() {
  return (
    <div className="grid h-screen flex-1 grid-cols-8 grid-rows-8 gap-4 px-8 pb-6">
      <div className="col-span-4 row-span-3 flex gap-4">
        <div className="bg-ocean-150 dark:bg-charcoal-600 dark:text-charcoal-100 shadow-ocean-200 dark:shadow-charcoal-600 w-full rounded-3xl p-4 shadow-sm">
          HI
        </div>
        <div className="bg-ocean-150 dark:bg-charcoal-600 dark:text-charcoal-100 shadow-ocean-200 dark:shadow-charcoal-600 w-full rounded-3xl p-4 shadow-sm">
          Hi
        </div>
      </div>
      <div className="dark:text-charcoal-100 col-span-4 row-span-5 flex w-full flex-col justify-between pb-4 px-2">
        <div>
          <h1 className="font-heading text-[48px] font-semibold leading-15">
            Say goodbye to Pa$$w0rds
          </h1>
          <h3 className="font-heading text-lg pt-1">
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
