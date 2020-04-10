import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Chip, Avatar } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { FoodItems } from "./foodItems";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  nested: {
    paddingLeft: theme.spacing(3)
    //   [theme.breakpoints.down("xs")]: {
    //     padding: "2px"
    //   }
  }
}));

export const FoodArea = props => {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    //setOpen(!open);
    props.onAreaHandleClick(props.area.id);
  };

  let areaQty = 0;

  const getQty = (menuItem, guestId) => {
    var isFound = props.orderDetails.find(element => {
      return element.menuId === menuItem.id && element.guestId === guestId;
    });
    if (isFound) {
      areaQty += isFound.qty;
      return isFound.qty;
    }
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
      <ListItem
        key={props.area.id}
        button
        onClick={handleClick}
        className={classes.nested}
      >
        <ListItemText primary={props.area.name} />
        {areaQty > 0 && (
          <Chip
            color="primary"
            size="small"
            variant="outlined"
            //  avatar={<Avatar> Qty:</Avatar>}
            label={areaQty}
          />
        )}
        {props.isAreaOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={props.isAreaOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items}
        </List>
      </Collapse>
    </div>
  );
};
