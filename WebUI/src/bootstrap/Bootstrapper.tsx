import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { CurrentUserProvider } from "./CurrentUserProvider";
import { AuthRouting } from "./AuthRouting";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { CssBaseline } from "@material-ui/core";

export function Bootstrapper() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CurrentUserProvider>
          <Switch>
            <AuthRouting />
          </Switch>
        </CurrentUserProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  )
}