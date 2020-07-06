import React from "react";
import { Box, List } from "@material-ui/core";
import { SidebarButton } from "./SidebarButton";
import HomeIcon from "@material-ui/icons/Home";
import SchoolIcon from '@material-ui/icons/School';

export function Sidebar() {
  return (
    <Box overflow="hidden">
      <List>
        <SidebarButton route="/home" text="Home" icon={<HomeIcon />} />
        <SidebarButton route="/exam" text="Prüfungen" icon={<SchoolIcon />} />
      </List>
    </Box>
  )
}