import React from "react";
import { Route, Redirect } from "react-router";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { useCurrentUser } from "./CurrentUserProvider";
import { LayoutRoot } from "./LayoutRoot";

export function AuthRouting() {
  const { currentUser } = useCurrentUser();

  return (
    <>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      {
        !!currentUser 
        ? <LayoutRoot />
        : <Redirect to="/login" />
      }
    </>
  )
}