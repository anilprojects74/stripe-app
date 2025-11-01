import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const apiUrl = import.meta.env.VITE_BACKEND_URL;

export default function SubscriptionForm() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const prices = {
    monthly: "price_1SHdQAFXftMVH4BVgUBgxDSm",
    quarterly: "price_1SHgSOFXftMVH4BV7F7tGNLG",
    halfYearly: "price_1SHgSxFXftMVH4BVMrxUeo42",
    yearly: "price_1SHgTJFXftMVH4BVuTa9jpK4",
  };

  const amounts = {
    monthly: 5,
    quarterly: 15,
    halfYearly: 30,
    yearly: 60,
  }

  const createSubscription = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`http://${apiUrl}/create-subscription`, {
        customerEmail: "prattipati1234@gmail.com",
        priceId: prices[selectedPlan],
      });
      setClientSecret(res.data.client_secret);
    } catch (err) {
      console.error("Error creating subscription:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5  w-100 d-flex justify-content-center">
      <div>
      <div className="text-center mb-4">
        <h2 className="fw-bold">Choose Your Subscription Plan</h2>
      </div>

      {/* Plan Selection */}
      <div className="d-flex justify-content-center flex-wrap flex-row gap-3 mb-4">
        {Object.keys(prices).map((plan) => (
          <button
            key={plan}
            onClick={() => {
              setSelectedPlan(plan);
              setClientSecret(""); // reset previous client secret
            }}
            className={`btn ${
              selectedPlan === plan ? "btn-primary" : "btn-outline-primary"
            } px-4 py-2 text-capitalize`}
          >
            {plan === "monthly"
              ? "Monthly"
              : plan === "quarterly"
              ? "3 Months"
              : plan === "halfYearly"
              ? "Half-Yearly"
              : "Yearly"}
          </button>
        ))}
      </div>

      {/* Subscribe Button */}
      <div className="text-center mb-4">
        <button
          className="btn btn-success btn-lg"
          onClick={createSubscription}
          disabled={loading}
        >
          {loading ? "Processing..." : "Subscribe"}
        </button>
      </div>

      {/* Stripe Payment Form */}
      <div className="d-flex justify-content-center">
        {clientSecret && (
          <div className="border rounded p-4 shadow-sm w-100" style={{ maxWidth: "420px" }}>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} amount={amounts[selectedPlan]}/>
            </Elements>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
