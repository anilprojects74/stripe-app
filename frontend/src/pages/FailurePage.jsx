// src/pages/FailurePage.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function FailurePage() {
  const [searchParams] = useSearchParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clientSecret = searchParams.get("payment_intent_client_secret");

  useEffect(() => {
    if (!clientSecret) return;

    const fetchPayment = async () => {
      try {
        const { data } = await axios.post("http://localhost:5000/retrieve-payment-intent", {
          client_secret: clientSecret,
        });
        setPayment(data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [clientSecret]);

  if (loading) return <div style={{ textAlign: "center" }}>Loading payment details...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h1 style={{ color: "red" }}>❌ Payment Failed</h1>
      <p>Sorry, your payment could not be completed.</p>

      {payment && (
        <div style={{ marginTop: "30px", textAlign: "left", background: "#f9f9f9", padding: "20px", borderRadius: "10px" }}>
          <h3>Payment Details</h3>
          <p><strong>Payment ID:</strong> {payment.id}</p>
          <p><strong>Amount:</strong> ${(payment.amount / 100).toFixed(2)}</p>
          <p><strong>Status:</strong> {payment.status}</p>
          <p><strong>Payment Method:</strong> {payment.payment_method_types?.join(", ")}</p>
          <p><strong>Created At:</strong> {new Date(payment.created * 1000).toLocaleString()}</p>
          {payment.last_payment_error && (
            <p style={{ color: "red" }}><strong>Error:</strong> {payment.last_payment_error.message}</p>
          )}
        </div>
      )}
    </div>
  );
}
