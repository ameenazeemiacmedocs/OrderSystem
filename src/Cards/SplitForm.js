import React, { useMemo } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";
import axios from "axios";

import useResponsiveFontSize from "./useResponsiveFontSize";

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

const SplitForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const checkout = {
      MobileNumber: "0344444444",
      Amount: "10.05"
    };

    console.log("before call");
   var checkoutRequest =await axios
      .post(
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
debugger;
if(checkoutRequest.status===200)
{
     const result = await stripe.confirmCardPayment(checkoutRequest.data, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: { name: checkout.MobileNumber}
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
  

    // const result = await stripe.confirmCardPayment("", {
    //   payment_method: {
    //     card: elements.getElement(CardNumberElement),
    //     billing_details: { name: "ameen" }
    //   }
    // });

    // if (result.error) {
    //   alert(result.error.message);
    //   console.log(result.error.message);
    // } else {
    //   if (result.paymentIntent.status === "succeeded") {
    //     alert("show Success");

    //     console.log(result.paymentIntent);
    //   }
    // }

    // if (result.error) {
    //   alert(result.error.message);
    //   // Show error to your customer (e.g., insufficient funds)
    //   console.log(result.error.message);
    // } else {
    //   // The payment has been processed!
    //   if (result.paymentIntent.status === 'succeeded') {

    //       alert("show Success");
    //       console.log(result.paymentIntent);

    //     // Show a success message to your customer
    //     // There's a risk of the customer closing the window before callback
    //     // execution. Set up a webhook or plugin to listen for the
    //     // payment_intent.succeeded event that handles any business critical
    //     // post-payment actions.
    //   }
    // const payload = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardNumberElement)
    // });
    // console.log("[PaymentMethod]", payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card number
        <CardNumberElement />
        {/* <CardNumberElement
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
        /> */}
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
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default SplitForm;
