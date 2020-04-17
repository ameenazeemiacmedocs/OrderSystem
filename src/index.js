import React from "react";
import ReactDOM from "react-dom";
import { LandingPage } from "./LandingPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_75b75lAeCG8hV3b7mMzaLbiS00Wid0wpJD");

ReactDOM.render(
  <Elements stripe={stripePromise}>
    <LandingPage />
  </Elements>,

  document.querySelector("#root")
);
