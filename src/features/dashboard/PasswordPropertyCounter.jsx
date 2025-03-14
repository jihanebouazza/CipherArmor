import Button from "../../ui/Button";

function PasswordPropertyCounter({ value, increase, decrease, title }) {
  return (
    <div className="flex items-center justify-between">
      <p className="dark:text-charcoal-50 font-medium">{title}</p>
      <div className="flex items-center gap-2">
        <Button type="primaryxs" onClick={increase}>
          +
        </Button>
        <p className="dark:text-charcoal-50">{value}</p>
        <Button disabled={value === 0} type="rawxs" onClick={decrease}>
          -
        </Button>
      </div>
    </div>
  );
}

export default PasswordPropertyCounter;
