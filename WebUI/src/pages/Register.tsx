import React, { useState } from "react";
import { Box, TextField, Button, Typography, createStyles, makeStyles } from "@material-ui/core";
import { AuthHeader } from "../components/header/AuthHeader";
import { Link, useHistory } from "react-router-dom";
import { IUser } from "../models/user";
import { Auth } from "../util/agent";
import { useSetCurrentUser } from "../bootstrap/CurrentUserProvider";

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

export function RegisterPage() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const history = useHistory();

  const setCurrentUser = useSetCurrentUser();

  const onSubmit = async () => {
    const user: IUser = {
      first_name: firstName,
      last_name: lastName,
      username,
      email, 
      password
    };
    const response = await Auth.register(user);
    console.log(response);
    history.push("/home");
  }

  return (
    <Box>
      <AuthHeader />
      <Box display="flex" flexDirection="column" margin="auto" marginTop="10%" width="30%" >
        <TextField label="Nutzername" value={username} onChange={e => setUsername(e.target.value)} className={classes.textarea} />
        <TextField label="Vorname" value={firstName} onChange={e => setFirstName(e.target.value)} className={classes.textarea} />
        <TextField label="Nachname" value={lastName} onChange={e => setLastName(e.target.value)} className={classes.textarea} />
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} className={classes.textarea} />
        <TextField label="Passwort" value={password} onChange={e => setPassword(e.target.value)} type="password" className={classes.textarea} />
        <TextField label="Passwort bestätigen" value={confPassword} onChange={e => setConfPassword(e.target.value)} type="password" className={classes.textarea} />
        <Button color="primary" variant="contained" onClick={onSubmit} >Registrieren</Button>
        <Typography align="center" className={classes.paragraph}>Sie haben bereits einen Account? <Link to ="/login">Login</Link></Typography>
      </Box>
    </Box>
  )
}