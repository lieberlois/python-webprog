import React from "react";
import { Typography, Box } from "@material-ui/core";

interface IHeaderProps {
  readonly classes: string;
}

export function Header(props: IHeaderProps) {
  return (
    <Box marginLeft="10px" className={props.classes}>
      <Typography variant="h6" noWrap >Prüfungsüberblick</Typography>
    </Box>
  );
}