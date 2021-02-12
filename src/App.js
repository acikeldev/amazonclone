import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";
const promise = loadStripe(
  "pk_test_51HWoaTCRPhIR9XrZsh0DEcd20WhxgezGsOzciP8mIdfmyVXaWD5u74zj4NTHey85Olc4eSBD99Z09dozUCb5HUdG00qazsWMjY"
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <>
              <Header />
              <Home />
            </>
          )}
        />
        <Route
          path="/checkout"
          render={() => (
            <>
              <Header />
              <Checkout />
            </>
          )}
        />
        <Route
          path="/payment"
          render={() => (
            <>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </>
          )}
        />
        <Route path="/login" component={Login} />
        <Route
          path="/orders"
          render={() => (
            <>
              <Header />
              <Orders />
            </>
          )}
        />
        <Route
          render={() => (
            <div>
              <h1>NOT FOUND</h1>
            </div>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
