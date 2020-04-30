import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import {
  Grid,
  IconButton,
  Button,
  Box,
  TextField,
  InputAdornment,
  Collapse,
  Paper,
  ListItemSecondaryAction,
  Chip,
  Icon,
  ListItemIcon
} from "@material-ui/core";

import {
  DialogContentText,
  DialogActions,
  Dialog,
  DialogContent
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
//import { foodMenus } from "./data";
// import { FoodArea } from "./food";
import { FoodArea } from "../FoodMenu";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginBottom: 5
    //fontSize: '5rem',
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  nested: {
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      padding: "3px"
    }
  },
  column: {},
  detailPanel: {
    [theme.breakpoints.down("xs")]: {
      padding: "3px"
    }
  },
  guestName: {
    "&:hover": {
      color: theme.palette.info.main
    }
  },
  guestItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    width: "100%"
  },
  guestItemRight: {
    textAlign: "center",
    justifyContent: "flex-end",
    display: "flex",
    alignItems: "center",
    padding: "2px 5px",
    flexGrow: 1
  },
  guestItemLeft: {
    justifySelf: "flex-start",
    textAlign: "center",
    display: "flex",
    alignItems: "center"
  }
}));

export const GuestOrder = props => {
  const classes = useStyles();
  const [showNameEditor, setShowNameEditor] = React.useState(false);

  const [areaOpen, setAreaOpen] = React.useState([
    // { areaId: "1", isOpen: true }
  ]);

  const onAreaHandleClick = areaId => {
    let newArr = [...areaOpen];
    newArr.forEach(p => {
      if (p.areaId === areaId) {
        p.isOpen = !p.isOpen;
      } else {
        p.isOpen = false;
      }
    });

    setAreaOpen(newArr);
  };

  const isAreaOpen = areaId => {
    var isFindArea = areaOpen.find(function(a) {
      return a.areaId === areaId;
    });
    if (isFindArea === undefined) {
      let newArr = [...areaOpen];

      setAreaOpen(old => [...old, { areaId: areaId, isOpen: false }]);
    }

    let isOpen = false;
    areaOpen.forEach(p => {
      if (p.areaId === areaId) {
        isOpen = p.isOpen;
        return isOpen;
      }
    });

    return isOpen;
  };

  const handleClick = () => {
    // setOpen(!open);

    props.onGuestHandleClick(props.guestId);
  };
  const foodAreas =
    props.foodMenus != null &&
    props.foodMenus.map(
      area =>
        area.menuItems.length > 0 && (
          <FoodArea
            key={area.name}
            area={area}
            onAreaHandleClick={onAreaHandleClick}
            isAreaOpen={isAreaOpen(area.id)}
            {...props}
          />
        )
    );
  const onDialogClose = (value, isCancel = false) => {
    if (!isCancel) {
      //alert("on Dialog with values " + value);
      props.onChangeGuestTitle(props.guestId, value);
    }

    setShowNameEditor(false);
  };
  return (
    <div className={classes.root}>
      <List
        component="nav"
        //aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <Box bgcolor="secondary.main" border="1" color="primary.contrastText">
          <ListItem
            key={props.guestId}
            button
            onClick={handleClick}
            children="mytem"
          >
            <div className={classes.guestItemContainer}>
              <div className={classes.guestItemLeft}>
                <ListItemText
                  className={classes.guestName}
                  onClick={e => {
                    e.stopPropagation();
                    setShowNameEditor(true);
                  }}
                  primary={props.guestName}
                />
              </div>
              {/* <ListItemText primary={props.guestName} /> */}
              <div className={classes.guestItemRight}>
                <Box color="primary.contrastText">{props.totalItems}</Box>
                {/* <Chip
                  color="primary.contrastText"
                  //color="color="primary.contrastText""
                  variant="outlined"
                  //avatar={<Avatar></Avatar>}
                  label={props.totalItems}
                /> */}
                <Box color="primary.contrastText" ml={5}>
                  {"$" + Number(props.totalAmount).toFixed(2)}
                </Box>
                {/* <Chip
                  // color="primary"
                  // color="primary.contrastText"
                  variant="outlined"
                  //avatar={<Avatar>$</Avatar>}
                  label={"$" + Number(props.totalAmount).toFixed(2)}
                /> */}

                {props.isGuestOpen ? <ExpandLess /> : <ExpandMore />}
              </div>
            </div>
          </ListItem>
        </Box>
        <Collapse in={props.isGuestOpen} timeout="auto" unmountOnExit>
          <Paper>
            <List component="div" disablePadding>
              {foodAreas}
              {"  "}
            </List>
          </Paper>
        </Collapse>
      </List>
      <ChangeNameDialog
        isDialogOpen={showNameEditor}
        onDialogClose={onDialogClose}
        value={props.guestName}
      />
    </div>
  );
};

export const ChangeNameDialog = props => {
  const { isDialogOpen, onDialogClose, value } = props;

  const [name, setName] = useState(value);

  const nameInputRef = React.useRef();
  const handleCancel = () => {
    onDialogClose("", true);
  };

  const handleClose = () => {
    onDialogClose(nameInputRef.current.value);
  };
  return (
    <div>
      <Dialog
        open={isDialogOpen}
        fullWidth={true}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
        <DialogContent>
          <DialogContentText>Enter guest name :</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth={true}
            value={name}
            inputRef={nameInputRef}
            onChange={event => {
              setName(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button virant="contained" onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
