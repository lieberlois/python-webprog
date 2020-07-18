import React, { useState } from "react";
import { Box, TextField, Button, Typography, createStyles, makeStyles } from "@material-ui/core";
import { AuthHeader } from "../components/header/AuthHeader";
import { Link, useHistory } from "react-router-dom";
import { IUser } from "../models/user";
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

export function RegisterPage() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confPasswordError, setConfPasswordError] = useState("");

  const [registrating, setRegistrating] = useState(false);
  const history = useHistory();
  const { setCurrentUser } = useCurrentUser();

  const checkInputs = () => {
    let returnValue = false;
    if(username.trim().length === 0) {
      setUsernameError("Nutzername darf nicht leer sein");
      returnValue = true;
    }
    if(firstName.trim().length === 0) {
      setFirstNameError("Vorname darf nicht leer sein");
      returnValue = true;
    }
    if(lastName.trim().length === 0) {
      setLastNameError("Nachname darf nicht leer sein");
      returnValue = true;
    }
    if(email.trim().length === 0) {
      setEmailError("Email darf nicht leer sein");
      returnValue = true;
    }
    if(password.trim().length === 0) {
      setPasswordError("Passwort darf nicht leer sein");
      returnValue = true;
    }
    if(password.trim() !== confPassword.trim()) {
      setConfPasswordError("Passwörter stimmen nicht überein");
      returnValue = true;
    }
    return returnValue;
  }

  const onSubmit = async () => {
    setRegistrating(true);
    if(checkInputs()) {
      setRegistrating(false);
      return;
    }
    const user: IUser = {
      first_name: firstName,
      last_name: lastName,
      username, email, password
    };
    try {
      const response = await Auth.register(user);
      setBearerToken(response.access_token);
      const me = await Auth.me();
      setCurrentUser(me);
      setRegistrating(false);
      history.push("/home");
    } catch(error) {
      if(error.response.data.detail === "Username already exists") {
        setUsernameError("Nutzername existiert schon");
      }
      setRegistrating(false);
    }
  }

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setUsernameError("");
  }

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    setFirstNameError("");
  }

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    setLastNameError("");
  }

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError("");
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError("");
  }

  const handleConfPasswordChange = (value: string) => {
    setConfPassword(value);
    setConfPasswordError("");
  }

  return (
    <Box>
      <AuthHeader />
      <Box display="flex" flexDirection="column" margin="auto" marginTop="10%" width="30%" >
        <TextField label="Nutzername" value={username} onChange={e => handleUsernameChange(e.target.value)} error={!!usernameError} helperText={usernameError} className={classes.textarea} />
        <TextField label="Vorname" value={firstName} onChange={e => handleFirstNameChange(e.target.value)} error={!!firstNameError} helperText={firstNameError} className={classes.textarea} />
        <TextField label="Nachname" value={lastName} onChange={e => handleLastNameChange(e.target.value)} error={!!lastNameError} helperText={lastNameError} className={classes.textarea} />
        <TextField label="Email" value={email} onChange={e => handleEmailChange(e.target.value)} error={!!emailError} helperText={emailError} className={classes.textarea} />
        <TextField label="Passwort" value={password} onChange={e => handlePasswordChange(e.target.value)} type="password" error={!!passwordError} helperText={passwordError} className={classes.textarea} />
        <TextField label="Passwort bestätigen" value={confPassword} onChange={e => handleConfPasswordChange(e.target.value)} type="password" error={!!confPasswordError} helperText={confPasswordError} className={classes.textarea} />
        <Button color="primary" variant="contained" onClick={onSubmit} disabled={registrating} >Registrieren</Button>
        <Typography align="center" className={classes.paragraph}>Sie haben bereits einen Account? <Link to="/login">Login</Link></Typography>
      </Box>
    </Box>
  )
}