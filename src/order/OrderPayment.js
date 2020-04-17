import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import SplitForm from "../Cards/SplitForm";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Button,
  Box,
  TextField,
  InputAdornment,
  Collapse,
  Paper,
  ListItemSecondaryAction,
  Chip
} from "@material-ui/core";

import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

//const stripePromise = loadStripe("pk_test_75b75lAeCG8hV3b7mMzaLbiS00Wid0wpJD");
export const OrderPayment = props => {
  const { order } = props;

  return (
    <div>
      {order !== null && order.netTotal > 0 && (
        <Card raised={true}>
          <CardHeader title="Payment Information" />
          <CardContent>
            {/* // <Elements stripe={stripePromise}> */}
            <Grid container spacing={1} justify="flex-start">
              <SplitForm
                totalAmount={order != null && order.netTotal}
                onPayment={props.onPayment}
              />
            </Grid>
            {/* <ElementDemos demos={demos} /> */}
            {/* </Elements> */}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export const OrderTotals = props => {
  const { order } = props;
  return (
    <div>
      <Card raised={false}>
        <CardContent>
          <Grid container spacing={1} justify="flex-end">
            <Grid item>
              <TextField
                label="Sub Total"
                variant="outlined"
                //variant="outlined"
                size="small"
                value={order !== null && Number(order.orderTotal).toFixed(2)}
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Tax @ 5.86%"
                //variant="outlined"
                size="small"
                variant="outlined"
                value={order !== null && Number(order.tax).toFixed(2)}
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Total"
                variant="outlined"
                //variant=""
                size="small"
                value={order !== null && Number(order.netTotal).toFixed(2)}
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
    </div>
  );
};
