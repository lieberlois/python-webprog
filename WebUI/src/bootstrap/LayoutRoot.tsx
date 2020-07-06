import React, { useState } from "react";
import clsx from "clsx";
import { AppBar, makeStyles, Toolbar, IconButton, Box, Theme, createStyles, Drawer, List, ListItem, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Routing } from "./Routing";
import { Header } from "../components/header/Header";

const drawerOpenWidth = 240;
const drawerClosedWidth = 60;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			marginLeft: drawerClosedWidth,
			width: `calc(100% - ${drawerClosedWidth}px)`,
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
      })
		},
		appBarShift: {
			marginLeft: drawerOpenWidth,
			width: `calc(100% - ${drawerOpenWidth}px)`,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
    },
    header: {
      flexGrow: 1
    },
		drawer: {
			width: drawerOpenWidth,
			flexShrink: 0,
			whiteSpace: "nowrap",
		},
		drawerOpen: {
			width: drawerOpenWidth,
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: "hidden",
			width: drawerClosedWidth,
		},
		toolbar: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			...theme.mixins.toolbar,
		},
		mainShift: {
			width: `calc(100% - ${drawerOpenWidth}px)`
		},
		main: {
			width: `calc(100% - ${drawerClosedWidth}px)`,
		}
	}),
);

export function LayoutRoot() {
	const classes = useStyles();
	const [sideBarOpen, setSideBarOpen] = useState(true);

	return (
		<Box display="flex" height="100%" flexGrow={1}>
			<AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: sideBarOpen })}>
				<Toolbar>
					<Header classes={classes.header} />
          <Typography variant="h6" noWrap>Login</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent"
				className={clsx(classes.drawer, { [classes.drawerOpen]: sideBarOpen, [classes.drawerClose]: !sideBarOpen })}
				classes={{ paper: clsx({ [classes.drawerOpen]: sideBarOpen, [classes.drawerClose]: !sideBarOpen }) }}
				open={sideBarOpen}
			>
        <div 
          className={classes.toolbar} 
          // TODO: darkmode handling
          // style={{ backgroundColor: appBarBackground }}
        >
					<Box marginLeft={1}>
						<IconButton onClick={() => setSideBarOpen(!sideBarOpen)}>
							<MenuIcon />
						</IconButton>
					</Box>
				</div>


        <Box overflow="hidden">
          <List>
            <ListItem>
              <Typography variant="h6" noWrap>EXAM</Typography>
            </ListItem>
          </List>
        </Box>


			</Drawer>
			<Box className={clsx({[classes.main]: !sideBarOpen, [classes.mainShift]: sideBarOpen})} display="flex" flexGrow="1" flexDirection="column">
				<div className={classes.toolbar} />
				<Routing />
			</Box>
		</Box>
	);
}