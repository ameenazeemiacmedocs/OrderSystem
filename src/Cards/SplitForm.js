import React, { useMemo } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";
import {
  StripeTextFieldNumber,
  StripeTextFieldExpiry,
  StripeTextFieldCVC
} from "./commonTextFields";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  IconButton,
  Button,
  Box,
  TextField,
  InputAdornment
} from "@material-ui/core";
import useResponsiveFontSize from "./useResponsiveFontSize";
import { flexbox } from "@material-ui/system";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginBottom: 5,
    margin: 5,
    padding: 5,
    display: flexbox
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
const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const SplitForm = props => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [isFormSubmit, setIsFormSubmit] = React.useState(false);

  const [cardNumber, setCardNumber] = React.useState({
    error: undefined,
    empty: false,
    complete: false
  });

  const [expiry, setExpiry] = React.useState({
    error: undefined,
    empty: false,
    complete: false
  });
  const [ccv, setCCV] = React.useState({
    elementType: "cardExpiry",
    error: undefined,

    empty: false,
    complete: false
  });

  const onElementChange = event => {
    // console.log("Event " + event.error.message);

    if (event.elementType === "cardNumber") {
      let nCard = { ...cardNumber };
      nCard.error = event.error;
      nCard.empty = event.empty;
      nCard.complete = event.complete;

      setCardNumber(nCard);
      // setCardNumber(oldCard=> {...oldCard,nCard});
      // Card e
    } else if (event.elementType === "cardCvc") {
      let nCard = { ...ccv };
      nCard.error = event.error;
      nCard.empty = event.empty;
      nCard.complete = event.complete;

      setCCV(nCard);
    } else if (event.elementType === "cardExpiry") {
      let nCard = { ...expiry };
      nCard.error = event.error;
      nCard.empty = event.empty;
      nCard.complete = event.complete;

      setExpiry(nCard);
    }
  };

  const isFormValid = () => {
    if (cardNumber.complete && expiry.complete && ccv.complete) return true;
    else return false;
  };

  const handleSubmit = async event => {
    debugger;
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (!isFormValid()) {
      alert("Please fill all Payment Information");
      return;
    }

    // setIsFormSubmit(true);
    const paymethod = {
      card: elements.getElement(CardNumberElement),
      billing_details: { name: "checkout.MobileNumber" }
    };

    alert("Payment is valid");
    // props.onPayment(paymethod);

    // try {
    //   const checkout = {
    //     MobileNumber: "0344444444",////
    //     Amount: props.totalAmount
    //   };

    //   console.log("before call");
    //   var checkoutRequest = await axios.post(
    //     `https://raffleapi.azurewebsites.net/api/foodmenu/checkout`,
    //     checkout,
    //     {
    //       headers: {
    //         "content-type": "application/json"
    //       }
    //     }
    //   );
    //   // .then(p => {
    //   //   console.log("sucess " + p.data);
    //   // })
    //   // .catch(error => {
    //   //   console.log("error" + error);
    //   // });

    //   if (checkoutRequest.status === 200) {
    //     const result = await stripe.confirmCardPayment(checkoutRequest.data, {
    //       payment_method: {
    //         card: elements.getElement(CardNumberElement),
    //         billing_details: { name: checkout.MobileNumber }
    //       }
    //     });

    //     if (result.error) {
    //       alert(result.error.message);
    //       console.log(result.error.message);
    //     } else {
    //       if (result.paymentIntent.status === "succeeded") {
    //         alert("show Success");

    //         console.log(result.paymentIntent);
    //       }
    //     }
    //   }
    // } catch (err) {
    //   alert(err.message);
    // } finally {
    //   setIsFormSubmit(false);
    // }
  };
  return (
    // <div className={classes.root}>
    <form className={classes.root} onSubmit={handleSubmit}>
      <Grid container spacing={1} justify="flex-start">
        <Grid item xs={12}>
          <StripeTextFieldNumber
            onChange={onElementChange}
            error={cardNumber.error}
            labelErrorMessage={cardNumber.error}
            // onChange={this.onElementChange(
            //   "creditCardNumberComplete",
            //   "cardNumberError"
            // )}
          />
        </Grid>
        <Grid item xs={6}>
          <StripeTextFieldExpiry
            onChange={onElementChange}
            error={expiry.error}
            labelErrorMessage={expiry.error}
            // error={Boolean(cardNumberError)}
            // labelErrorMessage={cardNumberError}
            // onChange={this.onElementChange(
            //   "creditCardNumberComplete",
            //   "cardNumberError"
            // )}
          />
        </Grid>
        <Grid item xs={6}>
          <StripeTextFieldCVC
            error={ccv.error}
            labelErrorMessage={ccv.error}
            onChange={onElementChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={
              !stripe ||
              props.totalAmount <= 0 ||
              isFormSubmit ||
              !isFormValid() ||
              !props.isValid
            }
          >
            Pay ${props.totalAmount}
          </Button>
        </Grid>
      </Grid>
    </form>
    //</div>
  );
  // return (
  //   <div className={classes.root}>
  //     <form className={classes.root} onSubmit={handleSubmit} noValidate>
  //       <Grid container spacing={2}>
  //         <Grid item xs={12} />
  //         <label>
  //           Card number
  //           <CardNumberElement
  //             options={options}
  //             onReady={() => {
  //               console.log("CardNumberElement [ready]");
  //             }}
  //             onChange={event => {
  //               console.log("CardNumberElement [change]", event);
  //             }}
  //             onBlur={() => {
  //               console.log("CardNumberElement [blur]");
  //             }}
  //             onFocus={() => {
  //               console.log("CardNumberElement [focus]");
  //             }}
  //           />
  //         </label>
  //       </Grid>

  //       <label>
  //         Expiration date
  //         <CardExpiryElement
  //           options={options}
  //           onReady={() => {
  //             console.log("CardNumberElement [ready]");
  //           }}
  //           onChange={event => {
  //             console.log("CardNumberElement [change]", event);
  //           }}
  //           onBlur={() => {
  //             console.log("CardNumberElement [blur]");
  //           }}
  //           onFocus={() => {
  //             console.log("CardNumberElement [focus]");
  //           }}
  //         />
  //       </label>
  //       <label>
  //         CVC
  //         <CardCvcElement
  //           options={options}
  //           onReady={() => {
  //             console.log("CardNumberElement [ready]");
  //           }}
  //           onChange={event => {
  //             console.log("CardNumberElement [change]", event);
  //           }}
  //           onBlur={() => {
  //             console.log("CardNumberElement [blur]");
  //           }}
  //           onFocus={() => {
  //             console.log("CardNumberElement [focus]");
  //           }}
  //         />
  //       </label>
  //       <Button
  //         type="submit"
  //         variant="contained"
  //         color="primary"
  //         size="large"
  //         disabled={!stripe || props.totalAmount <= 0 || isFormSubmit}
  //       >
  //         Pay ${props.totalAmount}
  //       </Button>
  //     </form>
  //   </div>
  // );
};

export default SplitForm;
