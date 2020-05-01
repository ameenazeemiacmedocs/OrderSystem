import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Avatar, makeStyles, useTheme } from "@material-ui/core";
// import InfoIcon from "@material-ui/icons/Info";
// import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles(theme => ({
  contentContainer: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    // backgroundColor: "lightgreen"
    backgroundColor: theme.palette.primary.main,
    color: "white"
  },
  dialogText: {
    width: "100%"
  },
  iconInfo: {
    width: "100px",
    height: "100px",
    marginLeft: "10px",
    marginTop: "10px"
    // backgroundColor: "lightblue"
  }
}));

const AlertDialog = ({
  open,
  close,
  title = "Alert",
  text = "",
  logo,
  variant = "primary"
}) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={close}>
      <div className={classes.dialogText}>
        <DialogTitle
          className={classes.title}
          style={{ backgroundColor: theme.palette[variant].main }}
        >
          {title}
        </DialogTitle>
      </div>
      <div className={classes.contentContainer}>
        <Avatar
          variant="rounded"
          alt="logo"
          src={logo}
          className={classes.iconInfo}
        />
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
      </div>
      <DialogActions>
        <Button
          onClick={close}
          color={variant === "error" ? "secondary" : "primary"}
          variant="outlined"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
