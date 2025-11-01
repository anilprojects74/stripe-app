// src/pages/FailurePage.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export default function FailurePage() {
  const [searchParams] = useSearchParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setError("Missing session_id in URL");
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        const { data } = await axios.post(`http://${apiUrl}/retrieve-checkout-session`, {
          session_id: sessionId,
        });
        setSession(data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) return <div style={{ textAlign: "center" }}>Loading payment details...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h1 style={{ color: "red" }}>❌ Payment Failed</h1>
      <p>Sorry, your payment could not be completed.</p>

      {session && (
        <div
          style={{
            marginTop: "30px",
            textAlign: "left",
            background: "#f9f9f9",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Payment Details</h3>
          <p><strong>Session ID:</strong> {session.id}</p>
          <p><strong>Customer Email:</strong> {session.customer_details?.email || "N/A"}</p>
          <p><strong>Amount:</strong> ${(session.amount_total / 100).toFixed(2)}</p>
          <p><strong>Status:</strong> {session.payment_status}</p>
          <p><strong>Mode:</strong> {session.mode}</p>
          <p><strong>Created At:</strong> {new Date(session.created * 1000).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
