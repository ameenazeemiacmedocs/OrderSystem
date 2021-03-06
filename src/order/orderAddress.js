import React, { useState, useEffect } from "react";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Paper,
  Tabs,
  Tab,
  TextField
} from "@material-ui/core";

export const OrderAddress = props => {
  const {
    address,
    onAddressChange,
    onDeliveryTypeChange,
    addressError
  } = props;
  const [deliveryType, setDeliveryType] = useState(0);
  const handleChange = (event, newValue) => {
    setDeliveryType(newValue);
    onDeliveryTypeChange(newValue);
    console.log(newValue);
  };
  useEffect(() => {
    console.log("Order Type " + props.orderType);
    setDeliveryType(props.orderType);
  }, [props.orderType]);

  const addressHandleChange = name => event => {
    if (name === "mobileNumber") {
      let inputNumber = "+" + event.replace(/\D/gi, "");
      console.log(inputNumber);
      onAddressChange(name, inputNumber);
    } else {
      var val = event.target.value;

      onAddressChange(name, val);
    }
    // if (name.includes('Date')) {

    //     setAdSchedule(prev => ({ ...prev, [name]: event }));

    //     if (event !== null)
    //         setAdSchedule(prev => ({ ...prev, 'timezoneOffset': event.getTimezoneOffset() }));

    //     // setAdSchedule({ ...adSchedule, ['timezoneOffset']:event.getTimezoneOffset() });
    //     // setAdSchedule({ ...adSchedule, [name]: event });

    //     return;
    // }
    // var val = event.target.value;
    // //console.log(event.target.value);
    // if (name === "phoneNumber") {

    //     val = val.replace(/\D/gi, '');

    // }

    // setAdSchedule({ ...adSchedule, [name]: val });
  };

  return (
    <div>
      <Paper square>
        <Tabs
          value={deliveryType}
          //indicatorColor="secondary"
          //textColor="secondary"
          onChange={handleChange}
          //centered="false"
          variant="fullWidth"
        >
          <Tab label="Delivery" />

          <Tab label="pick-up" />
        </Tabs>
      </Paper>
      {address !== null && address !== undefined && (
        <Card raised={false}>
          {/* <CardHeader title="Delivery Address" /> */}
          <CardContent>
            <Grid container spacing={1} justify="flex-start">
              <Grid item xm="8" xs="12">
                <TextField
                  label="Name"
                  fullWidth
                  required
                  error={addressError.name}
                  variant="outlined"
                  value={address.name}
                  InputLabelProps={{ shrink: true }}
                  onChange={addressHandleChange("name")}
                />
              </Grid>
              <Grid item xm="4" xs="12">
                <MaterialUiPhoneNumber
                  required={true}
                  defaultCountry="us"
                  countryCodeEditable={false}
                  variant="outlined"
                  name="MobileNumber"
                  onlyCountries={["us"]}
                  onChange={addressHandleChange("mobileNumber")}
                  error={addressError.mobileNumber}
                  // inputProps={{
                  //   minLength: 17,
                  // }}

                  // error={
                  //   address.mobileNumber === "" ||
                  //   address.mobileNumber.length < 10
                  // }
                  fullWidth
                  // onKeyPress={(event) => handleKeyPress(event)}
                  label="Phone Number"
                  value={address.mobileNumber}
                />
              </Grid>

              {deliveryType === 0 && (
                <Grid item xs="12">
                  <TextField
                    label="Address"
                    fullWidth
                    required={deliveryType === 0}
                    variant="outlined"
                    multiline
                    row="4"
                    mobileNumber
                    InputLabelProps={{ shrink: true }}
                    error={addressError.address}
                    value={address.address}
                    onChange={addressHandleChange("address")}
                  />
                </Grid>
              )}
              {deliveryType === 0 && (
                <Grid item xs="4">
                  <TextField
                    label="City"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required={deliveryType === 0}
                    error={addressError.city}
                    //required
                    variant="outlined"
                    value={address.city}
                    onChange={addressHandleChange("city")}
                  />
                </Grid>
              )}
              {deliveryType === 0 && (
                <Grid item xs="4">
                  <TextField
                    label="State"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required={deliveryType === 0}
                    //required
                    variant="outlined"
                    value={address.state}
                    error={addressError.state}
                    onChange={addressHandleChange("state")}
                  />
                </Grid>
              )}
              {deliveryType === 0 && (
                <Grid item xs="4">
                  <TextField
                    label="Zip"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required={deliveryType === 0}
                    variant="outlined"
                    value={address.zipCode}
                    error={addressError.zipCode}
                    onChange={addressHandleChange("zipCode")}
                  />
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
