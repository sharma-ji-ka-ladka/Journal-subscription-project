import React, { useState, useEffect } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import "./SetPassword.css";

const SetPassword = () => {
  const { isLoaded, signUp } = useSignUp();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const regId = queryParams.get("regId");

    if (!regId) {
      setError("No Registration ID found. Please start from the form.");
      return;
    }

    const fetchEmail = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/register/details/${regId}`);
        // Log this to your console to be 100% sure the backend is sending the email correctly
        console.log("Fetched email from SQL:", res.data.email);
        setEmail(res.data.email);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load user data from SQL Server.");
      }
    };

    fetchEmail();
  }, []); // Only run on mount

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLoaded) return;

    // Safety check: Clerk MUST have an email
    if (!email) {
      setError("Email address not found. Please wait for the page to load or restart the process.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Connect SQL data to Clerk
      await signUp.create({
        emailAddress: email, 
        password: password,
      });

      // Start the verification process
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      
      // Pass the name/email in state if you want to show it on the next page
      navigate("/verify-email", { state: { email } });
    } catch (err) {
      console.error("Clerk Error:", err);
      setError(err.errors?.[0]?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
       <div className="register-card">
         <h2 className="register-title">Secure Your Account</h2>
         
         {/* If email is empty, show a loader or placeholder so user doesn't submit too early */}
         {email ? (
           <p>Setting up account for: <strong>{email}</strong></p>
         ) : (
           <p>Loading your details...</p>
         )}

         <form onSubmit={handleSignup}>
          <div className="password-wrapper">
            <input
              className="register-input"
              type={showPassword ? "text" : "password"}
              placeholder="Set your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)} style={{cursor: 'pointer'}}>
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          <div className="password-wrapper">
            <input
              className="register-input"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowConfirm(!showConfirm)} style={{cursor: 'pointer'}}>
              {showConfirm ? <EyeOff /> : <Eye />}
            </span>
          </div>

          {error && <p className="register-error" style={{color: 'red'}}>{error}</p>}

          <button 
            type="submit" 
            className="register-button" 
            disabled={loading || !email}
          >
            {loading ? "Setting up account..." : "Set Password"}
          </button>
        </form>
       </div>
    </div>
  );
};

export default SetPassword;