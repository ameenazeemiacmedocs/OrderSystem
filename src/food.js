import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import {
  Grid,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  ListItemIcon,
  Chip
} from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InboxIcon from "@material-ui/icons/Inbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { foodMenus } from "./data";
import { FoodItemList } from "./foodItemList";
import { QuantitySelecter } from "./CustomComponents";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  nested: {
    paddingLeft: theme.spacing(10),
    [theme.breakpoints.down("xs")]: {
      padding: "2px"
    }
  },
  column: {},
  foodItemDescription: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "8em"
    }
  }
}));
export const FoodArea = props => {
  const classes = useStyles();
  // const {...props}=props;
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
    <FoodItemList
      key={m.fullName}
      menuItem={m}
      {...props}
      orderQty={getQty(m, props.guestId)}
    />
  ));

  return (
    <div>
      <ListItem
        key={props.area.id}
        //button
        onClick={handleClick}
        className={classes.nested}
      >
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

// export const FoodItem = props => {
//   const classes = useStyles();

//   // const guestItems=useContext(guestItemsContext);
//   //const items = useContext(GuestContext);
//   const handleRemove = () => {
//     //alert("item removed : " + props.menuItem.fullName);
//     console.log("Guest ID " + props.guestId);
//     props.onChangeQty(props.menuItem, props.guestId, false);
//   };

//   const handleAdd = () => {
//     console.log("item added : " + props.menuItem.fullName);
//     //console.log(props.orderDetails);

//     props.onChangeQty(props.menuItem, props.guestId, true);
//   };

//   return (
//     <div className={classes.root}>
//       <ListItem alignItems="flex-start" className={classes.nested}>
//         <ListItemAvatar>
//           <Avatar
//             alt={props.menuItem.fullName}
//             src={props.menuItem.smallImageUrl}
//           />
//         </ListItemAvatar>
//         <ListItemText key={props.prodId}>
//           <div className={classes.foodItemDescription}>
//             <p
//               style={{
//                 flex: 1,
//                 justifyContent: "flex-start"
//               }}
//             >
//               {props.menuItem.fullName}{" "}
//               <span style={{ whiteSpace: "nowrap" }}>
//                 (&#36; {props.menuItem.basePrice})
//               </span>
//             </p>
//             {/* <p style={{ flex: 1, justifyContent: "flex-start" }}>
//               (&#36; {props.menuItem.basePrice})
//             </p> */}
//           </div>
//         </ListItemText>
//         <ListItemSecondaryAction>
//           <QuantitySelecter
//             value={props.orderQty}
//             handleAdd={handleAdd}
//             handleRemove={handleRemove}
//           />
//         </ListItemSecondaryAction>
//         {/* <span className={classes.primary}>{props.qty}</span> */}
//       </ListItem>
//     </div>
//   );
// };
