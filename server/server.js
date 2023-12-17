import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import bodyParser from "body-parser";

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/pay", async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  await stripe.charges.create({
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running on port 8000");
});
