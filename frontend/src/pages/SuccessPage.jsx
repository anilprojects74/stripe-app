import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Typography, Result, Button, Spin, Alert } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const { Title, Text } = Typography;

const apiUrl = import.meta.env.VITE_BACKEND_URL;
export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spin tip="Fetching payment details..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  const paymentIntent = session?.payment_intent;
  const amount = session?.amount_total / 100;
  const currency = session?.currency?.toUpperCase();

  return (
    <div className="container py-5">
      <Result
        status="success"
        title="🎉 Payment Successful!"
        subTitle="Thank you for your payment. Below are your payment details."
        extra={[
          <Button
            type="primary"
            key="home"
            onClick={() => navigate("/")}
            style={{ borderRadius: "6px" }}
          >
            Back to Home
          </Button>,
        ]}
      />

      <div className="d-flex justify-content-center mt-4">
        <Card
          bordered
          style={{
            width: "100%",
            maxWidth: 600,
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Title level={4} style={{ textAlign: "center", marginBottom: "20px" }}>
            🧾 Payment Details
          </Title>

          <div className="row mb-2">
            <div className="col-5">
              <Text strong>Session ID:</Text>
            </div>
            <div className="col-7">
              <Text>{session.id}</Text>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-5">
              <Text strong>Amount:</Text>
            </div>
            <div className="col-7">
              <Text>
                {currency} {amount.toFixed(2)}
              </Text>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-5">
              <Text strong>Status:</Text>
            </div>
            <div className="col-7">
              <Text type={session.payment_status === "paid" ? "success" : "warning"}>
                {session.payment_status.toUpperCase()}
              </Text>
            </div>
          </div>

          {paymentIntent && (
            <>
              <div className="row mb-2">
                <div className="col-5">
                  <Text strong>Payment ID:</Text>
                </div>
                <div className="col-7">
                  <Text>{paymentIntent.id}</Text>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-5">
                  <Text strong>Payment Method:</Text>
                </div>
                <div className="col-7">
                  <Text>{paymentIntent.payment_method_types?.join(", ").toUpperCase()}</Text>
                </div>
              </div>
            </>
          )}

          <div className="row">
            <div className="col-5">
              <Text strong>Created At:</Text>
            </div>
            <div className="col-7">
              <Text>{new Date(session.created * 1000).toLocaleString()}</Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
