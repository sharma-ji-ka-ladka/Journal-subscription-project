import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const navigate = useNavigate();
  const location = useLocation();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formData = location.state?.formData;

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const res = await signUp.attemptEmailAddressVerification({ code });

      if (res.status === "complete") {
        await setActive({ session: res.createdSessionId });

        //connect to backned post-verification
        await axios.post("http://localhost:8080/api/register/pending", {
          ...formData,
          clerkUserId: res.createdUserId,
          status: "PENDING_PAYMENT"
        });

        navigate("/payment-gateway");
      }

    } catch (err) {
      setError(err.errors?.[0]?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-card">
        <h2 className="verify-title">Verify Your Email</h2>

        <p className="verify-subtitle">
          Enter the verification code sent to your email.
        </p>

        <form onSubmit={handleVerify}>
          <input
            className="verify-input"
            type="text"
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          {error && <p className="verify-error">{error}</p>}

          <button className="verify-button" disabled={loading}>
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
