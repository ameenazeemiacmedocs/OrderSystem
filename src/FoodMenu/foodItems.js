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
  nested: {
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      padding: "2px"
    }
  },
  foodItemDescription: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "8em"
    }
  },
  quantityItemPanelCard: {
    width: "100%",
    padding: "5px",
    textAlign: "center"
  },
  quantityAvatar: {
    fontSize: "16px",
    // width: "auto",
    height: "auto",
    background: "lightgreen"
  }
}));

export const FoodItems = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
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
        button={showExtras ? hasExtras : null}
        onClick={showExtras ? (hasExtras ? handleClick : null) : null}
      >
        {/* {open ? <ExpandLess /> : <ExpandMore />} */}
        <ListItemAvatar>
          <Avatar
            alt={props.menuItem.fullName}
            src={props.menuItem.smallImageUrl}
          />
        </ListItemAvatar>
        <ListItemText key={props.prodId}>
          <div className={classes.foodItemDescription}>
            <p
              style={{
                flex: 1,
                justifyContent: "flex-start"
              }}
            >
              {props.menuItem.fullName}{" "}
              <span style={{ whiteSpace: "nowrap" }}>
                (&#36; {props.menuItem.basePrice})
              </span>
            </p>
            {/* <p style={{ flex: 1, justifyContent: "flex-start" }}>
              (&#36; {props.menuItem.basePrice})
            </p> */}
          </div>
        </ListItemText>
        {/* {open ? <ExpandLess /> : <ExpandMore />} */}

        <ListItemSecondaryAction>
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
            <ExtraItemsExpandable {...props} index={i + 1} />
          ))}
        </Collapse>
      )}
    </div>
  );
};

const StyledBadge = withStyles(theme => ({
  badge: {
    top: 13,
    right: -25,
    // border: `2px solid red`,
    padding: "0 14px"
  }
}))(Badge);

const ExtraItemsExpandable = props => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const hasExtras = props.menuItem.menuItemsChoices.length ? true : false;

  const chList = hasExtras
    ? props.menuItem.menuItemsChoices.map(p => (
        <MenuChoices
          key={p.fullName}
          choice={p}
          index={props.index}
          {...props}
          // handleRadioSelection={handleRadioSelection}
          // handleCheckBox={handleCheckBox}
        />
      ))
    : null;

  return (
    <>
      <ListItem
        button
        onClick={() => setOpen(!open)}
        style={{ padding: "0px" }}
      >
        <Card
          variant="outlined"
          style={{ width: "100%", display: "flex", alignItems: "center" }}
        >
          <div className={classes.quantityItemPanelCard}>
            <StyledBadge color="primary" badgeContent={props.index}>
              <Typography>
                {props.menuItem.fullName} (Extra Choices) -
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
            {open ? <ExpandLess /> : <ExpandMore />}
          </div>
        </Card>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {chList}
      </Collapse>
    </>
  );
};

export default FoodItems;