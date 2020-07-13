import React from "react";
import { Avatar } from "@material-ui/core";
import { useCurrentUser } from "../../bootstrap/CurrentUserProvider";

export function UserAvatar() {
  const { currentUser } = useCurrentUser();

  return (
    <Avatar>{currentUser!.first_name.substring(0, 1)}{currentUser!.last_name.substring(0, 1)}</Avatar>
  );
}