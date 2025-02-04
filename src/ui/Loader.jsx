function Loader({
  firstColor = "#0049c6",
  secondColor = "#fafcff",
  borderWidth = 8,
  width = 50,
}) {
  return (
    <div
      className="loader text-center"
      style={{
        width: `${width}px`,
        borderColor: `${firstColor} ${secondColor}`,
        borderWidth: `${borderWidth}px`,
      }}
    ></div>
  );
}

export default Loader;
