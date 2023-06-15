import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ columns, data, display }) => {
  // console.log(columns);
  return (
    <table className="table">
      <TableHeader columns={columns} />
      <TableBody data={data} display={display} />
    </table>
  );
};

export default Table;
