import React from "react";
import { ISingleChildProps } from "../util/ISingleChildProps";
import { CssBaseline } from "@material-ui/core";

export function ThemeProvider(props: ISingleChildProps) {
  return (
    <>
      <CssBaseline />
      {props.children}
    </>
  )
}