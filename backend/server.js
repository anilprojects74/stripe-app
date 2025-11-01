const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
require('dotenv').config();

const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Stripe backend running!');
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Custom Payment' },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://${FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://${FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ Retrieve Checkout Session Details
app.post("/retrieve-checkout-session", async (req, res) => {
  try {
    const { session_id } = req.body;
    if (!session_id) {
      return res.status(400).json({ error: "Missing session_id" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent", "customer"],
    });

    res.json(session);
  } catch (err) {
    console.error("Error retrieving checkout session:", err.message);
    res.status(400).json({ error: err.message });
  }
});

app.get("/checkout-payments", async (req, res) => {
  try {
    // You can set a reasonable limit (e.g., 100 max)
    const sessions = await stripe.checkout.sessions.list({ limit: 100 });
    
    const formatted = sessions.data.map((s) => ({
      id: s.id,
      amount: (s.amount_total / 100).toFixed(2),
      status: s.payment_status,
      created_at: new Date(s.created * 1000).toLocaleString(),
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching sessions:", err);
    res.status(500).json({ error: err.message });
  }
});


app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/retrieve-payment-intent", async (req, res) => {
  try {
    const { client_secret } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(
      client_secret.split("_secret_")[0]
    );
    res.json(paymentIntent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/create-subscription", async (req, res) => {
  try {
    const { customerEmail, priceId } = req.body;

    if (!customerEmail || !priceId) {
      return res.status(400).json({ error: "Missing customerEmail or priceId" });
    }

    // 1️⃣ Find or create customer
    const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
    let customer = customers.data.length ? customers.data[0] : null;

    if (!customer) {
      customer = await stripe.customers.create({ email: customerEmail });
    }

    // 2️⃣ Create subscription with first payment
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete", // subscription incomplete until first payment
      expand: ["latest_invoice.payment_intent"], // expand the first payment intent
    });

    const firstPaymentIntent = subscription.latest_invoice.payment_intent;

    // 3️⃣ Return subscription info + client_secret for frontend
    res.json({
      subscriptionId: subscription.id,
      client_secret: firstPaymentIntent.client_secret, // frontend uses this to confirm payment
      status: subscription.status,
      latest_invoice: subscription.latest_invoice?.id || null,
    });

  } catch (err) {
    console.error("Error creating subscription:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

