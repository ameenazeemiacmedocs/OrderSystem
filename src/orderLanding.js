import React, { useState, useEffect } from "react";
import CardMedia from "@material-ui/core/CardMedia";
import { blue } from "@material-ui/core/colors";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import ReactDOM from "react-dom";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";
import { flexbox } from "@material-ui/system";
import { DropdownSelector } from "./common/DropdownSelector";
import PropTypes from "prop-types";
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
  CardContent,
  InputLabel,
  Select,
  MenuItem,
  Container
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
import LoadingOverlay from "./common/LoadingOverlay";

import Slide from "@material-ui/core/Slide";

//import CreditCardDetail from "./Cards/CreditCardDetail";
//const InjectedCreditCard = injectStripe(CreditCardDetail, { withRef: true });

import axios from "axios";

//import AppToolbar from "./appToolbar.js";

import { OrderAddress, OrderPayment, OrderTotals, GuestOrder } from "./order";
const useStyles = makeStyles(theme => ({
  root: {
    toolbar: theme.mixins.toolbar,
    width: "100%",
    height: "100%"
    // marginBottom: 5
  },
  contentRoot: {},

  title: {
    flexGrow: 1
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  merlin: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: theme.palette.primary.main
  },
  toolbarContent: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  toolbarContentN: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  titleText: {
    // flexGrow: 1,
    width: "100%",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    textAlign: "left"
  },
  extraText: {
    width: "100%",
    // flexWrap: 'nowrap',
    flexGrow: 1,
    textAlign: "right",
    alignSelf: "flex-end",
    justifyContent: "flex-end"
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

export const OrderLanding = props => {
  const trigger = useScrollTrigger({ threshold: 0, disableHysteresis: true });

  const stripe = useStripe();
  const elements = useElements();
  const { apiURL, client, source, foodMenu, myInfo, onPaymentSuccess } = props;
  const classes = useStyles();
  //const apiURL = "https://raffleapi.azurewebsites.net/api/";
  //const [client, setClient] = useState("");
  //const [sourceource, setSource] = useState("url");

  //const [orderDetails, setOrderDetails] = useState([]);
  //const [isOrderSaved, setIsOrderSaved] = useState(false);
  //const [bestTime, SetBestTime] = useState([{ id: 1, display: "ASAP" }]);
  const [guests, setGuests] = useState([
    {
      guestId: "1",
      guestName: "Guest 1",
      totalItems: 0,
      totalAmount: 0,
      display: 1
    }
  ]);
  // const [foodMenu, setFoodMenus] = useState(null);
  const [guestOpen, setGuestOpen] = React.useState([
    { guestId: "1", isOpen: true }
  ]);
  const [deliveryType, setDeliveryType] = useState(0);
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
    let isOpen = false;
    guestOpen.forEach(p => {
      if (p.guestId === guestId) {
        isOpen = p.isOpen;
        return isOpen;
      }
    });

    return isOpen;
  };

  const [order, setOrder] = useState({
    id: "00000000-0000-0000-0000-000000000000",
    clientCode: client,
    mobileNumber: null,
    customerName: null,
    customerId: null,
    orderRef: null,
    orderSoruce: "test",
    paymentStatus: 0,
    orderStatus: 0,
    pickupTime: "0001-01-01T00:00:00",
    orderDateTime: "0001-01-01T00:00:00",
    orderTotal: 0.0,
    tax: 0.0,
    netTotal: 0.0,
    totalItems: 0.0,
    orderDeliverAddress: {
      id: "00000000-0000-0000-0000-000000000000",
      clientCode: client,
      name: "",
      mobileNumber: "",
      address: "",
      state: "",
      city: "",
      zipCode: "",
      orderId: "00000000-0000-0000-0000-000000000000",
      order: null
    },
    paymentInfo: null,
    orderDetails: []
  });

  const [deliveryAddress, setDeliveryAddress] = useState({
    id: "00000000-0000-0000-0000-000000000000",
    clientCode: client,
    name: "",
    mobileNumber: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
    orderId: "00000000-0000-0000-0000-000000000000",
    order: null
  });

  const [clientSecret, setClientSecret] = useState("");
  const [defOrder, setDefOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  useEffect(() => {
    console.log(trigger);
  }, [trigger]);

  //effect on changes of Order Detail
  // useEffect(() => {
  //   console.log("Order is " + order);
  //   //console.log(props.location.query);
  //   updateGuestsTotal();
  //   // updateOrder();
  // }, [orderDetails]);

  // useEffect(() => {
  //   updateOrder();
  // }, [deliveryAddress]);

  //const GuestContext = React.createContext(orderDetails);
  // const updateGuestsTotal = () => {
  //   //debuggger;
  //   var helper = [];
  //   if (orderDetails === null || orderDetails.length === 0) {
  //     let guestArr = [...guests];
  //     let subTotal = 0;
  //     guestArr.forEach(p => {
  //       //console.log(p.guestId + " qty " + p.qty + " amount " + p.amount);

  //       p.totalAmount = 0;
  //       p.totalItems = 0;
  //     });
  //     setGuests(guestArr);
  //     let oldOrder = order;
  //     oldOrder.orderTotal = subTotal;
  //     oldOrder.tax = 0;
  //     oldOrder.netTotal = oldOrder.orderTotal + oldOrder.tax;
  //     setOrder(oldOrder);

  //     return;
  //   }
  //   var results = orderDetails.reduce(function(r, o) {
  //     //console.log(" guest " + o.guestId);
  //     var key = o.guestSeq;
  //     let extraCharge = 0;
  //     o.orderChoices.forEach(oc => {
  //       extraCharge += oc.extraCharges;
  //       //console.log("extraCharge " + oc.extraCharge);
  //     });
  //     if (!helper[key]) {
  //       helper[key] = Object.assign(
  //         {},
  //         { guestId: o.guestSeq, amount: o.subTotal + extraCharge, qty: o.qty }
  //       );
  //       r.push(helper[key]);
  //     } else {
  //       helper[key].amount += o.subTotal + extraCharge;
  //       helper[key].qty += o.qty;
  //     }
  //     return r;
  //   }, []);

  //   let guestArr = [...guests];
  //   //reset guests index
  //   guestArr.forEach(p => {
  //     p.totalAmount = 0;
  //     p.totalItems = 0;
  //   });
  //   let subTotal = 0;

  //   results.forEach(p => {
  //     //console.log(p.guestId + " qty " + p.qty + " amount " + p.amount);
  //     var guestIndex = getIndex(p.guestId, guests, "guestId");
  //     if (guestIndex >= 0) {
  //       subTotal += p.amount;
  //       guestArr[guestIndex].totalAmount = p.amount;
  //       guestArr[guestIndex].totalItems = p.qty;
  //     }
  //   });
  //   setGuests(guestArr);
  //   let oldOrder = order;
  //   oldOrder.orderTotal = subTotal;
  //   oldOrder.tax = 0;
  //   oldOrder.netTotal = oldOrder.orderTotal + oldOrder.tax;

  //   oldOrder.orderDetails = [];
  //   orderDetails.forEach(od => {
  //     oldOrder.orderDetails.push(od);
  //   });

  //   setOrder(oldOrder);
  //   // console.log(results);
  // };

  const onChangeQty = (
    menuItem,
    guestId,
    isAdded,
    otherCharges = undefined,
    index = -1
  ) => {
    //debuggger;
    var guestMenuIndex = getOrderDetailByGuestId(menuItem.id, guestId);

    if (guestMenuIndex >= 0) {
      updateOrderDetailByGuest(otherCharges, guestMenuIndex, isAdded, index);
    } else {
      addOrderDetailByGuest(guestId, menuItem, otherCharges, isAdded, index);
    }
  };

  const addGuest = () => {
    var lastDispaly = guests[guests.length - 1].display;
    //debuggger;
    lastDispaly += 1;
    console.log(lastDispaly);
    var guest = {
      guestId: lastDispaly,
      guestName: "Guest " + lastDispaly,
      totalItems: 0,
      totalAmount: 0,
      display: lastDispaly
    };
    setGuests(oldGues => [...oldGues, guest]);

    setGuestOpen(oldGuest => [
      ...oldGuest,
      { guestId: lastDispaly, isOpen: false }
    ]);
  };
  const onDeliveryTypeChange = value => {
    setDeliveryType(value);
  };

  const callStripe = (clientSecret, payment_method) => {
    return new Promise((resolve, reject) => {
      stripe
        .confirmCardPayment(clientSecret, {
          payment_method: payment_method
        })
        .then(result => {
          if (result.error) {
            reject(result.error.message);
          }
          if (result.paymentIntent.status === "succeeded") {
            resolve(result.paymentIntent);
          }

          // if (result.error) {
          //   alert(result.error.message);
          //   console.log(result.error.message);
          // } else {
          //   if (result.paymentIntent.status === "succeeded") {
          //     alert("show Success");

          //     console.log(result.paymentIntent);
          //   }
          // }
        });
    });
  };

  const getClientOrderSecret = orderId => {
    return new Promise((resolve, reject) => {
      const checkout = {
        MobileNumber: deliveryAddress.mobileNumber,
        Amount: order.netTotal,
        OrderNumber: orderId
      };

      axios
        .post(`${apiURL}orders/checkout`, checkout, {
          headers: {
            "content-type": "application/json",
            CLIENT_CODE: client
          }
        })
        .then(response => {
          // setClientSecret(response);
          resolve(response);
        })
        .catch(error => {
          reject(error);
          //alert("Error on Processing order.");
        });
    });

    //var clientSecretReq =

    // if (clientSecretReq.status == 200) {

    // }
    // else {

    // }
  };
  const onPayment = async payment_method => {
    debugger;
    setIsLoading(true);
    let newOrder = { ...order };
    newOrder.orderDeliverAddress = deliveryAddress;
    await axios
      .post(`${apiURL}orders`, newOrder, {
        headers: { "content-type": "application/json", CLIENT_CODE: client }
      })
      .then(response => {
        //setOrder(response.data);
        //setIsOrderSaved(true);
        if (clientSecret === "") {
          getClientOrderSecret(response.data.id)
            .then(successSecret => {
              payment_method.billing_details = { name: deliveryAddress.name };
              callStripe(successSecret.data, payment_method)
                .then(stripeSuccess => {
                  setIsLoading(false);
                  onPaymentSuccess(response.data.id, "");
                  //  debugger;
                  //console.log("Stripe intent " + stripeSuccess);
                })
                .catch(stripeError => {
                  console.log(stripeError);
                  alert("Error on Stripe " + stripeError);
                  setOrder(response.data);
                  setClientSecret(successSecret.data);
                });
            })
            .catch(errorSecret => {
              console.log(errorSecret);
              alert("Error on Accessing Client Secrets.");
            });
        } // enf of client secret // if have client secret
        else {
          payment_method.billing_details = { name: deliveryAddress.name };
          callStripe(clientSecret, payment_method)
            .then(stripeSuccess => {
              setIsLoading(false);
              onPaymentSuccess(response.data.id, "");
              //  debugger;
              //console.log("Stripe intent " + stripeSuccess);
            })
            .catch(stripeError => {
              console.log(stripeError);
              alert("Error on Stripe " + stripeError);
            });
        }

        //  let stripeResult = callStripe(secret, payment_method);
      })
      .catch(error => {
        alert("Some Error Occured to process order.");
      });
  };

  const onChangeGuestTitle = (guestId, guestName) => {
    var guestArr = [...guests];

    guestArr.forEach(g => {
      if (g.guestId === guestId) {
        g.guestName = guestName;
      }
    });

    setGuests(guestArr);
  };
  const onAddressChange = (fieldName, fieldValue) => {
    // console.log("Field " + fieldName + " value " + fieldValue);
    //console.log({...deliveryAddress});
    // let address=deliveryAddress;
    // console.log("address value of name "+address.name);
    // //setDeliveryAddress(...deliveryAddress,[fieldName],fieldValue);
    //    // let newOrder=order;

    //     if(fieldName==="name")
    //     {
    //       address.name=fieldValue;
    //     }
    //     else if(fieldName==="mobileNumber")
    //     {
    //       address.mobileNumber=fieldValue;
    //     }
    //     else if(fieldName==="address")
    //     {
    //       address.address=fieldValue;
    //     }
    //     else if(fieldName==="state")
    //     {
    //       address.state=fieldValue;
    //     }
    //     else if(fieldName==="city")
    //     {
    //       address.city=fieldValue;
    //     }
    //     else if(fieldName==="zipCode")
    //     {
    //       address.zipCode=fieldValue;
    //     }

    // let address={...deliveryAddress};
    // address[fieldName]=fieldValue;

    // setDeliveryAddress(oldDetails => [...oldDetails, address]);
    //setDeliveryAddress(address);
    //setAdSchedule({ ...adSchedule, [name]: val });
    setDeliveryAddress({ ...deliveryAddress, [fieldName]: fieldValue });
    // setOrder(newOrder);
    //setOrder({ ...order,orderDeliverAddress: deliverAddress });
  };

  return (
    <div className={classes.root}>
      {/* <Container disableGutters="false" maxWidth="xs"> */}
      <Container disableGutters="false" maxWidth="xs">
        <LoadingOverlay open={isLoading} title="Processing Payment.." />

        {/* <AppBar color="transparent" position="sticky"> */}
        {!trigger ? (
          <Box>
            <Box boxShadow={0}>
              <CardMedia
                component="img"
                //height="75"
                className={classes.media}
                image="https://posigentstorage.blob.core.windows.net/logos/Color%20logo%20with%20background.png"
                title=""
              />
            </Box>
            <Box
              color="primary.main"
              //fontWeight={500}
              // fontSize="h6.fontSize"
              textAlign="left"
              m={1}
            >
              Your order will be delivered between 7:15 and 7:45
            </Box>
            <Box p={0} m={1} color="primary.main">
              <Grid container alignItems="center" spacing={5}>
                <Grid item xs={2}>
                  <Avatar variant="square" className={classes.merlin}>
                    Cl
                  </Avatar>
                </Grid>
                <Grid item xs={10}>
                  Welcome, this is how you order
                </Grid>
              </Grid>
            </Box>
          </Box>
        ) : (
          // <ElevationScroll {...props}>
          <AppBar position="sticky" color="default">
            <Box p={0} m={1} color="primary.main">
              <Grid container alignItems="center" spacing={5}>
                <Grid item xs={2}>
                  <Avatar
                    variant="square"
                    // className={classes.merlin}
                    src="https://posigentstorage.blob.core.windows.net/logos/favicon.ico"
                  >
                    P
                  </Avatar>
                </Grid>
                <Grid item xs={10}>
                  Your order will be delivered between 7:15 and 7:45
                </Grid>
              </Grid>
            </Box>
          </AppBar>
        )}
        {/* </AppBar> */}

        {/* <AppToolbar
        topLogo={blackLogo}
        merlinLogo={
          "https://posigentcom-my.sharepoint.com/personal/usman_mahmood_posigent_com/Documents/logo/merlin-logo.png"
        }
      /> */}
        <Divider />
        <div className={classes.contentRoot}>
          {guests.map(g => (
            <GuestOrder
              key={g.guestId}
              guestName={g.guestName}
              guestId={g.guestId}
              totalItems={g.totalItems}
              totalAmount={g.totalAmount}
              orderDetails={order.orderDetails}
              onChangeQty={onChangeQty}
              onGuestHandleClick={onGuestHandleClick}
              isGuestOpen={isGuestOpen(g.guestId)}
              order={order}
              foodMenus={foodMenu}
              onChangeGuestTitle={onChangeGuestTitle}
            />
          ))}
          {/* {trigger ? "Trigger" : "Not Trigger"} */}
          <div>
            <Grid container spacing={2} justify="flex-end">
              <Grid item>
                <Button variant="contained" color="primary" onClick={addGuest}>
                  Add Another Guest
                </Button>
              </Grid>
              <Grid item xs={12}>
                <OrderTotals order={order} />
              </Grid>
              <Grid item xs={12}>
                <OrderAddress
                  address={deliveryAddress}
                  onAddressChange={onAddressChange}
                  onDeliveryTypeChange={onDeliveryTypeChange}
                />
              </Grid>
              {/* <Grid item xs={3}>
              <DropdownSelector
                onSelected={val => {
                  alert("Selected " + val);
                }}
                textFieldProps={{
                  fullWidth: true,
                  variant: "outlined",
                  label: "Best Delivery Time"
                }}
                values={bestTime}
                valueId="id"
                displayName="display"
              />
          
            </Grid> */}
              <Grid item xs={12}>
                <OrderPayment
                  order={order}
                  isValid={
                    deliveryAddress.name !== "" &&
                    deliveryAddress.mobileNumber !== ""
                  }
                  myKey={myInfo === null ? "" : myInfo.stripeTestKey}
                  onPayment={onPayment}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );

  Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.lengtho + from : from;
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
        arr[i]["productChoiceDetailId"] === menuItemDetailId &&
        arr[i]["seq"] === index
      ) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  function getOrderDetailByGuestId(menuId, guestId) {
    for (var i = 0; i < order.orderDetails.length; i++) {
      if (
        order.orderDetails[i]["productId"] === menuId &&
        order.orderDetails[i]["guestSeq"] === guestId
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
  function addOrderDetailByGuest(
    guestId,
    menuItem,
    otherCharges,
    isAdded,
    otherChargesSeq
  ) {
    //debuggger;
    if (!isAdded) return;

    var orderDetail = {
      id: "00000000-0000-0000-0000-000000000000",
      clientCode: client,
      guestName: null,
      guestSeq: guestId,
      productId: menuItem.id,
      product: null,
      rate: menuItem.basePrice,
      tax: 0.0,
      discount: 0.0,
      qty: 1,
      subTotal: menuItem.basePrice,
      orderId: "00000000-0000-0000-0000-000000000000",
      order: null,
      orderChoices: []
    };

    // orderDetail = orderDetail.orderChoices.slice(1);
    // var orderDetail = {
    //   Id: uuidv4(),
    //   guestId: guestId,
    //   qty: 1,
    //   menuId: menuItem.id,
    //   subTotal: menuItem.basePrice,
    //   price: menuItem.basePrice,
    //   otherCharges: []
    // };
    if (otherCharges !== undefined) {
      console.log("add charges");
      orderDetail.orderChoices.push({
        id: "00000000-0000-0000-0000-000000000000",
        clientCode: client,
        productChoiceDetailId: otherCharges.id,
        productChoiceDetail: null,
        extraCharges: otherCharges.extraCharge,
        seq: 0,
        orderDetailId: "00000000-0000-0000-0000-000000000000",
        orderDetail: null
      });
    }
    // setOrder(oldOrder=>[...oldOrder.orderDetails,orderDetail]);
    // newOrder.orderDetails.push(orderDetail);
    // setOrder(newOrder);

    let newOrder = { ...order };
    newOrder.orderDetails.push(orderDetail);

    updateGuestTotal(newOrder);
    setOrder(newOrder);
    //setOrderDetails(oldDetails => [...oldDetails, orderDetail]);
  }

  function updateOrderDetailByGuest(
    otherCharges,
    orderDetailIndex,
    isAdded,
    otherChargesSeq
  ) {
    let newOrder = { ...order };
    let odArr = newOrder.orderDetails;
    //let odArr = [...orderDetails];
    // for qty update
    if (otherCharges === undefined) {
      let qty = 1;
      if (!isAdded) qty = -1;
      if (isAdded || (!isAdded && odArr[orderDetailIndex].qty > 0)) {
        odArr[orderDetailIndex].qty += qty;
        odArr[orderDetailIndex].subTotal =
          odArr[orderDetailIndex].qty * odArr[orderDetailIndex].rate;
      }

      //debuggger;
      // remove order detail row
      if (odArr[orderDetailIndex].qty <= 0) {
        //odArr[orderDetailIndex].splice(orderDetailIndex)
        odArr.splice(orderDetailIndex);
      }
    } // other charges
    else {
      if (isAdded)
        odArr[orderDetailIndex].orderChoices.push({
          id: "00000000-0000-0000-0000-000000000000",
          clientCode: client,
          productChoiceDetailId: otherCharges.id,
          productChoiceDetail: null,
          extraCharges: otherCharges.extraCharge,
          seq: otherChargesSeq,
          orderDetailId: "00000000-0000-0000-0000-000000000000",
          orderDetail: null
        });
      // remove qty
      else {
        // var chargesIndex = getIndex(
        //   otherCharges.id,
        //   newArr[guestMenuIndex].otherCharges,
        //   "menuItemDetailId"
        // );

        var chargesIndex = getChargesIndex(
          odArr[orderDetailIndex].orderChoices,
          otherChargesSeq,
          otherCharges.id
        );
        if (chargesIndex >= 0)
          odArr[orderDetailIndex].orderChoices.splice(chargesIndex, 1);
      }
    } // enf of orher charges
    newOrder.orderDetails = odArr;

    updateGuestTotal(newOrder);
    setOrder(newOrder);
    // setOrderDetails(odArr);
  } // enf of updated guest order details

  function updateGuestTotal(oldOrder) {
    let orderDetails = oldOrder.orderDetails;
    //debuggger;
    var helper = [];
    if (orderDetails === null || orderDetails.length === 0) {
      let guestArr = [...guests];
      let subTotal = 0;
      guestArr.forEach(p => {
        //console.log(p.guestId + " qty " + p.qty + " amount " + p.amount);

        p.totalAmount = 0;
        p.totalItems = 0;
      });
      setGuests(guestArr);
      //let oldOrder = order;
      oldOrder.orderTotal = subTotal;
      oldOrder.tax = 0;
      oldOrder.netTotal = oldOrder.orderTotal + oldOrder.tax;
      setOrder(oldOrder);

      return;
    }
    var results = orderDetails.reduce(function(r, o) {
      //console.log(" guest " + o.guestId);
      var key = o.guestSeq;
      let extraCharge = 0;
      o.orderChoices.forEach(oc => {
        extraCharge += oc.extraCharges;
        //console.log("extraCharge " + oc.extraCharge);
      });
      if (!helper[key]) {
        helper[key] = Object.assign(
          {},
          { guestId: o.guestSeq, amount: o.subTotal + extraCharge, qty: o.qty }
        );
        r.push(helper[key]);
      } else {
        helper[key].amount += o.subTotal + extraCharge;
        helper[key].qty += o.qty;
      }
      return r;
    }, []);

    let guestArr = [...guests];
    //reset guests index
    guestArr.forEach(p => {
      p.totalAmount = 0;
      p.totalItems = 0;
    });
    let subTotal = 0;

    results.forEach(p => {
      //console.log(p.guestId + " qty " + p.qty + " amount " + p.amount);
      var guestIndex = getIndex(p.guestId, guests, "guestId");
      if (guestIndex >= 0) {
        subTotal += p.amount;
        guestArr[guestIndex].totalAmount = p.amount;
        guestArr[guestIndex].totalItems = p.qty;
      }
    });
    setGuests(guestArr);
    // let oldOrder = order;
    oldOrder.orderTotal = subTotal;
    oldOrder.tax = 0;
    oldOrder.netTotal = oldOrder.orderTotal + oldOrder.tax;

    // oldOrder.orderDetails = [];
    // orderDetails.forEach(od => {
    //   oldOrder.orderDetails.push(od);
    // });

    // setOrder(oldOrder);
  }
};
function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};
function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};
