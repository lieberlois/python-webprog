import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

interface IDatePickerProps {
  readonly date?: Date;
  readonly setDate: (date: Date) => void;
  readonly disablePast?: boolean;
}

export function DatePicker(props: IDatePickerProps) {
  return (
    <KeyboardDatePicker
      variant="inline"
      format="dd.MM.yyyy"
      margin="normal"
      value={props.date}
      onChange={date => props.setDate(date as Date)}
      disablePast={props.disablePast}
    />
  )
}