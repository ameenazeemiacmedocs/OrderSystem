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
  Chip
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
import { foodMenus } from "./data";
// import { FoodArea } from "./food";
import { FoodArea } from "./FoodMenu";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginBottom: 5
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
  }
}));

export const GuestOrder = props => {
  const classes = useStyles();
  // const [open] =props.isOpen;

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
  const foodAreas = foodMenus.map(
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

  return (
    <div className={classes.root}>
      <List
        component="nav"
        //aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <Paper>
          <ListItem
            key={props.guestId}
            button
            onClick={handleClick}
            children="mytem"
          >
            <ListItemText primary={props.guestName} />

            <Chip
              color="primary"
              variant="outlined"
              //avatar={<Avatar></Avatar>}
              label={props.totalItems}
            />
            <Chip
              color="primary"
              variant="outlined"
              //avatar={<Avatar>$</Avatar>}
              label={"$" + Number(props.totalAmount).toFixed(2)}
            />
            {props.isGuestOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </Paper>
        <Collapse in={props.isGuestOpen} timeout="auto" unmountOnExit>
          <Paper>
            <List component="div" disablePadding>
              {foodAreas}{" "}
            </List>
          </Paper>
        </Collapse>
      </List>
    </div>
  );
};
