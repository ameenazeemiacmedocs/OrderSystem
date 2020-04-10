import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import { flexbox } from "@material-ui/system";
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
  Paper,
  AppBar,
  Toolbar,
  Card,
  CardHeader,
  CardContent
} from "@material-ui/core";
import List from "@material-ui/core/List";
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
import { GuestOrder } from "./guestOrderNew";
//import CreditCardDetail from "./Cards/CreditCardDetail";
//const InjectedCreditCard = injectStripe(CreditCardDetail, { withRef: true });
import SplitForm from "./Cards/SplitForm";

import logo from "./images/logo.jpg";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
    // marginBottom: 5
  },
  title: {
    flexGrow: 1
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  column: {},
  checkout: {},
  detailPanel: {
    [theme.breakpoints.down("xs")]: {
      padding: "3px"
    }
  }
}));
const stripePromise = loadStripe("pk_test_75b75lAeCG8hV3b7mMzaLbiS00Wid0wpJD");
export default function SimpleExpansionPanel() {
  const classes = useStyles();
  const [orderDetails, setOrderDetails] = useState([
    // {
    //   Id: "",
    //   guestId: "",
    //   qty: 2,
    //   menuId: "",
    //   subTotal: 0,
    //   price: 0,
    //   otherCharges: [
    //     {
    //       menuItemDetailId: "",
    //       extraCharge: 0
    //     }
    //   ]
    // }
  ]);

  const [guests, setGuests] = useState([
    {
      guestId: "1",
      guestName: "Guest 1",
      totalItems: 0,
      totalAmount: 0,
      display: 1
    }
  ]);

  const [guestOpen, setGuestOpen] = React.useState([
    { guestId: "1", isOpen: true }
  ]);

  const onGuestHandleClick = guestId => {
    console.log("Handler Click " + guestId);
    let newArr = [...guestOpen];
    newArr.forEach(p => {
      if (p.guestId === guestId) {
        console.log("Opening Guest");
        p.isOpen = !p.isOpen;
      } else {
        p.isOpen = false;
      }
    });

    setGuestOpen(newArr);
  };

  const isGuestOpen = guestId => {
    isOpen = false;
    guestOpen.forEach(p => {
      if (p.guestId === guestId) {
        isOpen = p.isOpen;
        return isOpen;
      }
    });

    return isOpen;
  };
  const [order, setOrder] = useState({
    orderId: "1",
    subTotal: 0,
    tax: 0,
    total: 0
  });

  useEffect(() => {
    updateGuestsTotal();
  }, [orderDetails]);

  //const GuestContext = React.createContext(orderDetails);
  const updateGuestsTotal = () => {
    var helper = [];
    var results = orderDetails.reduce(function(r, o) {
      //console.log(" guest " + o.guestId);
      var key = o.guestId;
      let extraCharge = 0;
      o.otherCharges.forEach(oc => {
        extraCharge += oc.extraCharge;
        //console.log("extraCharge " + oc.extraCharge);
      });
      if (!helper[key]) {
        helper[key] = Object.assign(
          {},
          { guestId: o.guestId, amount: o.subTotal + extraCharge, qty: o.qty }
        );
        r.push(helper[key]);
      } else {
        helper[key].amount += o.subTotal + extraCharge;
        helper[key].qty += o.qty;
      }
      return r;
    }, []);

    let newArr = [...guests];
    let subTotal = 0;
    results.forEach(p => {
      console.log(p.guestId + " qty " + p.qty + " amount " + p.amount);
      var guestIndex = getIndex(p.guestId, guests, "guestId");
      if (guestIndex >= 0) {
        subTotal += p.amount;
        newArr[guestIndex].totalAmount = p.amount;
        newArr[guestIndex].totalItems = p.qty;
      }
    });
    setGuests(newArr);
    let oldOrder = order;
    oldOrder.subTotal = subTotal;
    oldOrder.tax = 0;
    oldOrder.total = oldOrder.subTotal + oldOrder.tax;
    setOrder(oldOrder);
    // console.log(results);
  };

  const onChangeQty = (
    menuItem,
    guestId,
    isAdded,
    otherCharges = undefined,
    index = -1
  ) => {
    var guestMenuIndex = getGuestMenuItemIndex(menuItem.id, guestId);

    if (guestMenuIndex >= 0) {
      updateGuestOrderDetails(otherCharges, guestMenuIndex, isAdded, index);
    } else {
      addGuestOrderDetails(guestId, menuItem, otherCharges, isAdded, index);
    }
  };

  const addGuest = () => {
    var lastDispaly = guests[guests.length - 1].display;

    lastDispaly += 1;
    console.log(lastDispaly);
    var guest = {
      guestId: lastDispaly,
      guestName: "Guest " + lastDispaly,
      totalItems: 0,
      totalAmount: 0,
      dispaly: lastDispaly
    };
    setGuests(oldGues => [...oldGues, guest]);

    setGuestOpen(oldGuest => [
      ...oldGuest,
      { guestId: lastDispaly, isOpen: false }
    ]);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="regular">
          <Typography variant="h6" className={classes.title} align="center">
            BLUE BOHEME
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      <Divider />

      <div className={classes.root}>
        {guests.map(g => (
          <GuestOrder
            key={g.guestId}
            guestName={g.guestName}
            guestId={g.guestId}
            totalItems={g.totalItems}
            totalAmount={g.totalAmount}
            orderDetails={orderDetails}
            onChangeQty={onChangeQty}
            onGuestHandleClick={onGuestHandleClick}
            isGuestOpen={isGuestOpen(g.guestId)}
          />
        ))}
        <div>
          <Box display="flex" flexDirection="row" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={addGuest}>
              Add Another Guest
            </Button>
          </Box>
          <Card raised={true}>
            <CardContent>
              <Grid container spacing={2} justify="flex-end">
                <Grid item xs="4">
                  <TextField
                    label="Sub Total"
                    variant="outlined"
                    //variant="outlined"
                    size="small"
                    value={Number(order.subTotal).toFixed(2)}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs="4">
                  <TextField
                    label="Tax @ 5.86%"
                    //variant="outlined"
                    size="small"
                    variant="outlined"
                    value={Number(order.tax).toFixed(2)}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs="4">
                  <TextField
                    label="Total"
                    variant="outlined"
                    //variant=""
                    size="small"
                    value={Number(order.total).toFixed(2)}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card raised={true}>
            <CardHeader title="Billing Address" />
            <CardContent>
              <Grid container spacing={1} justify="flex-start">
                <Grid item xs="8">
                  <TextField label="Name" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs="4">
                  <TextField label="Mobile" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs="12">
                  <TextField
                    label="Address"
                    fullWidth
                    variant="outlined"
                    multiline="true"
                    row="4"
                  />
                </Grid>

                <Grid item xs="4">
                  <TextField label="City" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs="4">
                  <TextField label="State" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs="4">
                  <TextField label="Zip" fullWidth variant="outlined" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card raised={true}>
            <CardHeader title="Payment Information" />
            <CardContent>
              <Elements stripe={stripePromise} className={classes.checkout}>
                <Grid container spacing={1} justify="flex-start">
                  <SplitForm totalAmount={order.total} />
                </Grid>
                {/* <ElementDemos demos={demos} /> */}
              </Elements>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };

  function findOrderDetailByMenuId(array, menuId, guestId) {
    // orderDetails.findIndex(od=>{return od.menduId=men});
    return array.find(element => {
      return element.menuId === menuId;
    });
  }

  function getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  function getChargesIndex(arr, index, menuItemDetailId) {
    for (var i = 0; i < arr.length; i++) {
      if (
        arr[i]["menuItemDetailId"] === menuItemDetailId &&
        arr[i]["index"] === index
      ) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  function getGuestMenuItemIndex(menuId, guestId) {
    for (var i = 0; i < orderDetails.length; i++) {
      if (
        orderDetails[i]["menuId"] === menuId &&
        orderDetails[i]["guestId"] === guestId
      ) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  }
  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  function addGuestOrderDetails(
    guestId,
    menuItem,
    otherCharges,
    isAdded,
    otherChargesSeq
  ) {
    if (!isAdded) return;
    var orderDetail = {
      Id: uuidv4(),
      guestId: guestId,
      qty: 1,
      menuId: menuItem.id,
      subTotal: menuItem.basePrice,
      price: menuItem.basePrice,
      otherCharges: []
    };
    if (otherCharges !== undefined) {
      console.log("add charges");
      orderDetail.otherCharges.push({
        index: otherChargesSeq,
        menuItemDetailId: otherCharges.id,
        extraCharge: otherCharges.extraCharge
      });
    }
    setOrderDetails(oldDetails => [...oldDetails, orderDetail]);
  }

  function updateGuestOrderDetails(
    otherCharges,
    guestMenuIndex,
    isAdded,
    otherChargesSeq
  ) {
    let newArr = [...orderDetails];
    // for qty update
    if (otherCharges === undefined) {
      let qty = 1;
      if (!isAdded) qty = -1;
      if (isAdded || (!isAdded && newArr[guestMenuIndex].qty > 0)) {
        newArr[guestMenuIndex].qty += qty;
        newArr[guestMenuIndex].subTotal =
          newArr[guestMenuIndex].qty * newArr[guestMenuIndex].price;
      }
      console.log(newArr);
    } // other charges
    else {
      if (isAdded)
        newArr[guestMenuIndex].otherCharges.push({
          index: otherChargesSeq,
          menuItemDetailId: otherCharges.id,
          extraCharge: otherCharges.extraCharge
        });
      // remove qty
      else {
        // var chargesIndex = getIndex(
        //   otherCharges.id,
        //   newArr[guestMenuIndex].otherCharges,
        //   "menuItemDetailId"
        // );

        var chargesIndex = getChargesIndex(
          newArr[guestMenuIndex].otherCharges,
          otherChargesSeq,
          otherCharges.id
        );
        if (chargesIndex >= 0)
          newArr[guestMenuIndex].otherCharges.splice(chargesIndex, 1);
      }
    } // enf of orher charges
    setOrderDetails(newArr);
  } // enf of updated guest order details
}
