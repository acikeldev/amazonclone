const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51HWoaTCRPhIR9XrZHIDwDMnOsfveTDuQ3UxhRrO97cXgTactoSQIvFxSZ9LDmLz62RTFz1DBNrmGAHhplA4kpTZZ00fgqGK5EI"
);

//API

//App config
const app = express();
//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API Routes
app.get("/", (req, res) => res.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("payment request recieved", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
//Listen Command
exports.api = functions.https.onRequest(app);

//Example Endpoint
//http://localhost:5001/challenge-e7536/us-central1/api
