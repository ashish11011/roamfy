import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

function ResponseRow({ item, index }) {
  return (
    <TableRow key={index}>
      <TableCell>
        <p className=" break-all whitespace-pre-wrap">{item.name}</p>
      </TableCell>
      <TableCell>
        <p className=" break-all whitespace-pre-wrap">{item.email}</p>
      </TableCell>
      <TableCell>{item.phone}</TableCell>
      <TableCell>
        <p className=" break-all whitespace-pre-wrap ">{item.location}</p>
      </TableCell>
      <TableCell>
        <p className=" w-80  break-all whitespace-pre-wrap ">{item.message}</p>
      </TableCell>
    </TableRow>
  );
}
export default ResponseRow;
