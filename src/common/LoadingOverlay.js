import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    width: "100%",
    position: "fixed",
    zIndex: 0,
    left: 0,
    top: 0,
    backgroundColor: "rgba(128,128,128, 0.5)",
    overflowX: "hidden",
    transition: "0.5s",
    opacity: "0"
  },
  centerContent: {
    position: "relative",
    top: "50%",
    width: "100%",
    textAlign: "center"
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainer: {
    width: "100px",
    height: "50px"
  }
}));

const LoadingOverlay = ({ open, title }) => {
  const classes = useStyles();
  const oRef = useRef();

  useEffect(() => {
    if (open) {
      oRef.current.style.opacity = "100";
      oRef.current.style.zIndex = 1;
    } else {
      oRef.current.style.opacity = "0";
      oRef.current.style.zIndex = 0;
    }
  }, [open]);

  return (
    <div className={classes.root} ref={oRef}>
      <div className={classes.centerContent}>
        <div className={classes.titleContainer}>
          <div className={classes.iconContainer}>
            <CircularProgress />
          </div>
          <Typography variant="h5" style={{ marginTop: "5px" }}>
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
