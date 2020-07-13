import React from "react";
import { ISingleChildProps } from "../util/ISingleChildProps";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { theme } from "../util/Theme";

export function ThemeProvider(props: ISingleChildProps) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  )
}