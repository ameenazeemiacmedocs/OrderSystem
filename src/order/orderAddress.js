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
  const { address, onAddressChange } = props;
  const [deliveryType, setDeliveryType] = useState(0);
  const handleChange = (event, newValue) => {
    setDeliveryType(newValue);
  };
  // useEffect(() => {
  //     console.log("address " + address);
  // }, [address]);

  const addressHandleChange = name => event => {
    if (name === "mobileNumber") {
      let inputNumber = "+" + event.replace(/\D/gi, "");
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
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          //centered="false"
          variant="fullWidth"
        >
          <Tab label="Delivery Address" />

          {/* <Tab label="Take Away" /> */}
        </Tabs>
      </Paper>
      {address !== null && address !== undefined && deliveryType === 0 && (
        <Card raised={true}>
          {/* <CardHeader title="Delivery Address" /> */}
          <CardContent>
            <Grid container spacing={1} justify="flex-start">
              <Grid item xs="8">
                <TextField
                  label="Name"
                  fullWidth
                  required
                  error={address.name === ""}
                  variant="outlined"
                  value={address.name}
                  InputLabelProps={{ shrink: true }}
                  onChange={addressHandleChange("name")}
                />
              </Grid>
              <Grid item xs="4">
                <MaterialUiPhoneNumber
                  required={false}
                  defaultCountry="us"
                  variant="outlined"
                  name="MobileNumber"
                  onChange={addressHandleChange("mobileNumber")}
                  // inputProps={{
                  //   minLength: 17,
                  // }}

                  error={
                    address.mobileNumber === "" ||
                    address.mobileNumber.length < 10
                  }
                  fullWidth
                  // onKeyPress={(event) => handleKeyPress(event)}
                  label="Phone Number"
                  value={address.mobileNumber}
                />
                {/* <TextField
                  label="Mobile"
                  fullWidth
                  type="phoneNumber"
                  required
                  variant="outlined"
                  error={
                    address.mobileNumber === "" ||
                    address.mobileNumber.length < 10
                  }
                  value={address.mobileNumber}
                  InputLabelProps={{ shrink: true }}
                  onChange={addressHandleChange("mobileNumber")}
                /> */}
              </Grid>
              <Grid item xs="12">
                <TextField
                  label="Address"
                  fullWidth
                  //required
                  variant="outlined"
                  multiline="true"
                  row="4"
                  InputLabelProps={{ shrink: true }}
                  value={address.address}
                  onChange={addressHandleChange("address")}
                />
              </Grid>

              <Grid item xs="4">
                <TextField
                  label="City"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  //required
                  variant="outlined"
                  value={address.city}
                  onChange={addressHandleChange("city")}
                />
              </Grid>
              <Grid item xs="4">
                <TextField
                  label="State"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  //required
                  variant="outlined"
                  value={address.state}
                  onChange={addressHandleChange("state")}
                />
              </Grid>
              <Grid item xs="4">
                <TextField
                  label="Zip"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  variant="outlined"
                  value={address.zipCode}
                  onChange={addressHandleChange("zipCode")}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
