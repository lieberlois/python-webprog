import React, { useState, useContext } from "react";
import { ISingleChildProps } from "../util/ISingleChildProps";
import { IUser } from "../models/user";

type User = IUser | null;
type UserContext = [User, (user: User) => void];
const CurrentUserContext = React.createContext<UserContext>([null, null!]);

export function CurrentUserProvider(props: ISingleChildProps) {
  const [currentUser, setCurrentUser] = useState<User>(null);

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser(): UserContext {
  return useContext(CurrentUserContext);
}

export function useSetCurrentUser(): (user: User) => void {
  return useContext(CurrentUserContext)[1];
}

