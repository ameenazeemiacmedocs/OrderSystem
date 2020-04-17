import React, { useRef, useEffect } from "react";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import { Typography, Button, Divider } from "@material-ui/core";
import clsx from "clsx";
import Background from "../images/bg.png";

import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    width: "100%",
    position: "fixed",
    zIndex: 0,
    left: 0,
    top: 0,
    // backgroundColor: "rgba(41,182,246 ,1)",
    backgroundImage: `url(${Background})`,
    overflowX: "hidden",
    transition: "0.5s",
    opacity: "0"
  },
  centerContent: {
    position: "relative",
    top: "30%",
    width: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "300px"
  },
  title: {
    color: "white",
    marginTop: "10px"
  },
  iconContainer: {
    width: "100px",
    height: "50px",
    marginBottom: "65px"
  },
  bgCircle: {
    borderRadius: "50%",
    backgroundColor: "white",
    width: "100px",
    height: "100px"
  },
  circleIcon: {
    fontSize: 65,
    color: "#03A9F4",
    padding: "15px",
    borderRadius: "50%",
    backgroundColor: "white",
    boxShadow: "0px 0px 25px #212121"
  }
}));

const SuccessOverlay = ({ open, message }) => {
  const classes = useStyles();
  const rootRef = useRef();

  useEffect(() => {
    if (open) {
      rootRef.current.style.opacity = "100";
      rootRef.current.style.zIndex = 1;
    } else {
      rootRef.current.style.opacity = "0";
      rootRef.current.style.zIndex = 0;
    }
  }, [open]);

  return (
    <div className={classes.root} ref={rootRef}>
      <div className={classes.centerContent}>
        <div className={classes.iconContainer}>
          {/* <div className={classes.bgCircle} /> */}
          <CheckIcon className={classes.circleIcon} />
        </div>
        <div className={classes.titleContainer}>
          <Typography variant="h5" className={classes.title}>
            {message}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SuccessOverlay;
