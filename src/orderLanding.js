import React, { useState, useEffect } from "react";
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
  MenuItem
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

//import CreditCardDetail from "./Cards/CreditCardDetail";
//const InjectedCreditCard = injectStripe(CreditCardDetail, { withRef: true });

import axios from "axios";
import logo from "./images/logo.jpg";

import { OrderAddress, OrderPayment, OrderTotals, GuestOrder } from "./order";
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

export const OrderLanding = props => {
  const stripe = useStripe();
  const elements = useElements();
  const { apiURL, client, source, foodMenu, myInfo, onPaymentSuccess } = props;
  const classes = useStyles();
  //const apiURL = "https://raffleapi.azurewebsites.net/api/";
  //const [client, setClient] = useState("");
  //const [sourceource, setSource] = useState("url");

  const [orderDetails, setOrderDetails] = useState([]);
  const [isOrderSaved, setIsOrderSaved] = useState(false);
  const [bestTime, SetBestTime] = useState([{ id: 1, display: "ASAP" }]);
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
    name: "ameen",
    mobileNumber: "03444441166",
    address: "66 f2 johar town",
    state: "punjab",
    city: "Lahore",
    zipCode: "54301",
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

  // effect on having client
  // useEffect(() => {
  //   console.log("Client Effect");
  //   if (client === "") {
  //     var clientParam = getParameterByName("c");
  //     if (clientParam === "" || clientParam === null) {
  //       setClient("POSIGENT-DEV");
  //     } else {
  //       setClient(clientParam);
  //     }
  //     var clientSource = getParameterByName("s");

  //     if (clientSource === "" || clientSource === null) {
  //       setSource("URL");
  //     }
  //   }

  //   if (foodMenu == null && client !== "") {
  //     // axios.defaults.headers.common["CLIENT_CODE"] = client;
  //     // var formData = new FormData();
  //     // formData.append("source", clientSource);
  //     // axios.post(`${apiURL}orders/defaultOrder`, formData, {
  //     //   headers: { 'content-type': 'multipart/form-data', 'CLIENT_CODE': client }
  //     // }).then(result => {

  //     //   setDefOrder(result.data);
  //     // })
  //     //   .catch(error => {
  //     //     console.error(error);
  //     //   });

  //     setIsLoading(true);

  //     console.log("main demo");
  //     axios
  //       .all([
  //         axios.get(`${apiURL}orders/myProducts`, {
  //           headers: {
  //             "content-type": "multipart/form-data",
  //             CLIENT_CODE: client
  //           }
  //         }),
  //         axios.get(`${apiURL}orders/myInfo`, {
  //           headers: {
  //             "content-type": "multipart/form-data",
  //             CLIENT_CODE: client
  //           }
  //         })
  //       ])
  //       .then(
  //         axios.spread((...responses) => {
  //           setFoodMenus(responses[0].data);
  //           // console.log(responses[1]);
  //           setMyInfo(responses[1].data);
  //           setIsLoading(false);
  //         })
  //       )
  //       .catch(error => {
  //         setIsLoading(false);
  //       });
  //     // axios.get(`${apiURL}orders/myProducts`, {
  //     //   headers: { 'content-type': 'multipart/form-data', 'CLIENT_CODE': client }
  //     // }).then(result => {
  //     //   setFoodMenus(result.data);
  //     //   setIsLoading(false);
  //     // })
  //     //   .catch(error => {
  //     //     setIsLoading(false);
  //     //     console.error(error);
  //     //   });
  //   }
  // }, [client]);

  // getMyProducts = () => {

  //   return axios.get(`${apiURL}orders/myProducts`, {
  //     headers: { 'content-type': 'multipart/form-data', 'CLIENT_CODE': client }
  //   });
  // };
  // getMyInfo = () => {
  //   return axios.get(`${apiURL}orders/myInfo`, {
  //     headers: { 'content-type': 'multipart/form-data', 'CLIENT_CODE': client }
  //   });

  // };
  //effect on changes of Order Detail
  useEffect(() => {
    console.log("Order is " + order);
    //console.log(props.location.query);
    updateGuestsTotal();
    // updateOrder();
  }, [orderDetails]);

  useEffect(() => {
    updateOrder();
  }, [deliveryAddress]);

  //const GuestContext = React.createContext(orderDetails);
  const updateGuestsTotal = () => {
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
      let oldOrder = order;
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
    let oldOrder = order;
    oldOrder.orderTotal = subTotal;
    oldOrder.tax = 0;
    oldOrder.netTotal = oldOrder.orderTotal + oldOrder.tax;

    oldOrder.orderDetails = [];
    orderDetails.forEach(od => {
      oldOrder.orderDetails.push(od);
    });

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

  const updateOrder = () => {
    var newOrder = { ...order };

    // newOrder.orderDetails = [];
    // orderDetails.forEach(od => {
    //   newOrder.orderDetails.push(od);
    // });
    newOrder.orderDeliverAddress = deliveryAddress;
    setOrder(newOrder);
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
    await axios
      .post(`${apiURL}orders`, order, {
        headers: { "content-type": "application/json", CLIENT_CODE: client }
      })
      .then(response => {
        //setOrder(response.data);
        //setIsOrderSaved(true);

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
                alert("Error on Stripe ");
              });
          })
          .catch(errorSecret => {
            console.log(errorSecret);
            alert("Error on Accessing Client Secrets.");
          });

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
    console.log("Field " + fieldName + " value " + fieldValue);
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
      <LoadingOverlay open={isLoading} title="Processing Payment.." />

      <AppBar position="static">
        <Toolbar variant="regular">
          <Typography variant="h6" className={classes.title} align="center">
            {myInfo !== null && myInfo.clientName}
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
            order={order}
            foodMenus={foodMenu}
            onChangeGuestTitle={onChangeGuestTitle}
          />
        ))}

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
            <Grid item xs={3}>
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
              {/* <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                //value={age}
                //onChange={handleChange}
                label="ASAP"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select> */}
            </Grid>
            <Grid item xs={12}>
              <OrderPayment
                order={order}
                myKey={myInfo === null ? "" : myInfo.stripeTestKey}
                onPayment={onPayment}
              />
            </Grid>
          </Grid>
        </div>
      </div>
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
    for (var i = 0; i < orderDetails.length; i++) {
      if (
        orderDetails[i]["productId"] === menuId &&
        orderDetails[i]["guestSeq"] === guestId
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

    setOrderDetails(oldDetails => [...oldDetails, orderDetail]);
  }

  function updateOrderDetailByGuest(
    otherCharges,
    orderDetailIndex,
    isAdded,
    otherChargesSeq
  ) {
    let odArr = [...orderDetails];
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
    setOrderDetails(odArr);
  } // enf of updated guest order details
};
