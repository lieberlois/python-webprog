import React from "react";
import MuiDialog from "@material-ui/core/Dialog";
import { ISingleChildProps } from "../../util/ISingleChildProps";
import { DialogContent } from "@material-ui/core";

interface IDialogProps {
  readonly isOpen: boolean
  readonly onClose: () => void;
  readonly maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  readonly disableBackdropClick?: boolean;
}

export function Dialog(props: IDialogProps & ISingleChildProps) {
  return (
    <MuiDialog
      open={props.isOpen}
      onClose={props.onClose}
      fullWidth
      scroll="paper"
      maxWidth={props.maxWidth}
      disableBackdropClick={props.disableBackdropClick}
    >
      <DialogContent>
        {props.children}
      </DialogContent>
    </MuiDialog>
  );
}