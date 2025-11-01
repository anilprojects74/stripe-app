import React from "react";
import { Card, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function Home() {
  const cardStyle = {
    width: 300,
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  };

  const hoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  };

  const [hovered, setHovered] = React.useState("");

  return (
    <div style={{ textAlign: "center", marginTop: "60px", padding: "0 20px" }}>
      <Title level={2}>Welcome to Stripe Payments</Title>

      <Paragraph
        style={{
          fontSize: "16px",
          color: "#555",
          maxWidth: 700,
          margin: "10px auto 20px",
          lineHeight: 1.6,
        }}
      >
        <b>Stripe</b> is a global payment processing platform that helps
        businesses of all sizes accept payments online securely.  
        It provides powerful APIs and tools for handling everything from
        one-time payments and subscriptions to invoices and international
        transactions — all while maintaining PCI compliance and
        top-notch security.
      </Paragraph>

      <Paragraph
        style={{
          fontSize: "15px",
          color: "#666",
          maxWidth: 650,
          margin: "10px auto 40px",
        }}
      >
        In this demo, explore how different Stripe payment methods are
        implemented — from hosted checkout pages to custom-built payment
        forms using Stripe Elements, and recurring billing via
        subscriptions.
      </Paragraph>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "24px",
          paddingBottom: "40px",
        }}
      >
        {/* Checkout Page Card */}
        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <Card
            title="💳 Checkout Page"
            bordered={false}
            style={{
              ...cardStyle,
              ...(hovered === "checkout" ? hoverStyle : {}),
            }}
            onMouseEnter={() => setHovered("checkout")}
            onMouseLeave={() => setHovered("")}
          >
            <Paragraph style={{ color: "#333" }}>
              I’m developing a <b>self-hosted Checkout page</b> powered by
              Stripe’s secure payment flow.
            </Paragraph>
          </Card>
        </Link>

        {/* Elements Page Card */}
        <Link to="/elements" style={{ textDecoration: "none" }}>
          <Card
            title="🧩 Elements Page"
            bordered={false}
            style={{
              ...cardStyle,
              ...(hovered === "elements" ? hoverStyle : {}),
            }}
            onMouseEnter={() => setHovered("elements")}
            onMouseLeave={() => setHovered("")}
          >
            <Paragraph style={{ color: "#333" }}>
              Using <b>Stripe Elements</b> effectively — customizing payment
              inputs and form components.
            </Paragraph>
          </Card>
        </Link>

        {/* Subscription Page Card */}
        <Link to="/subscription" style={{ textDecoration: "none" }}>
          <Card
            title="📦 Subscriptions"
            bordered={false}
            style={{
              ...cardStyle,
              ...(hovered === "subscription" ? hoverStyle : {}),
            }}
            onMouseEnter={() => setHovered("subscription")}
            onMouseLeave={() => setHovered("")}
          >
            <Paragraph style={{ color: "#333" }}>
              Managing <b>subscriptions</b> effectively using{" "}
              <b>Stripe Plans</b> and recurring <b>Payments</b>.
            </Paragraph>
          </Card>
        </Link>
      </div>
    </div>
  );
}
