import React, { useState, useEffect, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  ListItemSecondaryAction,
  Collapse,
  Card,
  Box,
  Badge,
  Typography,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { QuantitySelecter } from "../CustomComponents";
import { MenuChoices } from "./foodItemExtras";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  primary: { paddingLeft: theme.spacing(1), marginRight: theme.spacing(6) },
  nested: {
    paddingLeft: theme.spacing(3)
    //[theme.breakpoints.down("xs")]: {
    //  padding: "10px"
    //},
  },
  secondaryAction: {
    right: 0
    // marginLeft: theme.spacing(10)
  },
  foodItemDescription: {
    display: "flex",
    paddingLeft: theme.spacing(2)
    // [theme.breakpoints.down("xs")]: {
    //   maxWidth: "8em"
    //}
  },
  quantityItemPanelCard: {
    width: "100%",
    padding: "5px",
    textAlign: "center"
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  quantityAvatar: {
    fontSize: "16px",
    // width: "auto",
    height: "auto",
    background: "lightgreen"
  },
  extrasHeaderText: {
    //fontSize: "14pt"
    // [theme.breakpoints.down("xs")]: {
    //   fontSize: "9pt"
    // }
  },
  expandPanelCard: {
    marginLeft: theme.spacing(3),
    width: "100%",
    display: "flex",
    alignItems: "center"
  }
}));

export const FoodItems = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const [expandItem, setExpandItem] = useState(null);
  const hasExtras = props.menuItem.menuItemsChoices.length ? true : false;

  const handleClick = () => {
    setOpen(!open);
  };

  const handleRemove = () => {
    props.onChangeQty(props.menuItem, props.guestId, false);
  };

  const handleAdd = () => {
    props.onChangeQty(props.menuItem, props.guestId, true);
  };

  useEffect(() => {
    if (props.orderQty === 0) {
      setShowExtras(false);
      setOpen(false);
    } else if (props.orderQty > 0) {
      console.log(props.orderDetails);
      if (!showExtras) {
        setShowExtras(true);
        setOpen(true);
      }
    }
  }, [props.orderQty]);

  // const handleRadioSelection = (prevChoice, newChoice) => {
  //   if (prevChoice !== null) {
  //     props.onChangeQty(props.menuItem, props.guestId, false, prevChoice);
  //     props.onChangeQty(props.menuItem, props.guestId, true, newChoice);
  //   } else {
  //     props.onChangeQty(props.menuItem, props.guestId, true, newChoice);
  //   }
  // };

  // const handleCheckBox = (choiceItem, isChecked) => {
  //   console.log(choiceItem.fullName + ": " + isChecked);

  //   // const mItemChoices = props.menuItem.menuItemsChoices.find(
  //   //   i => i.id === choiceItem.menuChoiceItemId
  //   // );
  //   // console.log(mItemChoices);
  //   props.onChangeQty(props.menuItem, props.guestId, isChecked, choiceItem);
  // };

  return (
    <div className={classes.root}>
      <ListItem
        key={props.menuItem.id}
        className={classes.nested}
        button
        //button={showExtras ? hasExtras : null}
        //onClick={showExtras ? (hasExtras ? handleClick : null) : null}
      >
        {/* {open ? <ExpandLess /> : <ExpandMore />} */}
        <ListItemAvatar>
          <Avatar
            variant="square"
            alt={props.menuItem.fullName}
            src={props.menuItem.smallImageUrl}
            className={classes.large}
          />
        </ListItemAvatar>
        <ListItemText
          classes={{ primary: classes.primary, secondary: classes.primary }}
          key={props.prodId}
          primary={
            props.menuItem.fullName + " ($" + props.menuItem.basePrice + ")"
          }
          secondary={props.menuItem.description}
          //classes={{primary:theme.spacing(2)}}
        />
        {/* <ListItemText key={props.prodId} >
          <div className={classes.foodItemDescription}>
            <p
              style={{
                flex: 1,
                justifyContent: "flex-start"
              }}
            >
              {props.menuItem.fullName + " "}
              <span style={{ whiteSpace: "nowrap" }}>
                (&#36;{props.menuItem.basePrice})
              </span>
            </p>
           
          </div>
        </ListItemText> */}
        {/* {open ? <ExpandLess /> : <ExpandMore />} */}

        <ListItemSecondaryAction classes={{ root: classes.secondaryAction }}>
          <QuantitySelecter
            value={props.orderQty}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
          />
        </ListItemSecondaryAction>
      </ListItem>
      {hasExtras && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {[...Array(props.orderQty)].map((x, i) => (
            <ExtraItemsExpandable
              {...props}
              index={i + 1}
              open={expandItem}
              setOpen={setExpandItem}
            />
          ))}
        </Collapse>
      )}
    </div>
  );
};

const StyledBadge = withStyles(theme => ({
  badge: {
    top: 11,
    left: -15,
    [theme.breakpoints.down("xs")]: {
      top: 8,
      left: -15
    },
    // border: `2px solid red`,
    padding: "0 4px"
  }
}))(Badge);

const ExtraItemsExpandable = props => {
  const classes = useStyles();
  const hasExtras = props.menuItem.menuItemsChoices.length ? true : false;

  const chList = hasExtras
    ? props.menuItem.menuItemsChoices.map(p => (
        <MenuChoices
          key={p.fullName}
          choice={p}
          index={props.index + 1}
          {...props}
          // handleRadioSelection={handleRadioSelection}
          // handleCheckBox={handleCheckBox}
        />
      ))
    : null;

  const handleExpandClick = e => {
    if (props.open === props.index) {
      props.setOpen(null);
    } else {
      props.setOpen(props.index);
    }
  };

  return (
    <>
      <ListItem
        button
        onClick={handleExpandClick}
        // style={{ paddingBottom: "0px" }}
      >
        <Card variant="outlined" className={classes.expandPanelCard}>
          <div className={classes.quantityItemPanelCard}>
            <StyledBadge
              color="primary"
              badgeContent={props.index}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <Typography className={classes.extrasHeaderText}>
                Personalize your Order
              </Typography>
            </StyledBadge>
          </div>
          <div
            style={{
              paddingRight: "10px",
              display: "flex",
              alignItems: "center"
            }}
          >
            {props.index === props.open ? <ExpandLess /> : <ExpandMore />}
          </div>
        </Card>
      </ListItem>
      <Collapse in={props.index === props.open} timeout="auto" unmountOnExit>
        {chList}
      </Collapse>
    </>
  );
};

export default FoodItems;
