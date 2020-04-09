import React, { useMemo } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";
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

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    setIsFormSubmit(true);
    try {
      const checkout = {
        MobileNumber: "0344444444",
        Amount: props.totalAmount
      };

      console.log("before call");
      var checkoutRequest = await axios.post(
        `https://raffleapi.azurewebsites.net/api/foodmenu/checkout`,
        checkout,
        {
          headers: {
            "content-type": "application/json"
          }
        }
      );
      // .then(p => {
      //   console.log("sucess " + p.data);
      // })
      // .catch(error => {
      //   console.log("error" + error);
      // });

      if (checkoutRequest.status === 200) {
        const result = await stripe.confirmCardPayment(checkoutRequest.data, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: { name: checkout.MobileNumber }
          }
        });

        if (result.error) {
          alert(result.error.message);
          console.log(result.error.message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            alert("show Success");

            console.log(result.paymentIntent);
          }
        }
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsFormSubmit(false);
    }
  };

  return (
    <div className={classes.root}>
      <form className={classes.root} onSubmit={handleSubmit} noValidate>
        <label>
          Card number
          {/* <TextField
            label="Card Number"
            //variant="outlined"
            size="small"
           
            disabled
            InputProps={{
              component: {CardNumberElement}
               
            }}
          /> */}
          {/* <CardNumberElement /> */}
          <CardNumberElement
            options={options}
            onReady={() => {
              console.log("CardNumberElement [ready]");
            }}
            onChange={event => {
              console.log("CardNumberElement [change]", event);
            }}
            onBlur={() => {
              console.log("CardNumberElement [blur]");
            }}
            onFocus={() => {
              console.log("CardNumberElement [focus]");
            }}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            options={options}
            onReady={() => {
              console.log("CardNumberElement [ready]");
            }}
            onChange={event => {
              console.log("CardNumberElement [change]", event);
            }}
            onBlur={() => {
              console.log("CardNumberElement [blur]");
            }}
            onFocus={() => {
              console.log("CardNumberElement [focus]");
            }}
          />
        </label>
        <label>
          CVC
          <CardCvcElement
            options={options}
            onReady={() => {
              console.log("CardNumberElement [ready]");
            }}
            onChange={event => {
              console.log("CardNumberElement [change]", event);
            }}
            onBlur={() => {
              console.log("CardNumberElement [blur]");
            }}
            onFocus={() => {
              console.log("CardNumberElement [focus]");
            }}
          />
        </label>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={!stripe || props.totalAmount <= 0 || isFormSubmit}
        >
          Pay ${props.totalAmount}
        </Button>
      </form>
    </div>
  );
};

export default SplitForm;
