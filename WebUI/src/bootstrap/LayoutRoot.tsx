import React from "react";
import clsx from "clsx";
import { AppBar, makeStyles, Toolbar, IconButton, Box, Theme, createStyles, Drawer } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Routing } from "./Routing";
import { Header } from "../components/header/Header";
import { UserAvatar } from "../components/user/UserAvatar";
import { Sidebar } from "../components/sidebar/Sidebar";
import { useLocalStorage } from "../hooks/UseLocalStorage";

const drawerOpenWidth = 200;
const drawerClosedWidth = 64;
const sidebarOpenKey = "PYTHON_WEB_SIDEBAR_OPEN";

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
  const [sidebarOpen, setSidebarOpen] = useLocalStorage(sidebarOpenKey, true);
  
	return (
		<Box display="flex" height="100%" flexGrow={1}>
			<AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: sidebarOpen })}>
				<Toolbar>
					<Header classes={classes.header} />
          <UserAvatar />
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent"
				className={clsx(classes.drawer, { [classes.drawerOpen]: sidebarOpen, [classes.drawerClose]: !sidebarOpen })}
				classes={{ paper: clsx({ [classes.drawerOpen]: sidebarOpen, [classes.drawerClose]: !sidebarOpen }) }}
				open={sidebarOpen}
			>
        <div 
          className={classes.toolbar} 
          // TODO: darkmode handling
          // style={{ backgroundColor: appBarBackground }}
        >
					<Box marginLeft={1}>
						<IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
							<MenuIcon />
						</IconButton>
					</Box>
				</div>
        <Sidebar />
			</Drawer>
			<Box className={clsx({[classes.main]: !sidebarOpen, [classes.mainShift]: sidebarOpen})} display="flex" flexGrow="1" flexDirection="column">
				<div className={classes.toolbar} />
				<Routing />
			</Box>
		</Box>
	);
}