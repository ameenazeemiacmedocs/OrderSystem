import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import {
  colors,
  Grid,
  Typography,
  Card,
  Checkbox,
  Radio
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  listChoices: {
    paddingLeft: theme.spacing(4)
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

export const MenuChoices = props => {
  const classes = useStyles();
  const [open, setOpen] = useState();

  // var details = props.choice.menuItemDetails.map(ch => (
  //   <CheckBoxChoices itemDetail={ch} />
  // ));

  const handleRadioSelection = (prevChoice, newChoice) => {
    if (prevChoice !== null) {
      props.onChangeQty(
        props.menuItem,
        props.guestId,
        false,
        prevChoice,
        props.index
      );
      console.log("rd usman " + prevChoice.fullName + " index " + props.index);
    }
    console.log("rd usman " + newChoice.fullName);

    props.onChangeQty(
      props.menuItem,
      props.guestId,
      true,
      newChoice,
      props.index
    );
  };

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
    console.log(e.target.checked + " index " + props.index);
    props.onChangeQty(
      props.menuItem,
      props.guestId,
      e.target.checked,
      props.itemDetail,
      props.index
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
          <Grid item xs={8}>
            <Typography variant="body1">
              {props.itemDetail.fullName}
              <span style={{ whiteSpace: "nowrap" }}>
                (&#36;{props.itemDetail.extraCharge})
              </span>
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

export const RadioChoice = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ListItem
        className={classes.listChoices}
        dense={true}
        // button
        //onClick={() => props.handleChange(props.itemDetail)}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={8}>
            <Typography variant="body1">
              {props.itemDetail.fullName}
              <span style={{ whiteSpace: "nowrap" }}>
                (&#36; {props.itemDetail.extraCharge})
              </span>
            </Typography>
          </Grid>
          <Grid item xs={4} style={{ textAlign: "right" }}>
            <Radio
              checked={
                props.selected
                  ? props.selected.fullName === props.itemDetail.fullName
                  : false
              }
              onChange={event => props.handleChange(props.itemDetail)}
              value={props.itemDetail.fullName}
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
