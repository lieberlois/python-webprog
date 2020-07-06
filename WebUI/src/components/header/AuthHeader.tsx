import React from "react";
import { AppBar, Toolbar, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Header } from "./Header";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      width: "100%",
      zIndex: theme.zIndex.drawer + 1
    },
    header: {
      flexGrow: 1
    }
  })
);

export function AuthHeader() {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Header classes={classes.header} />
      </Toolbar>
    </AppBar>
  );
}