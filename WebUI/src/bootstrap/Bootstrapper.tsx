import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { BrowserRouter, Switch } from "react-router-dom";
import { CurrentUserProvider } from "./CurrentUserProvider";
import { AuthRouting } from "./AuthRouting";

export function Bootstrapper() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CurrentUserProvider>
          <Switch>
            <AuthRouting />
          </Switch>
        </CurrentUserProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}