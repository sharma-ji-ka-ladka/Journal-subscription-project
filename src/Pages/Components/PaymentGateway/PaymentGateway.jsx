import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentGateway = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate("/userdashboard");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          width: "420px",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#1a73e8", marginBottom: "20px" }}>
          Secure Payment Gateway
        </h2>

        <div
          style={{
            border: "2px dashed #ccc",
            padding: "30px",
            borderRadius: "8px",
            marginBottom: "25px",
            backgroundColor: "#fafafa",
          }}
        >
          <p style={{ fontWeight: "bold", margin: 0 }}>
            Payment Integration Coming Soon
          </p>
          <span style={{ fontSize: "12px", color: "#777" }}>
            Stripe / Razorpay will be integrated here
          </span>
        </div>

        <button
          onClick={handlePayment}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#1a73e8",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Simulate Successful Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentGateway;
