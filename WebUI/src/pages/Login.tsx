import React, { useState } from "react";
import { Box, TextField, Button, Typography, makeStyles, createStyles, CircularProgress } from "@material-ui/core";
import { AuthHeader } from "../components/header/AuthHeader";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "../util/agent";
import { bearerTokenKey } from "../util/Auth";
import { useCurrentUser } from "../bootstrap/CurrentUserProvider";

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
  const [loggingIn, setLoggingIn] = useState(false);
  const history = useHistory();

  const { setCurrentUser } = useCurrentUser();

  const onSubmit = async () => {
    setLoggingIn(true);
    const response = await Auth.login(username, password);
    localStorage.setItem(bearerTokenKey, response.access_token);
    const user = await Auth.me();
    setCurrentUser(user);
    setLoggingIn(false);
    history.push("/home");
  }

  return (
    <Box>
      <AuthHeader />
      {
        loggingIn
          ? <CircularProgress />
          : <Box display="flex" flexDirection="column" margin="auto" marginTop="15%" width="30%" >
            <TextField label="Nutzername" value={username} onChange={e => setUsername(e.target.value)} className={classes.textarea} />
            <TextField label="Passwort" value={password} onChange={e => setPassword(e.target.value)} type="password" margin="normal" className={classes.textarea} />
            <Button color="primary" variant="contained" onClick={onSubmit} >Login</Button>
            <Typography align="center" className={classes.paragraph}>Noch keinen Account? <Link to="/register">Registrieren</Link></Typography>
          </Box>
      }

    </Box>
  )
}