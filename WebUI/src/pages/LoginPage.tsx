import React, { useState } from "react";
import { Box, TextField, Button, Typography, makeStyles, createStyles } from "@material-ui/core";
import { AuthHeader } from "../components/header/AuthHeader";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "../util/agent";
import { useCurrentUser } from "../bootstrap/CurrentUserProvider";
import { setBearerToken } from "../util/Auth";

const useStyles = makeStyles(() =>
  createStyles({
    paragraph: {
      marginTop: "10px"
    },
    textarea: {
      marginBottom: "10px"
    }
  })
);

export function LoginPage() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // errors
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loggingIn, setLoggingIn] = useState(false);
  const { setCurrentUser } = useCurrentUser();
  const history = useHistory();

  const onSubmit = async () => {
    setLoggingIn(true);
    if(username.trim().length === 0 || password.trim().length === 0) {
      setUsernameError(username.trim().length === 0 ? "Nutzername darf nicht leer sein" : "");
      setPasswordError(password.trim().length === 0 ? "Passwort darf nicht leer sein": "");
      setLoggingIn(false);
      return;
    }
    try {
      const response = await Auth.login(username, password);
      setBearerToken(response.access_token);
      const user = await Auth.me();
      setCurrentUser(user);
      setLoggingIn(false);
      history.push("/home");
    } catch (error) {
      if (error.response.data.detail === "user not found") {
        setUsernameError("Nutzer existiert nicht");
      }
      if (error.response.data.detail === "wrong password") {
        setPasswordError("Falsches Passwort");
      }
      setLoggingIn(false);
    }
  }

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setUsernameError("");
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError("");
  }

  return (
    <Box>
      <AuthHeader />
      <Box display="flex" flexDirection="column" margin="auto" marginTop="15%" width="30%" >
        <TextField
          label="Nutzername"
          value={username}
          onChange={e => handleUsernameChange(e.target.value)}
          error={!!usernameError}
          helperText={usernameError}
          className={classes.textarea}
        />
        <TextField
          label="Passwort"
          value={password}
          onChange={e => handlePasswordChange(e.target.value)}
          type="password"
          margin="normal"
          error={!!passwordError}
          helperText={passwordError}
          className={classes.textarea}
        />
        <Button color="primary" variant="contained" onClick={onSubmit} disabled={loggingIn}>Login</Button>
        <Typography align="center" className={classes.paragraph}>Noch keinen Account? <Link to="/register">Registrieren</Link></Typography>
      </Box>
    </Box>
  )
}