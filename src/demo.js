import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import CardForm from "./CardForm";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import {
  Grid,
  IconButton,
  Button,
  Box,
  TextField,
  InputAdornment
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
import { FoodArea } from "./food";
import { GuestOrder } from "./guestOrder";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginBottom: 5
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  column: {},
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
    {
      Id: "",
      guestId: "",
      qty: 2,
      menuId: "",
      subTotal: 0,
      price: 0,
      otherCharges: [
        {
          menuItemDetailId: "",
          extraCharge: 0
        }
      ]
    }
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
  const [order, setOrder] = useState({
    orderId: "1",
    subTotal: 0,
    tax: 0,
    total: 0
  });

  Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };
  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  function findOrderDetailByMenuId(array, menuId, guestId) {
    // orderDetails.findIndex(od=>{return od.menduId=men});
    return array.find(element => {
      return element.menuId === menuId;
    });
  }

  function getIndex(value, arr, prop) {
    console.log("Finding Index of " + value);
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  function getGuestItemIndex(menuId, guestId) {
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
  //const GuestContext = React.createContext(orderDetails);
  const updateGuestsTotal = () => {
    var helper = [];
    var results = orderDetails.reduce(function(r, o) {
      var key = o.guestId;
      if (!helper[key]) {
        helper[key] = Object.assign(
          {},
          { guestId: r.guestId, amount: r.subTotal, qty: r.qty }
        );
        r.push(helper[key]);
      } else {
        helper[key].amount += r.subTotal;
        helper[key].qty += r.qty;
      }
      return r;
    }, []);

    console.log();
  };
  const updateGuests = guestIndex => {
    if (guestIndex >= 0) {
      let newArr = [...guests];
      let guestAmount = 0;
      let guestItems = 0;
      orderDetails.forEach(od => {
        if (od.guestId === newArr[guestIndex].guestId) {
          guestAmount += od.subTotal;
          guestItems += od.qty;
        }
      });
      newArr[guestIndex].totalAmount = guestAmount;
      newArr[guestIndex].totalItems = guestItems;
      // if (isAdded) {
      //   newArr[guestIndex].totalAmount += qty * price;
      //   console.log(newArr[guestIndex].totalAmount);
      //   newArr[guestIndex].totalItems += qty;
      // } else {
      //   newArr[guestIndex].totalAmount -= qty * price;
      //   newArr[guestIndex].totalItems -= qty;
      // }

      setGuests(newArr);
      let subTotal = 0;
      let tax = 0;
      let totalAmount = 0;
      guests.forEach(i => {
        subTotal += i.totalAmount;
      });

      let oldOrder = order;
      oldOrder.subTotal = subTotal;
      oldOrder.tax = 0;
      oldOrder.total = oldOrder.subTotal + oldOrder.tax;
      setOrder(oldOrder);
    }
  };

  const onChangeQty = (
    menuItem,
    guestId,
    isAdded,
    otherCharges = undefined
  ) => {
    console.log(
      "On Change Qty " +
        menuItem +
        " guest " +
        guestId +
        " isAdded " +
        isAdded +
        " other charges " +
        otherCharges
    );
    //console.log("Qty is added" + isAdded);
    var guestIndex = getIndex(guestId, guests, "guestId");

    if (isAdded) {
      //var foundIndex = getIndex(menuItem.id, orderDetails, "menuId");

      var foundIndex = getGuestItemIndex(menuItem.id, guestId);

      //var isFound = findOrderDetailByMenuId(orderDetails, menuItem.id, "");
      if (foundIndex >= 0) {
        // add items
        let newArr = [...orderDetails];
        if (otherCharges === undefined) {
          newArr[foundIndex].qty += 1;
          newArr[foundIndex].subTotal =
            newArr[foundIndex].qty * newArr[foundIndex].price;
          console.log(newArr);
        } // other charges
        else {
          // var chargesIndex=getIndex(otherCharges.id,newArr[foundIndex].otherCharges,"menuItemDetailId") ;
          // if(chargesIndex>=0)
          // {
          //   newArr[foundIndex].otherCharges[chargesIndex]
          // }

          newArr[foundIndex].otherCharges.push({
            menuItemDetailId: otherCharges.id,
            extraCharge: otherCharges.extraCharge
          });
        }

        //  updateGuests(guestIndex,newArr[foundIndex]);
        setOrderDetails(newArr);
        updateGuests(guestIndex);
        //isFound.qty += 1;
        //console.log("Found Item " + isFound.qty);
      } else {
        //add new Object
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
            menuItemDetailId: otherCharges.id,
            extraCharge: otherCharges.extraCharge
          });
        }

        setOrderDetails(oldDetails => [...oldDetails, orderDetail]);
        updateGuests(guestIndex);
        // setTheArray(oldArray => [...oldArray, `Entry ${oldArray.length}`]);
      }
    } else {
      console.log("Qty is removed to " + menuItem.shortName);
      // var foundIndex = getIndex(menuItem.id, orderDetails, "menuId");
      var foundIndex = getGuestItemIndex(menuItem.id, guestId);
      console.log("FondIndex " + foundIndex);
      //var isFound = findOrderDetailByMenuId(orderDetails, menuItem.id, "");
      if (foundIndex >= 0) {
        // add items
        let newArr = [...orderDetails];

        if (otherCharges === undefined) {
          if (newArr[foundIndex].qty > 0) {
            newArr[foundIndex].qty -= 1;
            newArr[foundIndex].subTotal =
              newArr[foundIndex].qty * newArr[foundIndex].price;
            //  updateGuests(guestIndex, 1, newArr[foundIndex].price, isAdded);
            setOrderDetails(newArr);
            updateGuests(guestIndex);
          } // qty
        } // otherCharges // other charges
        else {
          var chargesIndex = getIndex(
            otherCharges.id,
            newArr[foundIndex].otherCharges,
            "menuItemDetailId"
          );
          if (chargesIndex >= 0) {
            console.log("Removing other charges");
            newArr[foundIndex].otherCharges.remove(chargesIndex);
            //updateGuests(guestIndex, 1, newArr[foundIndex].price, isAdded);
            setOrderDetails(newArr);
            updateGuests(guestIndex);
          }
        }
        //isFound.qty += 1;
        //console.log("Found Item " + isFound.qty);
      } // found index
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
  };
  return (
    <div className={classes.root}>
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
          />
        ))}

        <Box display="flex" flexDirection="row" justifyContent="flex-start">
          <Button variant="contained" color="primary" onClick={addGuest}>
            Add Another Guest
          </Button>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="flex-end" m={1}>
          <TextField
            label="Sub Total"
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
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="flex-end" m={1}>
          <TextField
            label="Tax @ 5.86%"
            //variant="outlined"
            size="small"
            value={Number(order.tax).toFixed(2)}
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="flex-end" m={1}>
          <TextField
            label="Total"
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
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          // sm={6}
          // width="full"
        >
          <Elements stripe={stripePromise}>
            <CardForm />
            {/* <ElementDemos demos={demos} /> */}
          </Elements>
        </Box>
      </div>
    </div>
  );
}

// export const GuestOrder = props => {
//   const classes = useStyles();

//   const foodAreas = foodMenus.map(
//     area =>
//       area.menuItems.length > 0 && (
//         <FoodArea key={area.name} area={area} {...props} />
//       )
//   );

//   return (
//     <div className={classes.root}>
//       <ExpansionPanel>
//         <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//         >
//           <Grid container direction="row">
//             <Grid item xs>
//               {props.guestName}
//             </Grid>
//             <Grid item xs>
//               {props.totalItems}
//             </Grid>
//             <Grid item xs>
//               &#36;{Number(props.totalAmount).toFixed(2)}
//               {/* {props.totalAmount} */}
//             </Grid>
//           </Grid>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails className={classes.detailPanel}>
//           <List
//             component="nav"
//             aria-labelledby="nested-list-subheader"
//             className={classes.root}
//           >
//             {foodAreas}
//           </List>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//     </div>
//   );
// };
