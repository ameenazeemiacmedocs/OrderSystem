import React, { useEffect } from "react";
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
  const ref = React.createRef();
  const areaHandleClick = event => {
    //setOpen(!open);
    props.onAreaHandleClick(props.area.id);
    // console.log(event.target.ownerDocument);
  };
  // useEffect(() => {
  //   console.log("Araa is open " + props.isAreaOpen + " of " + props.area.name);

  //   if (props.isAreaOpen) {
  //     if (ref.current) {
  //       console.log(ref.current);
  //       // ref.current.scrollIntoView({
  //       //   behavior: "smooth",
  //       //   block: "nearest"
  //       // });
  //       ref.current.scrollIntoView(true);
  //     }
  //   }
  // }, [props.isAreaOpen]);
  let areaQty = 0;

  const getQty = (menuItem, guestId) => {
    var isFound = props.orderDetails.find(orderDetail => {
      return (
        orderDetail.productId === menuItem.id &&
        orderDetail.guestSeq === guestId
      );
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
        ref={ref}
        //disableTypography={true}
        key={props.area.id}
        button
        onClick={areaHandleClick}
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
      <Collapse
        in={props.isAreaOpen}
        timeout="auto"
        unmountOnExit
        onEntered={() => {
          console.log("Entered");
          if (ref.current) {
            // ref.current.scrollIntoView(false);
            ref.current.scrollIntoView({
              behavior: "smooth",
              block: "nearest"
              //inline: "nearest"
            });
          }
          // ref.current.scrollIntoView({
          //   behavior: "smooth",
          //   block: "nearest"
          // });
        }}
      >
        <List component="div" disablePadding>
          {items}
        </List>
      </Collapse>
    </div>
  );
};
