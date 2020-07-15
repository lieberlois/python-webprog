import React from "react";
import { TextField } from "@material-ui/core";

interface INumberTextInputProps {
  readonly value: string | undefined;
  readonly setValue: (newValue: string) => void;
  readonly label: string;
  readonly classes?: string;
  readonly floatNumbers?: boolean;
  readonly disabled?: boolean;
}

export function NumberTextInput(props: INumberTextInputProps) {
  const handleChange = (newValue: string) => {
    if(props.floatNumbers) {
      if(/^\d+\.?\d*$/.test(newValue))
        props.setValue(newValue);
    } else {
      if(/^\d+$/.test(newValue))
        props.setValue(newValue);
    }
  }

  return (
    <TextField label={props.label} value={props.value || ""} onChange={e => handleChange(e.target.value)} className={props.classes} disabled={props.disabled} />
  )
}