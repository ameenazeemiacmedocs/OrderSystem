import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";
import TextField from "@material-ui/core/TextField";
import StripeInput from "./StripeInput";

function StripeTextField(props) {
  const { InputLabelProps, stripeElement, InputProps, ...other } = props;

  return (
    <TextField
      fullWidth
      variant="outlined"
      required
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true
      }}
      InputProps={{
        ...InputProps,
        inputProps: {
          component: stripeElement
        },
        inputComponent: StripeInput
      }}
      {...other}
    />
  );
}

export function StripeTextFieldNumber(props) {
  return (
    <StripeTextField
      label="Credit Card Number"
      stripeElement={CardNumberElement}
      {...props}
    />
  );
}

export function StripeTextFieldExpiry(props) {
  return (
    <StripeTextField
      label="Expires"
      stripeElement={CardExpiryElement}
      {...props}
    />
  );
}

export function StripeTextFieldCVC(props) {
  return (
    <StripeTextField
      label="CVC Code"
      stripeElement={CardCvcElement}
      {...props}
    />
  );
}
