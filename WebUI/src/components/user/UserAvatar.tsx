import React, { useState } from "react";
import { Avatar, Button, Popover, Typography, List, ListItem, Divider } from "@material-ui/core";
import { useCurrentUser } from "../../bootstrap/CurrentUserProvider";
import { deleteBearerToken } from "../../util/Auth";
import { useHistory } from "react-router";

export function UserAvatar() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement | null>(null);
  const history = useHistory();

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const logout = () => {
    setCurrentUser(null);
    deleteBearerToken();
    setAnchorEl(null);
    history.push("/login");
  }

  return (
    <>
      <Button onClick={event => setAnchorEl(event.currentTarget)}>
        <Avatar>{currentUser!.first_name.substring(0, 1)}{currentUser!.last_name.substring(0, 1)}</Avatar>
      </Button>
      <Popover
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleMenuClose}
        keepMounted
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <List>
          <ListItem><Typography variant="subtitle1">{currentUser!.first_name} {currentUser!.last_name}</Typography></ListItem>
          <Divider />
          <ListItem button onClick={logout}><Typography variant="button">Logout</Typography></ListItem>
        </List>
      </Popover>
    </>
  );
}