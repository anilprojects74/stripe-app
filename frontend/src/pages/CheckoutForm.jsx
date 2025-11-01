import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ amount = 5, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setMessage("");

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:5173/success",
        },
        redirect: "if_required",
      });

      if (error) setMessage(error.message);
      else if (paymentIntent?.status === "succeeded") {
        setMessage("First payment successful! Subscription is active.");
        window.location.href = "/success";
      }
    } catch (err) {
      console.error(err);
      setMessage(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "50px auto" }}>
      <PaymentElement />
      <button type="submit" className="btn btn-primary mt-3" disabled={!stripe || loading || !clientSecret}>
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
      {message && <div className="mt-3 text-danger">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
