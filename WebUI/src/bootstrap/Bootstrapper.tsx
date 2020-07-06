import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import { LayoutRoot } from "./LayoutRoot";

export function Bootstrapper() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <LayoutRoot />
      </BrowserRouter>
    </ThemeProvider>
  )
}