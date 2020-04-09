import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { FoodItems } from "./foodItems";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  }
}));

export const FoodArea = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const getQty = (menuItem, guestId) => {
    var isFound = props.orderDetails.find(element => {
      return element.menuId === menuItem.id && element.guestId === guestId;
    });
    if (isFound) return isFound.qty;
    return 0;
  };

  const items = props.area.menuItems.map(m => (
    <FoodItems
      key={m.fullName}
      menuItem={m}
      {...props}
      orderQty={getQty(m, props.guestId)}
    />
  ));

  return (
    <div className={classes.root}>
      <ListItem key={props.area.id} button onClick={handleClick}>
        <ListItemText primary={props.area.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense={true}>
          {items}
        </List>
      </Collapse>
    </div>
  );
};
