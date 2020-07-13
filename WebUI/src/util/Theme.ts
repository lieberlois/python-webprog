import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { Overrides } from "@material-ui/core/styles/overrides";

const overrides: Overrides = {
  MuiCircularProgress: {

  }
}

export const theme = createMuiTheme({
  overrides
});