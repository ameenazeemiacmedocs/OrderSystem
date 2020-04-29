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
  Chip,
  Tab,
  Tabs
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
        <div>
          <Tabs
            value={0}
            indicatorColor="primary"
            textColor="primary"
            //onChange={handleChange}
            //centered="false"
            variant="fullWidth"
          >
            <Tab label="Payment Information" />
          </Tabs>
          <Card raised={true}>
            {/* <CardHeader title="Payment Information" /> */}
            <CardContent>
              {/* // <Elements stripe={stripePromise}> */}
              <Grid container spacing={1} justify="flex-start">
                <SplitForm
                  totalAmount={
                    order != null && Number(order.netTotal).toFixed(2)
                  }
                  onPayment={props.onPayment}
                  isValid={props.isValid}
                />
              </Grid>
              {/* <ElementDemos demos={demos} /> */}
              {/* </Elements> */}
            </CardContent>
          </Card>
        </div>
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
                label="Tax"
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
