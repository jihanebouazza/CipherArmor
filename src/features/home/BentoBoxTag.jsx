function BentoBoxTag({ Icon, title = "" }) {
  return (
    <div className="border-ocean-800 flex w-fit items-center gap-1.5 rounded-2xl border px-3 py-0.5 text-sm">
      {Icon}
      <span>{title}</span>
    </div>
  );
}

export default BentoBoxTag;
