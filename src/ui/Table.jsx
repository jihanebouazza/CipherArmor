import { createContext, useContext } from "react";

const TableContext = createContext();

function Container({ children, width = "100%", title, count, actions }) {
  return (
    <div
      className="border-charcoal-400 mx-auto rounded-2xl border px-5 py-4"
      style={{ width }}
    >
      <div className="flex flex-col gap-2 lg:flex-row lg:justify-between">
        <h4 className="font-heading text-[24px] font-bold">
          {title}{" "}
          {count > 0 && <span className="text-sm font-medium">({count})</span>}
        </h4>
        {actions}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

function Table({
  children,
  emptyErrorMessage = "No data found!",
  columnsCount = 1,
}) {
  return (
    <TableContext.Provider value={{ emptyErrorMessage, columnsCount }}>
      <table className="w-full text-left">{children}</table>
    </TableContext.Provider>
  );
}

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

function Body({ data, render }) {
  if (!data?.length) return <Error />;
  return <tbody>{data.map(render)}</tbody>;
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

function Error() {
  const { emptyErrorMessage, columnsCount } = useContext(TableContext);
  return (
    <tbody>
      <tr className="border-charcoal-400 border border-r-0 border-b-0 border-l-0">
        <td colSpan={columnsCount} className="py-3 text-center">
          {emptyErrorMessage}
        </td>
      </tr>
    </tbody>
  );
}

function Footer({ children }) {
  const { columnsCount } = useContext(TableContext);

  return (
    <tfoot>
      <tr className="border-charcoal-400 border border-r-0 border-b-0 border-l-0">
        <td colSpan={columnsCount} className="pt-3 text-center">
          {children}
        </td>
      </tr>
    </tfoot>
  );
}

Table.Container = Container;
Table.Head = Head;
Table.HeadCell = HeadCell;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
Table.Footer = Footer;

export default Table;
