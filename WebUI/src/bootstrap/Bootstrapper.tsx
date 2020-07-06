import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LayoutRoot } from "./LayoutRoot";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";

export function Bootstrapper() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <LayoutRoot />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}