import { HiOutlinePlusCircle } from "react-icons/hi2";
import Button from "./Button";

function Table({ children }) {
  return <table className="w-full text-left">{children}</table>;
}

function Container({ children, width = "100%", title, count, action }) {
  return (
    <div
      className="border-charcoal-400 mx-auto rounded-2xl border px-5 py-4"
      style={{ width }}
    >
      <div className="flex justify-between">
        <h4 className="font-heading text-[24px] font-bold">
          {title}{" "}
          {count && <span className="text-sm font-medium">({count})</span>}
        </h4>
        {action}
      </div>
      {children}
    </div>
  );
}

Container.Action = function ContainerAction({ title }) {
  return (
    <Button>
      <HiOutlinePlusCircle size={18} className="mr-1 mb-0.5 inline" />
      <p>{title}</p>
    </Button>
  );
};

function Head({ children }) {
  return (
    <thead>
      <tr className="text-charcoal-700 dark:text-charcoal-200">{children}</tr>
    </thead>
  );
}
function HeadCell({ children, width }) {
  return (
    <th className="p-2 font-medium" style={{ width }}>
      {children}
    </th>
  );
}

function Body({ children }) {
  return <tbody>{children}</tbody>;
}

function Row({ children }) {
  return (
    <tr className="border-charcoal-400 border border-r-0 border-b-0 border-l-0">
      {children}
    </tr>
  );
}

function Cell({ children }) {
  return <td className="p-2">{children}</td>;
}

Table.Container = Container;
Table.Head = Head;
Table.HeadCell = HeadCell;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;

export default Table;
