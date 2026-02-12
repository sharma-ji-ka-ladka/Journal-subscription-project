import React, { useState } from "react";
import { useSignUp, useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const { signUp, isLoaded } = useSignUp();
  const { isSignedIn, user } = useUser();
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
      await signUp.attemptEmailAddressVerification({ code });

      // 🔥 Give Clerk time to activate session
      setTimeout(async () => {
        if (isSignedIn) {

          // Save to backend
          if (formData) {
            await axios.post("http://localhost:8080/api/register/pending", {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              duration: formData.duration,
              isPaid: false
            });
          }

          navigate("/payment-gateway");
        }
      }, 500);

    } catch (err) {
      console.log("FULL ERROR:", err);

      if (
        err.errors?.[0]?.message?.toLowerCase().includes("already") ||
        err.errors?.[0]?.message?.toLowerCase().includes("session")
      ) {
        navigate("/payment-gateway");
      } else {
        setError(err.errors?.[0]?.message || "Invalid verification code");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-card">
        <h2 className="verify-title">Verify Your Email</h2>

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
