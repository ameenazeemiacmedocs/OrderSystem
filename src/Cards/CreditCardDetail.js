import React from "react";
import Grid from "@material-ui/core/Grid";
import {
  StripeTextFieldNumber,
  StripeTextFieldExpiry,
  StripeTextFieldCVC
} from "./commonTextFields";

export default class CreditCardDetail extends React.Component {
  state = {
    creditCardNumberComplete: false,
    expirationDateComplete: false,
    cvcComplete: false,
    cardNameError: false,
    cardNumberError: false,
    expiredError: false,
    cvcError: false
  };

  onElementChange = (field, errorField) => ({
    complete,
    error = { message: null }
  }) => {
    this.setState({ [field]: complete, [errorField]: error.message });
    const expectedState = { ...this.state };
    expectedState[field] = complete;
    this.props.setFormComplete(
      expectedState.creditCardNumberComplete &&
        expectedState.cvcComplete &&
        expectedState.expirationDateComplete
    );
  };

  render() {
    const { cardNumberError, expiredError, cvcError } = this.state;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <StripeTextFieldNumber
            error={Boolean(cardNumberError)}
            labelErrorMessage={cardNumberError}
            onChange={this.onElementChange(
              "creditCardNumberComplete",
              "cardNumberError"
            )}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StripeTextFieldExpiry
            error={Boolean(expiredError)}
            labelErrorMessage={expiredError}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StripeTextFieldCVC
            error={Boolean(cvcError)}
            labelErrorMessage={cvcError}
          />
        </Grid>
      </Grid>
    );
  }
}
