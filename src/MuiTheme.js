//import "./App.css";
import { createMuiTheme } from "@material-ui/core";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Button,
  MuiListItemText
} from "@material-ui/core";
// import { GothamRoundedBold } from "./assets/fonts/GothamRounded-Bold.woff";
// import { GothamRoundedLightItalic } from "./assets/fonts/GothamRounded-LightItalic.woff";

// const gothamFont = {
//   fontFamily: "GothamRounded",
//   fontStyle: "normal",
//   //fontDisplay: "swap",
//   fontWeight: 300,
//   src: `
//   local('GothamRoundedLightItalic'),
//   url(${GothamRoundedLightItalic})
// `
// };

const gFonts = {
  fontFamily: "Indie Flower"
};

// const MUI_THEME = createMuiTheme({
//   typography: {
//     fontFamily: [
//       'Indie Flower',
//       'cursive'
//       // "'Helvetica Neue'",
//       // "Helvetica",
//       // "Arial",
//       // "sans-serif"
//     ].join(","),
//     fontSize: "18px",
//     fontWeightLight: "300",
//     fontWeightRegular: "400",
//     fontWeightMedium: "700"
//   },
//   overrides: {
//     MuiCssBaseline: {
//       "@global": {
//         "@font-family": [gFonts]
//       }
//     }
//   }
// });
const MUI_THEME = createMuiTheme({
  typography: {
    fontFamily: ["Nunito Sans"].join(","),
    fontSize: 14,
    fontWeightLight: "300",
    fontWeightRegular: "400",
    button: {
      fontSize: "5rem"
    }
    // listItemText: { fontSize: "10rem" }
    //MuiListItemText-root: { fontSize: "5rem" }
  },
  overrides: {
    // MuiTypography: { fontSize: "5rem" },
    MuiList: {
      root: { fontSize: "5rem" }
    }

    // MuiButton: {
    //   // Name of the rule
    //   text: {
    //     // Some CSS,
    //     background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    //     borderRadius: 3,
    //     border: 0,
    //     color: "white",
    //     height: 48,
    //     padding: "0 30px",
    //     boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
    //   }
    // }
  }
});
export default MUI_THEME;
