import React, { useState } from "react";
import { Box, TextField, Button, Typography, makeStyles, createStyles } from "@material-ui/core";
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

export function LoginPage() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    console.log(email);
    console.log(password);
  }

  return (
    <Box>
      <AuthHeader />
      <Box display="flex" flexDirection="column" margin="auto" marginTop="15%" width="30%" >
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} className={classes.textarea} />
        <TextField label="Passwort" value={password} onChange={e => setPassword(e.target.value)} type="password" margin="normal" className={classes.textarea} />
        <Button color="primary" variant="contained" onClick={onSubmit} >Login</Button>
        <Typography align="center" className={classes.paragraph}>Noch keinen Account? <Link to ="/register">Registrieren</Link></Typography>
      </Box>
    </Box>
  )
}