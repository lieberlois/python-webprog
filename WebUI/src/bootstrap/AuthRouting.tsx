import React, { useState } from "react";
import { Route, Redirect } from "react-router";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { useCurrentUser } from "./CurrentUserProvider";
import { LayoutRoot } from "./LayoutRoot";
import { useAsyncEffect } from "../hooks/UseAsyncEffect";
import { Auth } from "../util/agent";
import { CircularProgress } from "@material-ui/core";

export function AuthRouting() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [authenticating, setAuthenticating] = useState(true);

  // try to authenticate with the backend on page reload once, if currentUser wasn't set it means we had a 401 and the saved token was invalid
  useAsyncEffect(async () => {
    setAuthenticating(true);
    try {
      const me = await Auth.me();
      setCurrentUser(me);
    } catch (e) { /* we can ignore the error here because it just means that either no token was saved or the token was invalid */ }
    setAuthenticating(false);
  }, []);

  return (
    authenticating
      ? <CircularProgress />
      : <>
        {
          !currentUser
            ? <>
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Redirect to="/login" />
            </>
            : <LayoutRoot />
        }
      </>
  )
}