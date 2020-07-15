import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { BrowserRouter, Switch } from "react-router-dom";
import { CurrentUserProvider } from "./CurrentUserProvider";
import { AuthRouting } from "./AuthRouting";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

export function Bootstrapper() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CurrentUserProvider>
            <Switch>
              <AuthRouting />
            </Switch>
          </CurrentUserProvider>
        </MuiPickersUtilsProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}