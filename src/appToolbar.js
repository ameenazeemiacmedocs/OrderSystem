import React from "react";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const AppToolbar = props => {
  const trigger = useScrollTrigger();

  return (
    <AppBar elevation={trigger ? 4 : 0} color="default" position="sticky">
      <Toolbar variant={trigger ? "dense" : "regular"}>
        {trigger ? (
          <div
            style={{
              margin: "5px 0 0 0",
              display: "flex",
              alignItems: "center"
            }}
          >
            {/* <Avatar
                  style={{
                    margin: "0 10px 0 0",
                    height: "50px",
                    width: "50px"
                  }}
                >
                  M
                </Avatar> */}
            <img
              alt="logo"
              src={props.merlinLogo}
              style={
                {
                  // width: "40px"
                  // height: '150px'
                }
              }
            />
            <div
              style={{
                width: "100%",
                flex: 1,
                backgroundColor: "lightgreen"
              }}
            >
              <Typography
                variant="body1"
                style={{ width: "100%" }}
                align="left"
              >
                &lt;Conversation history&gt;
              </Typography>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              margin: "5px 0 5px 0"
            }}
          >
            <img
              alt="logo"
              src={props.topLogo}
              style={{
                width: "400px"
                // height: '150px'
              }}
            />
            <Typography variant="body1">
              Your order will be delivered between 7:15 and 7:45
            </Typography>
            <div
              style={{
                width: "100%",
                flex: 1,
                margin: "5px 0 0 0",
                display: "flex",
                alignItems: "center"
              }}
            >
              {/* <Avatar
                  style={{
                    margin: "0 10px 0 0",
                    height: "50px",
                    width: "50px"
                  }}
                >
                  M
                </Avatar> */}
              <img
                alt="logo"
                src={props.merlinLogo}
                style={{
                  width: "120px"
                  // height: '150px'
                }}
              />
              <div
                style={{
                  // width: '50vw',
                  flex: 1,
                  justifyContent: "flex-start",
                  alignSelf: "center"
                }}
              >
                <Typography variant="body1" align="left">
                  &lt;Conversation history&gt;
                </Typography>
              </div>
            </div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
