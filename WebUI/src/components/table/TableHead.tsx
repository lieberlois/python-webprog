import React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";

interface ITableHeaderProps {
  // these need to be the same length
  readonly headers: string[];
  readonly alignments: ("inherit" | "left" | "right" | "center" | "justify" | undefined)[];
}

export function TableHeader(props: ITableHeaderProps) {
  return (
    <TableHead>
      <TableRow>
        {props.headers.map((header, index) => (<TableCell align={props.alignments[index]} key={index}>{header}</TableCell>))}
        <TableCell align="right" />
      </TableRow>
    </TableHead>
  )
}