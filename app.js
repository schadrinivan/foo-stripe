// server.js
import express from "express";
import Stripe from "stripe";

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",                        // or "subscription"
    line_items: [{ price: "price_123", quantity: 1 }],
    success_url: "https://your.app/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://your.app/cancel",
  });
  res.json({ url: session.url });
});

app.listen(3000);
