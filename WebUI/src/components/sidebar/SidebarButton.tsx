import React from "react";
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";

interface ISidebarButtonProps {
  readonly route: string;
  readonly text: string;
  readonly icon: React.ReactElement;
}

export function SidebarButton(props: ISidebarButtonProps) {
  const selected = !!useRouteMatch({ path: props.route });

  return (
    <ListItem button component={Link} to={props.route} selected={selected} >
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText>{props.text}</ListItemText>
    </ListItem>
  )
}