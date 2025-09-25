function FeatureItem({ Icon, num, title, description }) {
  return (
    <div className="dark:border-charcoal-400 border-ocean-500 shadow-ocean-200 dark:shadow-charcoal-600 w-full rounded-3xl border p-4 shadow-sm">
      <div className="flex justify-end">
        <p className="font-heading text-ocean-900 font-semibold dark:text-charcoal-300">{num}</p>
      </div>
      <div className="pt-14">
        <div className="bg-ocean-150 dark:bg-charcoal-600 w-fit rounded-full p-3">
          {Icon}
        </div>
        <h4 className="font-heading pt-1 text-lg font-semibold">{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default FeatureItem;
