function Hero() {
  // rounded-3xl
  return (
    <div className="grid h-screen flex-1 grid-cols-8 grid-rows-8 gap-4 px-8 pb-6">
      <div className="col-span-4 row-span-4 flex gap-4">
        <div className="bg-ocean-400 w-full rounded-3xl p-4">HI</div>
        <div className="bg-ocean-200 w-full rounded-3xl p-4">Hi</div>
      </div>
      <div className="bg-ocean-300 col-span-4 row-span-5 w-full rounded-3xl p-4">
        hello1
      </div>
      <div className="bg-ocean-300 col-span-4 row-span-4 w-full rounded-3xl p-4">
        hello2
      </div>
      <div className="bg-ocean-300 col-span-4 row-span-3 w-full rounded-3xl p-4">
        hello3
      </div>
    </div>
  );
}

export default Hero;
