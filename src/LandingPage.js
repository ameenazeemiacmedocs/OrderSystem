import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import LoadingOverlay from "./common/LoadingOverlay";
import SuccessOverlay from "./common/SuccessOverlay";
import { OrderLanding } from "./orderLanding";
import Container from "@material-ui/core/Container";
import CheckIcon from "@material-ui/icons/Check";

export const LandingPage = () => {
  const [myTheme, setMyTheme] = useState(
    createMuiTheme({
      palette: {
        type: "light",
        primary: {
          // Purple and green play nicely together.
          //  main: "#3f51b5"
          main: "#2196f3"
        },
        secondary: {
          // This is green.A700 as hex.
          // main: "#11cb5f"
          main: "#f50057"
        }
      }
    })
  );

  const apiURL = "https://raffleapi.azurewebsites.net/api/";
  const [client, setClient] = useState("");
  const [source, setSource] = useState("url");
  const [foodMenu, setFoodMenus] = useState(null);
  const [myInfo, setMyInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //const [paymentSuccessfull,setPaymentSuccessfull]=useState(false);
  const [payment, setPayment] = useState(
    null
    //   {
    //   orderId: "ABC",
    //   waitTime: "",
    //   sucessMessage:
    //     "Thank you for your order! We will keep you informed of your order status through text messaging."
    // }
  );
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  // effect on having client
  useEffect(() => {
    console.log("Client Effect");
    if (client === "") {
      var clientParam = getParameterByName("c");
      if (clientParam === "" || clientParam === null) {
        setClient("POSIGENT-DEV");
      } else {
        setClient(clientParam);
      }
      var clientSource = getParameterByName("s");

      if (clientSource === "" || clientSource === null) {
        setSource("URL");
      }
    }

    if (foodMenu == null && client !== "") {
      // axios.defaults.headers.common["CLIENT_CODE"] = client;
      // var formData = new FormData();
      // formData.append("source", clientSource);
      // axios.post(`${apiURL}orders/defaultOrder`, formData, {
      //   headers: { 'content-type': 'multipart/form-data', 'CLIENT_CODE': client }
      // }).then(result => {

      //   setDefOrder(result.data);
      // })
      //   .catch(error => {
      //     console.error(error);
      //   });

      setIsLoading(true);

      console.log("main demo");
      axios
        .all([
          axios.get(`${apiURL}orders/myProducts`, {
            headers: {
              "content-type": "multipart/form-data",
              CLIENT_CODE: client
            }
          }),
          axios.get(`${apiURL}orders/myInfo`, {
            headers: {
              "content-type": "multipart/form-data",
              CLIENT_CODE: client
            }
          })
        ])
        .then(
          axios.spread((...responses) => {
            debugger;
            setFoodMenus(responses[0].data);
            // console.log(responses[1]);
            setMyInfo(responses[1].data);
            setIsLoading(false);
          })
        )
        .catch(error => {
          setIsLoading(false);
        });
      // axios.get(`${apiURL}orders/myProducts`, {
      //   headers: { 'content-type': 'multipart/form-data', 'CLIENT_CODE': client }
      // }).then(result => {
      //   setFoodMenus(result.data);
      //   setIsLoading(false);
      // })
      //   .catch(error => {
      //     setIsLoading(false);
      //     console.error(error);
      //   });
    }
  }, [client]);

  useEffect(() => {
    if (myInfo && myInfo !== null) {
      if (myInfo.primaryColor && myInfo.secondaryColor) {
        const newTheme = createMuiTheme({
          palette: {
            type: "light",
            primary: {
              main: myInfo.primaryColor
            },
            secondary: {
              main: myInfo.secondaryColor
            }
          }
        });
        setMyTheme(newTheme);
      }
    }
  }, [myInfo]);

  const onPaymentSuccess = (orderId, waitTime) => {
    let payment = {
      orderId: orderId,
      waitTime: waitTime,
      sucessMessage:
        "Thank you for your order! We will keep you informed of your order status through text messaging."
    };

    setPayment(payment);
  };
  return (
    <div>
      <ThemeProvider theme={myTheme}>
        <LoadingOverlay open={isLoading} title="loading..." />

        {myInfo !== null && payment === null && (
          <OrderLanding
            apiURL={apiURL}
            client={client}
            source={source}
            foodMenu={foodMenu}
            myInfo={myInfo}
            onPaymentSuccess={onPaymentSuccess}
          />
        )}
        {payment !== null && <PaymentSuccessPage payment={payment} />}
      </ThemeProvider>
    </div>
  );
};

export const PaymentSuccessPage = props => {
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(true);
  useEffect(() => {
    console.log("Payment page");
  });
  return (
    <div>
      <Container disableGutters="false" maxWidth="xs">
        <SuccessOverlay
          open={showSuccessOverlay}
          message={props.payment.sucessMessage}
        />
      </Container>
    </div>
  );
};
