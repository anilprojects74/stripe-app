import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, InputNumber, Button, Typography, message, Card, Tag, Tooltip } from "antd";

const { Title, Paragraph } = Typography;

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export default function CheckoutPage() {
  const [amount, setAmount] = useState(50);
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [paymentsLoading, setPaymentsLoading] = useState(false)

  // Fetch past checkout sessions (replace with your real backend endpoint)
  const fetchPayments = async () => {
    setPaymentsLoading(true);
    try {
      const { data } = await axios.get(`http://${apiUrl}/checkout-payments`);
      setPayments(data);
    } catch (err) {
      console.error(err);
      message.warning("Could not fetch previous payments");
    } finally {
      setPaymentsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Handle new checkout
  const handleCheckout = async () => {
    if (!amount || amount <= 0) {
      message.error("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`http://${apiUrl}/create-checkout-session`, {
        amount,
      });
      window.location.href = data.url;
    } catch (err) {
      console.error(err.response?.data || err.message);
      message.error("Failed to create checkout session");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Session ID", 
      dataIndex: "id", 
      key: "id",
      render: (text) => (
        <Tooltip title={text}>
          <span style={{ fontFamily: "monospace" }}>
            {text.slice(0, 15)}...
          </span>
        </Tooltip>)
    },
    { title: "Amount ($)", dataIndex: "amount", key: "amount" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        if (status === "paid") color = "green";
        else if (status === "failed") color = "red";
        else if (status === "pending") color = "orange";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    { title: "Date", dataIndex: "created_at", key: "created_at" },
  ];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Title level={2}>Stripe Checkout (Hosted Page)</Title>

      <Paragraph style={{ color: "#555", maxWidth: 800, margin: "0 auto 20px" }}>
        <b>What does “self-hosted” mean?</b>  
        A self-hosted Stripe Checkout page means your backend creates the session using Stripe’s API,  
        and then redirects the user to Stripe’s secure payment page. The page is hosted by Stripe,  
        but you control the flow — amount, product, and success or failure routes — entirely from your own app.
      </Paragraph>

      <Paragraph style={{ color: "#555", maxWidth: 800, margin: "0 auto 20px" }}>
        💳 <b>Testing Tip:</b> You can safely test this checkout using Stripe’s test cards.  
        Use card number <b>4242 4242 4242 4242</b>, any future expiry date, and any 3-digit CVC.  
        See more test cards at{" "}
        <a
          href="https://stripe.com/docs/testing#international-cards"
          target="_blank"
          rel="noopener noreferrer"
        >
          Stripe’s official testing documentation
        </a>.
      </Paragraph>
      <Paragraph style={{ color: "#555", maxWidth: 800, margin: "0 auto 30px" }}>
        You can enter a custom amount below and test a complete payment experience
        using <b>Stripe Checkout</b>.
      </Paragraph>

      <Card
        style={{
          maxWidth: 400,
          margin: "0 auto 40px",
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
          <InputNumber
            min={1}
            value={amount}
            onChange={setAmount}
            formatter={(value) => `$ ${value}`}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: 150 }}
          />
          <Button
            type="primary"
            loading={loading}
            onClick={handleCheckout}
            style={{
              background: "#635BFF",
              borderColor: "#635BFF",
            }}
          >
            Pay Now
          </Button>
        </div>
      </Card>

      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          width: "50%",
          margin: "0 auto", // centers the div horizontally
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Previous Checkout Payments
        </Title>
        <Button onClick={() => fetchPayments()} type="default">
          Refresh
        </Button>
      </div>

      <Table
        dataSource={payments}
        columns={columns}
        rowKey="id"
        style={{
          maxWidth: 800,
          margin: "20px auto",
          textAlign: "left",
        }}
        loading={paymentsLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}