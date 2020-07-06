import React, { useState } from "react";
import { Box, TextField, Button, Typography, createStyles, makeStyles } from "@material-ui/core";
import { AuthHeader } from "../components/header/AuthHeader";
import { Link } from "react-router-dom";

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const onSubmit = () => {

  }

  return (
    <Box>
      <AuthHeader />
      <Box display="flex" flexDirection="column" margin="auto" marginTop="10%" width="30%" >
        <TextField label="Vorname" value={firstName} onChange={e => setFirstName(e.target.value)} className={classes.textarea} />
        <TextField label="Nachname" value={lastName} onChange={e => setLastName(e.target.value)} className={classes.textarea} />
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} className={classes.textarea} />
        <TextField label="Passwort" value={password} onChange={e => setPassword(e.target.value)} type="password" className={classes.textarea} />
        <TextField label="Passwort bestätigen" value={confPassword} onChange={e => setConfPassword(e.target.value)} type="password" className={classes.textarea} />
        <Button color="primary" variant="contained" onClick={onSubmit} >Register</Button>
        <Typography align="center" className={classes.paragraph}>Sie haben bereits einen Account? <Link to ="/login">Login</Link></Typography>
      </Box>
    </Box>
  )
}