import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import {
  colors,
  Grid,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  ListItemIcon,
  Chip,
  Card,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel
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
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { foodMenus } from "./data";
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
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      padding: "2px"
    }
  },
  listChoices: {
    paddingLeft: theme.spacing(4)
  },
  column: {},
  foodItemDescription: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "8em"
    }
  },
  extrasSubHeader: {
    textAlign: "left",
    paddingLeft: "10px",
    color: "white",
    fontStyle: "italic",
    background:
      "linear-gradient(90deg, " +
      colors.indigo[400] +
      ", 30%, " +
      colors.indigo[100] +
      " 90%)"
  }
}));

export const FoodItemList = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const hasExtras = props.menuItem.menuItemsChoices.length ? true : false;

  const handleClick = () => {
    setOpen(!open);
  };

  const handleRemove = () => {
    props.onChangeQty(props.menuItem, props.guestId, false);
  };

  const handleAdd = () => {
    props.onChangeQty(props.menuItem, props.guestId, true);
    setOpen(true);
  };

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

  const chList = hasExtras
    ? props.menuItem.menuItemsChoices.map(p => (
        <MenuChoices
          key={p.fullName}
          choice={p}
          {...props}
          // handleRadioSelection={handleRadioSelection}
          // handleCheckBox={handleCheckBox}
        />
      ))
    : null;

  return (
    <div className={classes.root}>
      <ListItem
        key={props.menuItem.id}
        className={classes.nested}
        button={hasExtras}
        onClick={hasExtras ? handleClick : null}
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
          {/* <List component="div" disablePadding /> */}
          {chList}
        </Collapse>
      )}
    </div>
  );
};

export const MenuChoices = props => {
  const classes = useStyles();

  // var details = props.choice.menuItemDetails.map(ch => (
  //   <CheckBoxChoices itemDetail={ch} />
  // ));

  const handleRadioSelection = (prevChoice, newChoice) => {};

  const handleCheckBox = (checkedItem, isChecked) => {};

  var details = props.choice.isRadioChoice ? (
    // ? choice.menuItemDetails.map(ch => {
    //     return (
    //       <RadioChoice
    //         itemDetail={ch}
    //         selected={selected}
    //         handleChange={handleRadioSelection}
    //       />
    //     );
    //   })
    <RadioChoiceGroup
      choices={props.choice.menuItemDetails}
      handleRadioSelection={handleRadioSelection}
    />
  ) : (
    props.choice.menuItemDetails.map(ch => {
      return (
        <CheckBoxChoices
          itemDetail={ch}
          key={ch.fullName}
          onChange={handleCheckBox}
          {...props}
        />
      );
    })
  );

  return (
    <div className={classes.root}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        dense={true}
        disablePadding={true}
        subheader={
          <Card variant="outlined">
            {/* <ListSubheader component="div" id="nested-list-subheader"> */}
            <Typography variant="body1" className={classes.extrasSubHeader}>
              {props.choice.fullName}
            </Typography>

            {/* </ListSubheader> */}
          </Card>
        }
        className={classes.root}
      >
        {details}
      </List>
    </div>
  );
};

export const CheckBoxChoices = props => {
  const classes = useStyles();
  const mRef = useRef();

  const onCheckboxChange = (e, item) => {
    // props.onChange(item, e.target.checked);
    console.log(e.target.checked);
    props.onChangeQty(
      props.menuItem,
      props.guestId,
      e.target.checked,
      props.itemDetail
    );
  };

  return (
    <div className={classes.root}>
      <ListItem
        className={classes.listChoices}
        dense={true}
        // button
        // onClick={() => {
        //   console.log(mRef.current);
        //   mRef.current.checked = true;
        //   onCheckboxChange(mRef.current, props.itemDetail);
        // }}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Typography variant="body1">{props.itemDetail.fullName}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              &#36; {props.itemDetail.extraCharge}
            </Typography>
          </Grid>
          <Grid item xs={4} style={{ textAlign: "right" }}>
            <Checkbox
              inputRef={mRef}
              edge="end"
              size="small"
              // checked={}
              onChange={e => onCheckboxChange(e, props.itemDetail)}
            />
          </Grid>
        </Grid>
      </ListItem>
      <Divider variant="inset" />
    </div>
  );

  // return (
  //   <div className={classes.root}>
  //     <ListItem className={classes.listChoices} dense={true}>
  //       <ListItemText
  //         primary={
  //           <div style={{ display: "flex" }}>
  //             <p style={{ flex: 1, justifyContent: "flex-start" }}>
  //               {props.itemDetail.fullName}
  //             </p>
  //             <p style={{ flex: 1, justifyContent: "center" }}>
  //               {props.itemDetail.extraCharge} &#36;
  //             </p>
  //           </div>
  //         }
  //         // secondary={props.itemDetail.extraCharge}
  //       />
  //       <ListItemSecondaryAction>
  //         <Checkbox edge="end" />
  //       </ListItemSecondaryAction>
  //     </ListItem>
  //     <Divider variant="inset" />
  //   </div>
  // );
};

const RadioChoiceGroup = ({ choices, handleRadioSelection }) => {
  const [selected, setSelected] = useState(null);

  const handleSelection = newChoice => {
    let preChoice = selected;
    setSelected(newChoice);
    handleRadioSelection(preChoice, newChoice);
  };

  const choiceList = choices.map(choice => {
    return (
      <RadioChoice
        key={choice.fullName}
        itemDetail={choice}
        selected={selected}
        handleChange={handleSelection}
      />
    );
  });

  return choiceList;
};

export const RadioChoice = ({ itemDetail, selected, handleChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ListItem
        className={classes.listChoices}
        dense={true}
        button
        onClick={() => handleChange(itemDetail)}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Typography variant="body1">{itemDetail.fullName}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              &#36; {itemDetail.extraCharge}
            </Typography>
          </Grid>
          <Grid item xs={4} style={{ textAlign: "right" }}>
            <Radio
              checked={
                selected ? selected.fullName === itemDetail.fullName : false
              }
              onChange={event => handleChange(itemDetail)}
              value={itemDetail.fullName}
              name="radio-button-choice"
              size="small"
            />
          </Grid>
        </Grid>
      </ListItem>
      <Divider variant="inset" />
    </div>
  );
};
// // // // // // // // // // // // // // // //
