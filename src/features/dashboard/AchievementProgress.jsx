function AchievementProgress({
  title,
  percentage,
  description,
  barColor,
  titleColor,
  progressLabel,
}) {
  return (
    <div className="py-2">
      <div className={`${titleColor} flex items-center justify-between`}>
        <p className="font-medium">{title}</p>
        <p className="">{progressLabel}</p>
      </div>

      <div
        className="bg-charcoal-200 my-0.5 h-1.5 w-full overflow-hidden rounded-full"
        role="progressbar"
      >
        <div
          className={`${barColor} h-full transition-all duration-500 ease-out`}
          style={{ width: percentage }}
        ></div>
      </div>

      <p className="text-charcoal-600 dark:text-charcoal-300 text-sm">
        {description}
      </p>
    </div>
  );
}

export default AchievementProgress;
