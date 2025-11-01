import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const apiUrl = import.meta.env.VITE_BACKEND_URL;

export default function ElementsPage() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post(`http://${apiUrl}/create-payment-intent`, { amount: 5000 })
      .then((res) => setClientSecret(res.data.client_secret))
      .catch((err) => console.error("Error creating payment intent:", err));
  }, []);

  if (!clientSecret) return <h3 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h3>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}
